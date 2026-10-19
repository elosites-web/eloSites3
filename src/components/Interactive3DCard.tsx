import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';
import { getMotionTier, shouldReduceMedia } from '../mediaPrefs';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  maxTilt = 2.5,
  glare = true,
  style = {},
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const systemPrefersReduced = useReducedMotion();
  const prefersReduced = Boolean(systemPrefersReduced || shouldReduceMedia());
  const tiltEnabled = !prefersReduced && getMotionTier() === 'full';

  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Tilt 3D só no tier completo (desktop capaz). Toque e aparelhos leves não pagam o custo.
    if (!tiltEnabled || e.pointerType !== 'mouse') return;
    const card = cardRef.current;
    if (!card) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Movimento suave com ângulo reduzido para evitar tremores e sensibilidade a labirintite
      const rotateX = Number((((y - centerY) / centerY) * -maxTilt).toFixed(2));
      const rotateY = Number((((x - centerX) / centerX) * maxTilt).toFixed(2));

      // Atualiza o DOM diretamente: nenhum re-render do conteúdo interno a cada frame.
      // Sem transição durante o arrasto do mouse: o tilt acompanha o cursor sem atraso.
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
      el.style.transition = 'none';
      el.style.willChange = 'transform';
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (glare && glareRef.current) {
        const gx = Math.round((x / rect.width) * 100);
        const gy = Math.round((y / rect.height) * 100);
        glareRef.current.style.background = `radial-gradient(circle 260px at ${gx}% ${gy}%, rgba(129, 140, 248, 0.14), transparent 75%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handlePointerLeave = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    const card = cardRef.current;
    if (card) {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = window.setTimeout(() => {
        if (!cardRef.current) return;
        cardRef.current.style.willChange = 'auto';
        cardRef.current.style.transition = '';
      }, 520);
    }
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative rounded-2xl ${className}`}
      style={{
        transformStyle: tiltEnabled ? 'preserve-3d' : undefined,
        ...style,
      }}
    >
      {children}

      {/* Brilho especular suave acompanhando o cursor */}
      {glare && tiltEnabled && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-20 overflow-hidden"
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { getMotionTier } from '../mediaPrefs';

/**
 * Hook global de direção de rolagem (scroll-direction aware).
 * Detecta se o usuário está rolando para baixo ou para cima com um
 * listener passivo em window.scrollY + requestAnimationFrame (sem reflow).
 * Valor estável: só muda quando a direção se inverte de fato (> 4px de folga),
 * evitando oscilação em rolagens com inércia (touch).
 */
export function useScrollDirection(): 'down' | 'up' {
  const [direction, setDirection] = useState<'down' | 'up'>('down');
  const lastY = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    lastY.current = window.scrollY;

    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 4) return;
      setDirection((prev) => {
        const next = delta > 0 ? 'down' : 'up';
        return next === prev ? prev : next;
      });
      lastY.current = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}

interface BiRevealProps {
  children: React.ReactNode;
  /** 'auto': ímpares pela esquerda, pares pela direita; 'left' | 'right' | 'up'. */
  direction?: 'auto' | 'left' | 'right' | 'up';
  /** Índice usado na alternância automática (padrão: 0 => esquerda). */
  index?: number;
  className?: string;
  /** Atraso em segundos (stagger). */
  delay?: number;
  /** Distância do deslocamento inicial em px. */
  distance?: number;
  once?: boolean;
  as?: React.ElementType;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Revelação bidirecional reversível:
 * - Descendo: elementos entram na horizontal (esquerda/direita alternados)
 *   ou de baixo para cima; ao sair pela base, deslizam para fora.
 * - Subindo: todos os movimentos se invertem fisicamente (o elemento
 *   reentra deslizando no sentido contrário).
 * - prefers-reduced-motion / tier 'none': apenas crossfade de opacidade.
 * - Sem JS de animação pesado: usa IntersectionObserver + transições CSS
 *   com duração maior na reversão (física suave).
 */
export const BiReveal: React.FC<BiRevealProps> = ({
  children,
  direction = 'auto',
  index = 0,
  className = '',
  delay = 0,
  distance = 60,
  once = false,
  as,
  id,
  style,
}) => {
  const ref = React.useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<'before' | 'in' | 'after'>('before');
  const scrollDir = useScrollDirection();
  const tier = getMotionTier();
  const reduced = tier === 'none';

  const resolved =
    direction === 'auto' ? (index % 2 === 0 ? 'left' : 'right') : direction;

  useEffect(() => {
    if (reduced) {
      setPhase('in');
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setPhase('in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase('in');
            if (once) observer.disconnect();
          } else if (!once) {
            // Saiu da viewport: 'after' se saiu por baixo, 'before' se saiu por cima.
            const rect = entry.boundingClientRect;
            setPhase(rect.top < 0 ? 'before' : 'after');
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, once]);

  // Vetores de entrada (descendo) por direção.
  const enter: Record<string, { x: number; y: number }> = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: Math.max(distance * 0.66, 40) },
  };

  let transform = 'none';
  let opacity = 1;

  if (!reduced) {
    if (phase === 'in') {
      transform = 'translate3d(0, 0, 0)';
      opacity = 1;
    } else {
      const v = enter[resolved];
      if (phase === 'before') {
        // Ainda não entrou: se o usuário sobe, o elemento reentra por baixo
        // (movimento invertido em relação à saída 'after').
        const upward = scrollDir === 'up';
        if (upward) {
          transform = `translate3d(0, ${Math.abs(v.y) + 20}px, 0)`;
        } else {
          transform = `translate3d(${v.x}px, ${v.y}px, 0)`;
        }
        opacity = 0;
      } else {
        // 'after': saiu pela base da viewport. Descendo, escorrega para fora;
        // subindo, volta deslizando de onde veio.
        const upward = scrollDir === 'up';
        if (upward) {
          transform = `translate3d(${v.x}px, ${v.y}px, 0)`;
        } else {
          transform = `translate3d(${v.x * 0.4}px, ${-Math.abs(v.y) - 20}px, 0)`;
        }
        opacity = 0;
      }
    }
  }

  const Tag = (as ?? 'div') as React.ElementType;

  const merged: React.CSSProperties = {
    opacity,
    transform,
    transition: reduced
      ? 'opacity 300ms ease'
      : `transform 620ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 480ms ease ${delay}ms`,
    willChange: reduced ? undefined : 'transform, opacity',
    ...style,
  };

  return (
    <Tag ref={ref} id={id} className={className} style={merged}>
      {children}
    </Tag>
  );
};

export default BiReveal;

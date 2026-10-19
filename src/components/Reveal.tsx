import React, { useEffect, useRef, useState } from 'react';
import { getMotionTier } from '../mediaPrefs';

interface UseRevealOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Revela um elemento uma única vez ao entrar na viewport.
 * - Lê o tier via getMotionTier(): em 'none' nada é escondido nem animado.
 * - Usa apenas IntersectionObserver + transição CSS de opacity/transform.
 * - Desconecta o observer ao sair e no unmount (sem leaks/frames).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const enabled = useRef(getMotionTier() !== 'none');

  useEffect(() => {
    if (!enabled.current) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, visible, enabled: enabled.current };
}

interface RevealProps {
  children: React.ReactNode;
  /** Elemento HTML a renderizar (padrão: div). */
  as?: React.ElementType;
  className?: string;
  /** Atraso em ms aplicado via token, útil para sequências (ex.: hero). */
  delay?: number;
  /** Distância inicial em px (padrão 14). Ignorado no tier 'none'. */
  y?: number;
  /** 'fade' (translate+opacity) ou 'mask' (clip-path + opacity). */
  variant?: 'fade' | 'mask';
  once?: boolean;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Wrapper de revelação compartilhado (entrada de blocos).
 * Não altera texto nem semântica: apenas aplica classes de transição.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  as,
  className = '',
  delay,
  y,
  variant = 'fade',
  once,
  id,
  style,
}) => {
  const Tag = (as ?? 'div') as React.ElementType;
  const { ref, visible, enabled } = useReveal<HTMLElement>({ once });

  const mergedStyle: React.CSSProperties = {
    ...(y !== undefined ? { ['--reveal-y' as string]: `${y}px` } : null),
    ...(delay ? { ['--reveal-delay' as string]: `${delay}ms` } : null),
    ...style,
  };

  const base = variant === 'mask' ? 'mask-reveal' : 'reveal';
  const classes = enabled
    ? `${base}${visible ? ' is-visible' : ''} ${className}`.trim()
    : className;

  return (
    <Tag ref={ref} id={id} className={classes} style={mergedStyle}>
      {children}
    </Tag>
  );
};

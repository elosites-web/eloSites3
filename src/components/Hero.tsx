import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG, whatsappUrl } from '../types';
import { shouldReduceMedia, getMotionTier } from '../mediaPrefs';
import {
  ArrowDown,
  CheckCircle2,
  Monitor,
  Zap,
  Search,
  Smartphone,
  Check,
  Code2,
  Gauge,
  FileCode2,
  FolderTree,
} from 'lucide-react';

interface HeroProps {
  mode?: 'home' | 'inicio' | 'all';
  onNavigateToPortfolio?: () => void;
  isMenuOpen?: boolean;
}

/** Faixa de 4 pilares técnicos (identidade og-image.png). */
const PILLARS = [
  { icon: Monitor, label: 'Design moderno' },
  { icon: Zap, label: 'Performance de verdade' },
  { icon: Search, label: 'SEO técnico' },
  { icon: Smartphone, label: '100% responsivo' },
];

/** Badges de engenharia flutuantes ao redor do laptop. */
const BADGES = [
  { icon: FileCode2, label: 'Código limpo e organizado' },
  { icon: Check, label: 'Boas práticas de desenvolvimento' },
  { icon: Search, label: 'Site otimizado para buscadores' },
];

/** Anel circular de pontuação A+ (Performance 100/100). */
const PerformanceRing: React.FC = () => (
  <div className="engineering-badge rounded-2xl px-4 py-3 flex items-center gap-3">
    <div className="relative w-12 h-12 shrink-0 animate-ring-glow">
      <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="0"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-sm text-white">
        A+
      </span>
    </div>
    <div className="leading-tight">
      <span className="block text-white text-sm font-semibold">Performance</span>
      <span className="block text-[11px] text-slate-400 font-mono">100/100</span>
    </div>
  </div>
);

/** Painel IDE suspenso com árvore de arquivos e código TypeScript. */
const IdePanel: React.FC<{ floating: boolean }> = ({ floating }) => (
  <div
    className={`ide-panel rounded-xl overflow-hidden ${
      floating ? 'hidden xl:block absolute -top-10 -left-8 z-20 w-64 float-slow' : ''
    }`}
  >
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-[#050814]">
      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
      <span className="ml-2 text-[10px] font-mono text-slate-500">ide — App.tsx</span>
    </div>
    <div className="grid grid-cols-[78px_1fr] font-mono text-[10px] leading-relaxed">
      <div className="border-r border-white/[0.07] p-2 space-y-1 text-slate-500">
        <div className="flex items-center gap-1 text-slate-300">
          <FolderTree className="w-3 h-3 text-blue-400" />
          <span>src</span>
        </div>
        {['components', 'pages', 'assets'].map((f) => (
          <div key={f} className="pl-4 truncate">└ {f}</div>
        ))}
        <div className="pl-4 truncate text-blue-300">└ App.tsx</div>
      </div>
      <div className="p-2.5 overflow-hidden">
        <div><span className="text-fuchsia-400">export default function</span> <span className="text-blue-300">Home</span>() {'{'}</div>
        <div className="pl-3"><span className="text-fuchsia-400">return</span> (</div>
        <div className="pl-6"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">main</span> <span className="text-sky-300">className</span>=<span className="text-amber-200">&quot;hero&quot;</span><span className="text-slate-600">&gt;</span></div>
        <div className="pl-9"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">h1</span><span className="text-slate-600">&gt;</span><span className="text-slate-200">Seu site, sob medida.</span><span className="text-slate-600">&lt;/</span><span className="text-emerald-300">h1</span><span className="text-slate-600">&gt;</span></div>
        <div className="pl-6"><span className="text-slate-600">&lt;/</span><span className="text-emerald-300">main</span><span className="text-slate-600">&gt;</span></div>
        <div className="pl-3">);</div>
        <div>{'}'}</div>
      </div>
    </div>
  </div>
);

/** Conteúdo da tela do laptop no modo Preview. */
const LaptopPreview: React.FC = () => (
  <div className="absolute inset-0 flex flex-col bg-[#050814] text-left">
    {/* Mini navegação */}
    <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-white/[0.07]">
      <img src="/logo-elosites-1360.png" alt="" className="h-3 w-auto object-contain" aria-hidden="true" />
      <div className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] text-slate-400 font-medium">
        <span className="text-white">Início</span>
        <span>Serviços</span>
        <span>Projetos</span>
        <span>Contato</span>
      </div>
    </div>
    {/* Mini hero */}
    <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-3 relative overflow-hidden">
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute right-4 bottom-0 w-24 h-16 border border-blue-500/20 rounded-t-lg pointer-events-none hidden sm:block" />
      <h3 className="font-display text-sm sm:text-lg font-bold text-white leading-snug">
        <span className="gradient-text">Sites que geram resultados.</span>
      </h3>
      <p className="mt-1 text-[8px] sm:text-[10px] text-slate-400 leading-relaxed max-w-[220px]">
        Design, performance e SEO técnico para o seu negócio crescer.
      </p>
      <div className="mt-2 sm:mt-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[8px] sm:text-[9px] font-semibold text-white shadow-lg"
          style={{ background: 'var(--gradiente-oficial)' }}>
          Solicitar orçamento <span aria-hidden="true">→</span>
        </span>
      </div>
      <div className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {[
          { icon: Monitor, label: 'Design moderno' },
          { icon: Zap, label: 'Performance' },
          { icon: Search, label: 'SEO técnico' },
          { icon: Smartphone, label: 'Responsivo' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1 text-[7px] sm:text-[8px] text-slate-400">
            <Icon className="w-2.5 h-2.5 text-blue-400 shrink-0" />
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/** Conteúdo da tela do laptop no modo Código. */
const LaptopCode: React.FC = () => (
  <div className="absolute inset-0 bg-[#030712] p-3 sm:p-4 font-mono text-[8px] sm:text-[10px] leading-relaxed text-left overflow-hidden">
    <div className="text-slate-600">// components/Hero.tsx — ēloSites</div>
    <div><span className="text-fuchsia-400">import</span> {'{ motion }'} <span className="text-fuchsia-400">from</span> <span className="text-amber-200">'motion/react'</span>;</div>
    <div className="mt-1"><span className="text-fuchsia-400">export const</span> <span className="text-blue-300">Hero</span> = () {'=>'} (</div>
    <div className="pl-3"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">section</span> <span className="text-sky-300">className</span>=<span className="text-amber-200">&quot;hero&quot;</span><span className="text-slate-600">&gt;</span></div>
    <div className="pl-6"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">h1</span><span className="text-slate-600">&gt;</span></div>
    <div className="pl-9"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">span</span> <span className="text-sky-300">className</span>=<span className="text-amber-200">&quot;gradient-text&quot;</span><span className="text-slate-600">&gt;</span></div>
    <div className="pl-12 text-slate-200">Sites que geram resultados.</div>
    <div className="pl-9"><span className="text-slate-600">&lt;/</span><span className="text-emerald-300">span</span><span className="text-slate-600">&gt;</span></div>
    <div className="pl-6"><span className="text-slate-600">&lt;/</span><span className="text-emerald-300">h1</span><span className="text-slate-600">&gt;</span></div>
    <div className="pl-3"><span className="text-slate-600">&lt;</span><span className="text-emerald-300">CtaWhatsApp</span> <span className="text-sky-300">message</span>=<span className="text-amber-200">&quot;orçamento&quot;</span> <span className="text-slate-600">/&gt;</span></div>
    <div><span className="text-slate-600">&lt;/</span><span className="text-emerald-300">section</span><span className="text-slate-600">&gt;</span></div>
    <div className="mt-1 text-slate-600">);</div>
  </div>
);

/** Mockup composto 3D: laptop metálico escuro + halos cobalto + switcher. */
const LaptopMockup: React.FC<{ heavyMotion: boolean }> = ({ heavyMotion }) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Halos de iluminação azul cobalto */}
      <div className="absolute -inset-8 sm:-inset-12 bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-violet-600/15 blur-[70px] rounded-full pointer-events-none" />
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-blue-500/25 blur-3xl rounded-full pointer-events-none" />

      {/* Painel IDE suspenso (desktop) */}
      <IdePanel floating />

      {/* Tela do laptop */}
      <div className="relative glow-cobalt">
        <div className="rounded-t-2xl border border-slate-700/80 bg-gradient-to-b from-slate-800 to-slate-900 p-1.5 sm:p-2">
          {/* Barra de abas interativa */}
          <div className="flex items-center gap-1 rounded-t-lg bg-[#050814] px-2 pt-1.5">
            <button
              type="button"
              onClick={() => setView('preview')}
              aria-pressed={view === 'preview'}
              className={`inline-flex items-center gap-1.5 rounded-t-md px-2.5 sm:px-3 py-1.5 text-[9px] sm:text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                view === 'preview'
                  ? 'bg-[#090e23] text-blue-300 border-b border-blue-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Monitor className="w-3 h-3" />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setView('code')}
              aria-pressed={view === 'code'}
              className={`inline-flex items-center gap-1.5 rounded-t-md px-2.5 sm:px-3 py-1.5 text-[9px] sm:text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                view === 'code'
                  ? 'bg-[#090e23] text-blue-300 border-b border-blue-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Code2 className="w-3 h-3" />
              Código React
            </button>
            <span className="ml-auto hidden sm:inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>

          {/* Área da tela */}
          <div className="relative aspect-[16/10] bg-[#030712] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, x: heavyMotion ? (view === 'preview' ? -14 : 14) : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: heavyMotion ? (view === 'preview' ? 14 : -14) : 0 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                {view === 'preview' ? <LaptopPreview /> : <LaptopCode />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Base metálica do laptop */}
        <div className="relative mx-auto h-3.5 sm:h-4 w-[112%] -ml-[6%] rounded-b-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border border-slate-700/60 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)]">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-1.5 w-24 sm:w-32 rounded-b-lg bg-slate-900 border-x border-b border-slate-700/50" />
        </div>
        {/* Reflexo no "tampo da mesa" */}
        <div className="mx-auto mt-1 h-6 w-[90%] bg-gradient-to-b from-blue-500/10 to-transparent blur-md rounded-full pointer-events-none" />
      </div>

      {/* Badges flutuantes à direita (desktop) */}
      <div className="hidden xl:flex flex-col gap-3 absolute top-8 -right-6 z-20 float-slower">
        {BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="engineering-badge rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 max-w-[240px]">
            <span className="icon-lightbox rounded-lg p-1.5 shrink-0">
              <Icon className="w-3.5 h-3.5 text-blue-300" />
            </span>
            <span className="text-[11px] font-semibold text-slate-100 leading-snug">{label}</span>
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-auto" />
          </div>
        ))}
      </div>

      {/* Indicador A+ Performance (mobile/tablet, abaixo) */}
      <div className="xl:absolute xl:-bottom-12 xl:-left-6 mt-4 xl:mt-0 flex xl:block justify-center">
        <PerformanceRing />
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({
  mode = 'all',
  onNavigateToPortfolio,
  isMenuOpen = false,
}) => {
  const heroWhatsappUrl = whatsappUrl(SITE_CONFIG.heroWhatsappMessage);

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateToPortfolio) {
      onNavigateToPortfolio();
    } else {
      const portfolio = document.querySelector('#portfolio');
      if (portfolio) {
        portfolio.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const targetAudiences = [
    { name: 'Personal Trainers & Academias', tag: 'Fitness', dot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]' },
    { name: 'Advogados & Escritórios', tag: 'Jurídico', dot: 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' },
    { name: 'Barbearias & Salões de Beleza', tag: 'Beleza', dot: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' },
    { name: 'Esteticistas & Clínicas', tag: 'Estética', dot: 'bg-rose-400 shadow-[0_0_8px_#fb7185]' },
    { name: 'Dentistas & Consultórios', tag: 'Saúde', dot: 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' },
    { name: 'Psicólogos & Terapeutas', tag: 'Terapia', dot: 'bg-purple-400 shadow-[0_0_8px_#c084fc]' },
    { name: 'Médicos & Nutricionistas', tag: 'Clínica', dot: 'bg-teal-400 shadow-[0_0_8px_#2dd4bf]' },
    { name: 'Corretores & Imobiliárias', tag: 'Imóveis', dot: 'bg-blue-400 shadow-[0_0_8px_#3b82f6]' },
    { name: 'Arquitetos & Engenheiros', tag: 'Projetos', dot: 'bg-violet-400 shadow-[0_0_8px_#a78bfa]' },
    { name: 'Contadores & Consultorias', tag: 'B2B', dot: 'bg-emerald-400 shadow-[0_0_8px_#34d399]' },
    { name: 'Veterinários & Pet Shops', tag: 'Pet Care', dot: 'bg-pink-400 shadow-[0_0_8px_#f472b6]' },
    { name: 'Fotógrafos & Estúdios', tag: 'Criativo', dot: 'bg-sky-400 shadow-[0_0_8px_#38bdf8]' },
    { name: 'Restaurantes & Gastronomia', tag: 'Food', dot: 'bg-orange-400 shadow-[0_0_8px_#fb923c]' },
    { name: 'Autônomos & Negócios Locais', tag: 'Geral', dot: 'bg-indigo-400 shadow-[0_0_8px_#818cf8]' },
  ];

  const systemPrefersReduced = useReducedMotion();
  const motionTier = getMotionTier();
  const isReduced = Boolean(systemPrefersReduced || shouldReduceMedia() || motionTier === 'none');
  const heavyMotion = !isReduced && motionTier === 'full';

  // Sequência de entrada do hero: roda apenas na primeira montagem da sessão
  // (efeito raro = delight). Nas demais navegações o conteúdo já aparece pronto.
  const [playSequence] = useState(() => {
    if (isReduced) return false;
    try {
      if (sessionStorage.getItem('elosites_hero_played') === '1') return false;
      sessionStorage.setItem('elosites_hero_played', '1');
    } catch {
      return true;
    }
    return true;
  });

  // Efeito de flutuação sutil e interativa da logo na Home
  const [counterDrift, setCounterDrift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!heavyMotion) return;

    let rafId = 0;
    let pending = false;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(() => {
        pending = false;
        const { innerWidth, innerHeight } = window;
        const normX = (lastX / innerWidth - 0.5) * 2;
        const normY = (lastY / innerHeight - 0.5) * 2;
        const nextX = normX * 6;
        const nextY = normY * 5;
        setCounterDrift((prev) =>
          Math.abs(prev.x - nextX) < 0.1 && Math.abs(prev.y - nextY) < 0.1
            ? prev
            : { x: nextX, y: nextY }
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heavyMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: playSequence ? 0.08 : 0,
        delayChildren: playSequence ? 0.04 : 0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: playSequence ? 12 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: playSequence ? 0.48 : 0,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <div className="w-full">
      {/* 1. TELA HOME: Apenas a logo flutuante da ēloSites centralizada sobre o fundo obsidian estático */}
      {(mode === 'home' || mode === 'all') && (
        <section
          id="home"
          className="hero-home-viewport min-h-[580px] w-full flex flex-col items-center justify-center relative select-none px-4 overflow-hidden pointer-events-none"
        >
          {/* Halo cobalto sutil ao redor da logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-600/10 blur-[110px] rounded-full pointer-events-none" />

          <AnimatePresence>
            {!isMenuOpen && (
              <motion.div
                key="hero-main-floating-logo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  heavyMotion
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: [-8 + counterDrift.y, 8 + counterDrift.y, -8 + counterDrift.y],
                        x: [4 + counterDrift.x, -4 + counterDrift.x, 4 + counterDrift.x],
                        rotate: [-0.5, 0.5, -0.5],
                      }
                    : { opacity: 1, scale: 1 }
                }
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                transition={
                  heavyMotion
                    ? {
                        opacity: { duration: 0.45 },
                        scale: { duration: 0.45 },
                        y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                        x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
                      }
                    : { opacity: { duration: 0.45 }, scale: { duration: 0.45 } }
                }
                className="relative flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* Brilho decorativo minimalista e suave de acordo com as cores do logo (cobalto e índigo) */}
                <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-blue-500/[0.08] via-indigo-500/[0.1] to-violet-500/[0.08] blur-2xl rounded-full pointer-events-none" />

                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = 'home';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-2xl p-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
                  aria-label="ēloSites — Página Inicial (Home)"
                >
                  <img
                    src="/logo-elosites-1360.png"
                    alt="ēloSites"
                    width={1360}
                    height={337}
                    className="hero-home-logo w-auto object-contain relative z-10"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* 2. TELA INÍCIO: Composição fiel à og-image.png — Headline, Pilares, CTAs e Laptop 3D */}
      {(mode === 'inicio' || mode === 'all') && (
        <section
          id="inicio"
          className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 overflow-hidden bg-[#050814]/40 backdrop-blur-[0.5px]"
        >
          {/* Background: grade técnica + halos cobalto/violeta */}
          <div className="absolute inset-0 tech-grid-pattern opacity-70 pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[300px] bg-violet-700/10 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
              {/* Coluna Esquerda: marca, headline, pilares e CTAs */}
              <motion.div
                variants={containerVariants}
                initial={playSequence ? 'hidden' : false}
                animate="visible"
                className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-7"
              >
                {/* Logo oficial da marca */}
                <motion.div variants={itemVariants}>
                  <img
                    src="/logo-elosites-1360.png"
                    alt="ēloSites — Tecnologia que transforma ideias em sites"
                    width={1360}
                    height={337}
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                </motion.div>

                {/* Headline de alto impacto (copy oficial da identidade) */}
                <motion.h1
                  variants={itemVariants}
                  className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance"
                >
                  Tecnologia que transforma{' '}
                  <span className="gradient-text">ideias em sites.</span>
                </motion.h1>

                {/* Subheadline oficial */}
                <motion.p
                  variants={itemVariants}
                  className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  Sites institucionais e landing pages com{' '}
                  <strong className="text-blue-300 font-semibold">estratégia</strong>,{' '}
                  <strong className="text-indigo-300 font-semibold">performance</strong> e{' '}
                  <strong className="text-violet-300 font-semibold">SEO técnico</strong>.
                </motion.p>

                {/* Parágrafo de apoio (copy original preservada) */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  Desenvolvemos a presença digital completa e estratégica para o seu negócio — alta
                  velocidade, arquitetura semântica para o Google e estrutura otimizada para
                  transformar visitantes em contatos no seu WhatsApp.
                </motion.p>

                {/* Barra de 4 pilares técnicos */}
                <motion.ul
                  variants={itemVariants}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl"
                >
                  {PILLARS.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="surface-obsidian rounded-xl px-3 py-3 flex flex-col items-center gap-2 text-center"
                    >
                      <span className="icon-lightbox rounded-lg p-2">
                        <Icon className="w-4 h-4 text-blue-300" aria-hidden="true" />
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-100 leading-tight">
                        {label}
                      </span>
                    </li>
                  ))}
                </motion.ul>

                {/* Ações / CTAs */}
                <motion.div
                  variants={itemVariants}
                  className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto"
                >
                  <a
                    id="hero-cta-whatsapp"
                    href={heroWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary w-full sm:w-auto inline-flex items-center justify-center text-center gap-3 px-6 py-4 rounded-xl text-base font-semibold text-white group"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                    <span className="text-center">Solicitar Orçamento</span>
                    <ArrowDown className="w-4 h-4 -rotate-45 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    id="hero-cta-portfolio"
                    href="#portfolio"
                    onClick={handleScrollToPortfolio}
                    className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 px-6 py-4 rounded-xl text-base font-semibold bg-slate-900/90 hover:bg-slate-800 border border-blue-500/30 text-slate-200 hover:text-white hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-colors active:scale-[0.97]"
                  >
                    <span className="text-center">Ver Modelos no Ar</span>
                    <ArrowDown className="w-4 h-4 text-blue-400" />
                  </a>
                </motion.div>

                {/* Micro-credenciais de confiabilidade */}
                <motion.div
                  variants={itemVariants}
                  className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 text-center lg:text-left"
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Arquitetura de alta conversão & código limpo</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <span>
                      <strong className="text-violet-300 font-medium">SEO técnico</strong> e Schema.org inclusos
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Design exclusivo sem templates genéricos</span>
                  </div>
                </motion.div>

                {/* Segmentos Atendidos */}
                <motion.div variants={itemVariants} className="pt-1 w-full text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-500/25 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-200 via-white to-violet-200 bg-clip-text text-transparent">
                      Desenvolvimento sob medida para:
                    </span>
                  </div>

                  {/* Marquee Contínuo de Nichos — Rotação 85s linear infinite da direita para a esquerda */}
                  <div className="relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
                    <div className="niche-marquee">
                      {[0, 1].map((group) => (
                        <div
                          key={group}
                          className="flex gap-2.5 pr-2.5 shrink-0 flex-nowrap"
                          aria-hidden={group === 1}
                        >
                          {targetAudiences.map((item) => (
                            <span
                              key={`${group}-${item.name}`}
                              className="audience-pill group/pill shrink-0"
                            >
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dot}`} aria-hidden="true" />
                              <span className="text-xs sm:text-[13px] font-semibold text-slate-100 group-hover/pill:text-white transition-colors tracking-tight whitespace-nowrap">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-white/[0.07] border border-white/[0.1] text-blue-300 group-hover/pill:text-blue-200 group-hover/pill:border-blue-400/40 transition-colors uppercase tracking-wider whitespace-nowrap">
                                {item.tag}
                              </span>
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Coluna Direita: Mockup 3D do laptop + IDE + badges (composição og-image) */}
              <motion.div
                initial={playSequence ? { opacity: 0, y: 16 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: playSequence ? 0.5 : 0, delay: playSequence ? 0.1 : 0, ease: [0.23, 1, 0.32, 1] }}
                className="lg:col-span-6 mt-4 lg:mt-0"
              >
                <LaptopMockup heavyMotion={heavyMotion} />

                {/* Badges de engenharia em pilha no mobile/tablet (visíveis abaixo do laptop) */}
                <div className="xl:hidden mt-5 flex flex-wrap justify-center gap-2.5">
                  {BADGES.map(({ icon: Icon, label }) => (
                    <div key={label} className="engineering-badge rounded-xl px-3 py-2 flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-blue-300" />
                      <span className="text-[11px] font-semibold text-slate-100">{label}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

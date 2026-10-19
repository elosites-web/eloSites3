import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { EloLogo } from './EloLogo';
import { ScreenId, SCREENS } from '../types';
import { preloadScreen } from '../preloadScreens';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  onPreviousScreen?: () => void;
  onNextScreen?: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const isHome = currentScreen === 'home';
  const savedScrollPositionRef = useRef<number>(0);

  // Tecla de atalho: Escape para fechar o menu, 'm' ou 'M' para abrir/fechar o menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      if (e.key === 'Escape' && isMenuOpen) {
        handleCloseMenuWithoutNav();
      } else if ((e.key === 'm' || e.key === 'M') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (isMenuOpen) {
          handleCloseMenuWithoutNav();
        } else {
          handleOpenMenu();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Abre o menu salvando a posição de scroll anterior e travando a rolagem do documento
  const handleOpenMenu = () => {
    savedScrollPositionRef.current = window.scrollY || window.pageYOffset || 0;
    setIsMenuOpen(true);
  };

  // Fecha o menu sem navegação: restaura o scroll para a posição salva
  const handleCloseMenuWithoutNav = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: savedScrollPositionRef.current, behavior: 'instant' });
  };

  // Alterna o estado de abertura do menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      handleCloseMenuWithoutNav();
    } else {
      handleOpenMenu();
    }
  };

  // Travar o scroll da página enquanto o menu de navegação estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  const currentMeta = SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  // Componente do Botão de Menu com 3 barras na identidade visual da ēloSites (roxo e cinza) que se transformam suavemente no 'X' de fechar
  const renderMenuButton = () => (
    <button
      id="menu-de-navegacao-btn"
      type="button"
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
      aria-controls="multi-screen-navigation-modal"
      aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
      className="relative group w-11 h-11 flex items-center justify-center bg-transparent border-0 shadow-none active:scale-95 transition-transform duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/80 rounded-lg p-0"
    >
      {/* Ícone com 3 traços que se transformam suavemente no X */}
      <div className="relative w-6 h-6 flex items-center justify-center pointer-events-none">
        {/* Traço superior: tom de roxo oficial da ēloSites. Desce ao centro e gira 45° para formar o X com o traço de baixo */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 top-[11px] h-[2px] rounded-full transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMenuOpen
              ? 'w-5 translate-y-0 rotate-45 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.85)] group-hover:from-purple-300 group-hover:to-violet-300'
              : 'w-5 -translate-y-[6px] rotate-0 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 group-hover:from-purple-400 group-hover:to-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]'
          }`}
        />
        {/* Traço do meio: tom branco/cinza claro alinhado à esquerda dos outros traços */}
        <span
          className={`absolute left-[2px] top-[11px] h-[2px] rounded-full bg-gradient-to-r from-slate-100 via-white to-slate-300 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,width,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-200 ease-out shadow-[0_0_6px_rgba(255,255,255,0.4)] origin-left ${
            isMenuOpen
              ? 'w-0 opacity-0 scale-x-0'
              : 'w-3.5 opacity-100 scale-x-100 translate-y-0 group-hover:w-5 group-hover:from-white group-hover:to-slate-200'
          }`}
        />
        {/* Traço inferior: tom de roxo oficial da ēloSites. Sobe ao centro e gira -45° para formar o X com o traço superior */}
        <span
          className={`absolute left-1/2 -translate-x-1/2 top-[11px] h-[2px] rounded-full transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isMenuOpen
              ? 'w-5 translate-y-0 -rotate-45 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.85)] group-hover:from-indigo-300 group-hover:to-purple-300'
              : 'w-5 translate-y-[6px] rotate-0 group-hover:w-5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 group-hover:from-indigo-400 group-hover:to-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.7)]'
          }`}
        />
      </div>
    </button>
  );

  return (
    <>
      {/* 
        POSICIONAMENTO DO CABEÇALHO E BOTÃO DE MENU:
        1. QUANDO O MENU ESTÁ ABERTO (em TODAS as telas):
           O 'X' fica posicionado centralizado no topo em todas as telas, exatamente igual à tela da Home.
        2. QUANDO O MENU ESTÁ FECHADO:
           - Na Home: Botão de 3 traços centralizado no topo (sem logotipo no canto).
           - Nas demais telas (Início, Serviços, Portfólio, Planos, Sobre, Contato):
             Logotipo na esquerda (com 'O MELHOR SITE PELO MELHOR PREÇO' abaixo) e botão de 3 traços na direita do cabeçalho.
      */}

      {/* Menu Aberto em qualquer tela: 'X' posicionado centralizado no topo (igual à home) */}
      {isMenuOpen && (
        <header
          id="header-nav-active"
          className="fixed top-4 sm:top-6 left-0 right-0 z-50 pointer-events-none flex justify-center items-center"
        >
          <div className="pointer-events-auto">
            {renderMenuButton()}
          </div>
        </header>
      )}

      {/* Menu Fechado na Home: 3 traços centralizados no topo */}
      {isHome && !isMenuOpen && (
        <header
          id="header-nav"
          className="fixed top-4 sm:top-6 left-0 right-0 z-50 pointer-events-none flex justify-center items-center"
        >
          <div className="pointer-events-auto">
            {renderMenuButton()}
          </div>
        </header>
      )}

      {/* Menu Fechado nas demais telas: logotipo à esquerda e botão de 3 traços à direita do cabeçalho */}
      {!isHome && !isMenuOpen && (
        <header
          id="header-nav"
          className="fixed top-0 left-0 right-0 z-50 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-300 bg-gradient-to-r from-[#050814]/92 via-[#090e23]/88 to-[#0d1533]/92 backdrop-blur-md border-b border-indigo-500/20 py-2 sm:py-2.5 shadow-xl shadow-[#020617]/50 pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center justify-between gap-3 sm:gap-6 min-h-[44px]">
              {/* Logo do Estúdio à esquerda com frase oficial abaixo */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
                <button
                  type="button"
                  id="brand-logo-link"
                  onClick={() => {
                    onSelectScreen('home');
                  }}
                  className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-90 text-left flex items-center gap-2.5 shrink-0 cursor-pointer"
                  aria-label="ēloSites — Ir para a Página Inicial (Home)"
                >
                  <EloLogo size="md" />
                </button>

                {/* Indicador sutil da tela ativa atual */}
                <div className="hidden lg:flex items-center pl-3 border-l border-white/[0.08]">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-950/60 border border-indigo-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_#818cf8]" />
                    <span className="text-xs font-semibold text-slate-200">
                      {currentMeta.shortTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botão do Menu à direita nas telas internas */}
              <div className="flex items-center ml-auto shrink-0 z-10 pointer-events-auto">
                {renderMenuButton()}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* 
        MODAL DO MENU DE NAVEGAÇÃO:
        - O próprio botão de menu (no topo) se transforma no 'X' de fechar no centro do topo em todas as telas.
        - No centro da viewport, a lista em cascata dos nomes das 7 seções perfeitamente centralizada.
        - No pé da página, o logotipo ēloSites centralizado com a frase 'O MELHOR SITE PELO MELHOR PREÇO'.
      */}
      {isMenuOpen && (
        <div
          id="multi-screen-navigation-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação das Seções ēloSites"
          className="nav-menu-modal-container fixed inset-0 z-40 flex flex-col items-center justify-between pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 bg-black/50 backdrop-blur-[2px] animate-in fade-in duration-200 select-none overflow-y-auto"
          onClick={handleCloseMenuWithoutNav}
        >
          {/* Espaçador flexível superior */}
          <div className="shrink-0 h-2" aria-hidden="true" />

          {/* Lista centralizada em cascata dos nomes das seções */}
          <div
            className="nav-menu-list-wrap relative w-full flex flex-col items-center justify-center text-center my-auto px-4 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="nav-menu-list flex flex-col items-center justify-center py-0.5 w-full">
              {SCREENS.map((screen, index) => {
                const isActive = screen.id === currentScreen;

                return (
                  <motion.li
                    key={screen.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.03 * index,
                      duration: 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="nav-menu-list-item w-full flex justify-center"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        onSelectScreen(screen.id);
                      }}
                      onPointerEnter={() => preloadScreen(screen.id)}
                      onFocus={() => preloadScreen(screen.id)}
                      onTouchStart={() => preloadScreen(screen.id)}
                      className={`nav-menu-link-item group relative rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 flex items-center justify-center cursor-pointer ${
                        isActive ? 'is-active scale-105' : 'hover:scale-105'
                      }`}
                    >
                      <span className="font-display nav-menu-link-text tracking-tight transition-transform duration-200 group-hover:-translate-y-0.5">
                        {screen.shortTitle}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Logotipo centralizado no pé da página com frase oficial vinculada à largura exata da logo */}
          <div
            className="nav-menu-logo-wrap shrink-0 flex flex-col items-center justify-center pointer-events-auto mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                onSelectScreen('home');
              }}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1 transition-transform hover:scale-105 cursor-pointer flex flex-col items-center justify-center"
              aria-label="ēloSites — Ir para a Página Inicial (Home)"
            >
              <img
                src="/logo-elosites-1360.png"
                alt="ēloSites"
                width={1360}
                height={337}
                className="nav-menu-logo-img w-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <span className="w-full text-center mt-1 text-[7px] min-[380px]:text-[8px] sm:text-[9.5px] font-semibold tracking-wider uppercase text-slate-400 select-none leading-tight whitespace-nowrap">
                  O melhor site pelo melhor preço
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};


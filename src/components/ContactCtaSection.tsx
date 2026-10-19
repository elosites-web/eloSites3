import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_CONFIG, whatsappUrl } from '../types';
import { Mail } from 'lucide-react';
import { SplitLines } from './SplitLines';
import { shouldReduceMedia } from '../mediaPrefs';
import { BiReveal } from './ScrollDirection';
import { getDynamicCardVariants } from '../motionVariants';

interface ContactCtaSectionProps {
  onNavigateToOrcamento?: () => void;
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({ onNavigateToOrcamento }) => {
  const systemPrefersReduced = useReducedMotion();
  const prefersReduced = Boolean(systemPrefersReduced || shouldReduceMedia());
  const cardVariants = getDynamicCardVariants(prefersReduced);
  const mainWhatsappUrl = whatsappUrl(SITE_CONFIG.finalCtaWhatsappMessage);

  return (
    <section
      id="contato"
      className="section-auto-contain pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-20 bg-[#0A1029]/30 backdrop-blur-[0.5px] relative border-t border-white/[0.05] overflow-x-clip"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(640px,100%)] h-[360px] bg-indigo-600/[0.12] blur-[140px] rounded-full pointer-events-none" />

      <div className="page-shell page-x relative">
        <div className="max-w-4xl mx-auto text-center space-y-7 sm:space-y-9">
          <div className="section-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.07] text-indigo-300 text-xs sm:text-sm font-semibold uppercase">
            <span>Próximo passo</span>
          </div>

          <SplitLines
            as="h2"
            text="Vamos criar o site do seu negócio?"
            className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-[-0.035em] text-white leading-[1.12] text-balance"
          />

          <p className="text-base sm:text-lg text-slate-300/95 leading-relaxed max-w-2xl mx-auto">
            Conte sobre o seu trabalho pelo WhatsApp. Conversamos sobre o formato, o conteúdo e te enviamos um orçamento específico para o seu projeto.
          </p>

        <div className="pt-2 sm:pt-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              id="main-contact-cta-whatsapp"
              href={mainWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-3 px-6 sm:px-8 py-5 rounded-2xl text-base sm:text-lg font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] border border-emerald-400/30 shadow-lg shadow-emerald-950/40 group pressable min-h-12 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops]"
            >
              <WhatsAppIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              <span className="text-center">Falar no WhatsApp</span>
            </a>

            <button
              id="main-contact-cta-briefing"
              type="button"
              onClick={() => {
                if (onNavigateToOrcamento) {
                  onNavigateToOrcamento();
                } else {
                  window.location.hash = 'orcamento';
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2.5 px-6 py-5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40 shadow-lg shadow-indigo-500/25 pressable min-h-12 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] cursor-pointer"
            >
              <span className="text-center">Preencher Briefing ou Reunião 30 min</span>
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-400 font-medium">
              Atendimento direto com o fundador · sem compromisso
            </p>
            <p className="text-xs text-slate-300 font-medium select-all" data-copy-allowed>
              {SITE_CONFIG.whatsappDisplay}
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300 max-w-xl mx-auto">
          <BiReveal
            direction="auto"
            index={0}
            className="h-full"
          >
            <a
              href={mainWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 glass-panel glass-card-interactive p-4 rounded-2xl text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] bracket-panel relative h-full hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium">Canal principal</span>
                <span className="font-semibold text-white">WhatsApp</span>
              </div>
            </a>
          </BiReveal>

          <BiReveal
            direction="auto"
            index={1}
            className="h-full"
          >
            <div className="flex items-center gap-3.5 glass-panel p-4 rounded-2xl text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] bracket-panel relative h-full hover:border-indigo-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-indigo-400" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400 font-medium">E-mail</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center font-semibold text-white hover:text-indigo-300 transition-colors break-all"
                  data-copy-allowed
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </BiReveal>
        </div>
        </div>
      </div>
    </section>
  );
};

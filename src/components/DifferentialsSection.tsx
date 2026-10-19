import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { shouldReduceMedia } from '../mediaPrefs';
import {
  Zap,
  User,
  Server,
  TrendingUp,
  CheckCircle2,
  Flame,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SplitLines } from './SplitLines';
import { SITE_CONFIG, whatsappUrl } from '../types';
import { Interactive3DCard } from './Interactive3DCard';
import { BiReveal } from './ScrollDirection';
import { getDynamicCardVariants } from '../motionVariants';

interface DifferentialsSectionProps {
  onNavigateToPortfolio?: () => void;
}

export const DifferentialsSection: React.FC<DifferentialsSectionProps> = () => {
  // Preferência de redução de movimento e media prefs
  const systemPrefersReduced = useReducedMotion();
  const prefersReduced = Boolean(systemPrefersReduced || shouldReduceMedia());

  const differentials: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
    isWhatsApp?: boolean;
  }[] = [
    {
      title: 'Código limpo & alta performance',
      description:
        'Desenvolvimento autoral, leve e otimizado para carregamento instantâneo. Sem temas genéricos ou plugins pesados que deixam o site lento.',
      icon: Zap,
    },
    {
      title: 'Trabalho direto com o fundador',
      description:
        'Você conversa com quem desenha e desenvolve o site. Sem equipe inventada, sem intermediários e sem terceirização.',
      icon: User,
    },
    {
      title: 'Tecnologia moderna e publicação estável',
      description:
        'Stack atual, código organizado e publicação estável na URL do Netlify. Domínio personalizado não está incluso: se quiser um, o registro fica na sua conta e o pagamento é à parte.',
      icon: Server,
    },
    {
      title: 'Foco em conversão',
      description:
        'Cada seção existe para um motivo comercial: apresentar o serviço com clareza e levar o visitante até o contato.',
      icon: TrendingUp,
    },
    {
      title: 'Mais contexto antes da conversa',
      description:
        'O site apresenta seus serviços, explica seus diferenciais e reúne as informações que o cliente precisa para conhecer melhor seu negócio antes de entrar em contato. Com o WhatsApp integrado, fica mais fácil dar o próximo passo.',
      icon: Flame,
    },
    {
      title: 'WhatsApp em primeiro lugar',
      description:
        'Quando faz sentido para o negócio, o site é pensado para gerar conversa no WhatsApp — com botões no momento certo e mensagens prontas.',
      icon: WhatsAppIcon,
      isWhatsApp: true,
    },
  ];

  // Variantes dinâmicas dos cartões de serviço (service-card) com mola, blur progressivo e escala suave
  const cardVariants = getDynamicCardVariants(prefersReduced);

  return (
    <section
      id="diferenciais"
      className="section-auto-contain pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-20 bg-[#0A1029]/30 backdrop-blur-[0.5px] relative border-t border-white/[0.05] overflow-x-clip"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent pointer-events-none" />

      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-500/[0.06] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-600/[0.06] blur-[150px] rounded-full pointer-events-none" />

      <div className="page-shell page-x">
        {/* Cabeçalho da Seção de Diferenciais */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="section-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/[0.08] text-indigo-300 text-xs sm:text-sm font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Diferenciais Estratégicos</span>
          </div>
          <SplitLines
            as="h2"
            text="O que muda quando o site é feito para o seu negócio"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-white text-balance leading-tight"
          />
          <p className="text-base sm:text-lg text-slate-300/95 leading-relaxed">
            Menos agência genérica. Mais presença profissional, conversa direta e resultado.
          </p>
        </div>

        {/* Grade de 6 Cards de Diferenciais com transição dinâmica idêntica aos cartões de serviço */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <BiReveal
                key={item.title}
                direction="auto"
                index={index}
                delay={index * 0.06}
                className="h-full"
              >
                <Interactive3DCard maxTilt={5} className="h-full">
                  <article
                    className="glass-card-interactive surface-card accent-border-subtle relative rounded-2xl bg-[#090E23] border border-slate-800/80 hover:border-indigo-400/50 h-full w-full p-5 sm:p-6 md:p-8 flex flex-col justify-between group shadow-2xl shadow-black/60 bracket-panel transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2.5 mb-5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-300 ${
                            item.isWhatsApp
                              ? 'bg-[#25D366] text-white shadow-md shadow-emerald-950/40'
                              : 'bg-indigo-950/80 border border-indigo-500/30 text-indigo-300'
                          }`}
                        >
                          {item.isWhatsApp ? (
                            <WhatsAppIcon className="w-5 h-5 text-white" />
                          ) : (
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-indigo-300 transition-colors">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold tracking-tight text-white mb-2.5 group-hover:text-indigo-100 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-3.5 border-t border-white/[0.08] flex items-center gap-1.5 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                      <span className="font-medium text-slate-300">Padrão ēloSites</span>
                    </div>
                  </article>
                </Interactive3DCard>
              </BiReveal>
            );
          })}
        </div>

        {/* Aviso de responsabilidade e alinhamento estratégico posicionado abaixo do último card */}
        <div className="mt-10 sm:mt-12 max-w-2xl mx-auto text-center px-4">
          <p className="inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm text-indigo-200/90 leading-relaxed bg-indigo-950/40 border border-indigo-500/20 rounded-xl px-4 sm:px-5 py-3 shadow-md">
            <CheckCircle2
              className="w-4 h-4 text-indigo-400 shrink-0"
              aria-hidden="true"
            />
            <span>
              O site apoia sua divulgação. Você continua responsável por atrair pessoas, atender os contatos e conduzir as vendas.
            </span>
          </p>
        </div>

        {/* CTA Contextual de Diferenciais com espaçamento proporcional */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          <a
            id="diferenciais-cta-whatsapp"
            href={whatsappUrl(SITE_CONFIG.diferenciaisWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-primary inline-flex items-center justify-center text-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white shadow-lg shadow-indigo-600/30 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-300 shrink-0" />
            <span className="whitespace-nowrap">Falar sobre um site para meu negócio</span>
          </a>
        </div>
      </div>
    </section>
  );
};

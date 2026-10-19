import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MessageSquare, Layers, Code2, Globe2, UserCheck, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SplitLines } from './SplitLines';
import { SITE_CONFIG, whatsappUrl } from '../types';
import { shouldReduceMedia } from '../mediaPrefs';
import { Interactive3DCard } from './Interactive3DCard';
import { BiReveal } from './ScrollDirection';
import { getDynamicCardVariants } from '../motionVariants';

export const ProcessSection: React.FC = () => {
  const systemPrefersReduced = useReducedMotion();
  const prefersReduced = Boolean(systemPrefersReduced || shouldReduceMedia());
  const cardVariants = getDynamicCardVariants(prefersReduced);

  const steps = [
    {
      number: '01',
      title: 'Conversa inicial',
      description:
        'Conversa inicial sobre o negócio: o que você oferece, para quem e o que o site precisa gerar.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Conteúdos e identidade',
      description:
        'Reunião de conteúdos, fotos e identidade. Organizamos o material para o site falar a língua do seu cliente.',
      icon: Layers,
    },
    {
      number: '03',
      title: 'Desenvolvimento e revisão',
      description:
        'Desenvolvimento rápido com auxílio de IA e revisão humana em cada detalhe. Nada vai ao ar sem olhar atento.',
      icon: Code2,
    },
    {
      number: '04',
      title: 'Site publicado',
      description:
        'Site publicado na URL do Netlify — essa é a entrega padrão. Domínio personalizado não está incluso. Hospedagem ou migração para outro provedor é orçada à parte.',
      icon: Globe2,
    },
  ];

  return (
    <section
      id="como-funciona"
      className="section-auto-contain pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-20 bg-[#0A1029]/30 backdrop-blur-[0.5px] relative border-t border-white/[0.05] overflow-x-clip"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/25 to-transparent pointer-events-none" />
      <div className="page-shell page-x relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5 mb-16 sm:mb-20">
          <div className="section-kicker inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.07] text-indigo-300 text-xs font-semibold uppercase">
            <span>Como funciona</span>
          </div>
          <SplitLines
            as="h2"
            text="Quatro etapas. Cada detalhe com revisão humana."
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-white text-balance"
          />
          <p className="text-base sm:text-lg text-slate-300/95 leading-relaxed">
            O processo é direto e acompanhado de perto. Usamos inteligência artificial
            para ganhar velocidade — mas o site nunca é entregue de forma totalmente automática.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 relative min-w-0">
          {/* Linha de energia conectando as etapas (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-violet-500/0 pointer-events-none" aria-hidden="true" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <BiReveal
                key={step.number}
                direction="auto"
                index={index}
                delay={index * 0.07}
                className="h-full"
              >
                <Interactive3DCard maxTilt={5} className="h-full">
                  <article
                    className="relative rounded-2xl bg-[#090E23] border border-slate-800/80 hover:border-indigo-400/50 h-full w-full p-5 sm:p-6 md:p-8 flex flex-col justify-between group shadow-2xl shadow-black/60 bracket-panel transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2.5 mb-6">
                        <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-400/30 px-3 py-1 rounded-lg">
                          {step.number}
                        </span>
                        <div className="w-11 h-11 rounded-xl bg-indigo-950/70 border border-indigo-500/30 flex items-center justify-center text-indigo-300 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] duration-300">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-white mb-3 group-hover:text-indigo-100 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-300 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </article>
                </Interactive3DCard>
              </BiReveal>
            );
          })}
        </div>

        <BiReveal direction="up" className="mt-14 w-full">
          <motion.div
            custom={4}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
          >
          <Interactive3DCard maxTilt={3} className="w-full">
            <div className="relative rounded-2xl bg-[#090E23] border border-slate-800/80 hover:border-indigo-400/40 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl shadow-black/60 bracket-panel transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-400/20 flex items-center justify-center text-indigo-300 shrink-0">
                <UserCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1 text-center md:text-left flex-1">
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span>Revisão humana em cada detalhe</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  A IA acelera o desenvolvimento. Quem decide o tom, a estrutura, o texto e
                  o acabamento é uma pessoa — do primeiro rascunho até o site no ar.
                </p>
              </div>
            </div>
          </Interactive3DCard>
          </motion.div>
        </BiReveal>

        {/* CTA Contextual do Processo */}
        <div className="mt-12 flex items-center justify-center">
          <a
            id="processo-cta-whatsapp"
            href={whatsappUrl(SITE_CONFIG.processoWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tirar dúvidas sobre o processo no WhatsApp"
            className="cta-primary inline-flex items-center justify-center text-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white shadow-lg shadow-indigo-600/30 transition-[color,background-color,border-color,box-shadow,opacity,transform,translate,scale,rotate,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,--tw-gradient-stops] cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-300" />
            <span>Tirar dúvidas sobre o processo</span>
          </a>
        </div>
      </div>
    </section>
  );
};

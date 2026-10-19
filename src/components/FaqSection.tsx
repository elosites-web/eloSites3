import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem, SITE_CONFIG, whatsappUrl } from '../types';
import { shouldReduceMedia } from '../mediaPrefs';
import { SplitLines } from './SplitLines';
import { BiReveal } from './ScrollDirection';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ATENÇÃO: estas mesmas perguntas e respostas (texto idêntico) estão replicadas no JSON-LD FAQPage
  // em index.html. Ao editar qualquer item aqui, atualize o JSON-LD para mantê-lo sincronizado.
  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Preciso ter todo o conteúdo pronto?',
      answer:
        'Não. Na conversa inicial e na reunião de materiais, organizamos juntos o que já existe — fotos, textos, serviços e identidade. Se faltar alguma coisa, alinhamos o que é essencial para o site ir ao ar com qualidade.',
    },
    {
      id: 'faq-2',
      question: 'Quanto tempo leva para o site ficar pronto?',
      answer:
        'Depende do formato (landing page ou site institucional) e de quanto tempo leva para reunir conteúdos e fotos. O processo é pensado para ser rápido, em dias em vez de meses — sem um prazo absoluto, porque cada projeto tem o próprio ritmo de revisão.',
    },
    {
      id: 'faq-3',
      question: 'Quanto custa e como é o pagamento?',
      answer:
        'Cada projeto tem seu escopo específico, então o valor é definido em um orçamento sob medida após entendermos seu modelo de negócio e necessidades. Para o pagamento, oferecemos 4 modalidades flexíveis: 1) 50% de entrada no início e 50% na entrega e aprovação final (via PIX); 2) 20% de desconto para pagamento integral à vista no fechamento; 3) Até 5x sem juros no cartão de crédito (1 entrada + 4 parcelas fixas); ou 4) Parcelamento estendido de 6x até 12x no cartão de crédito (com repasse das taxas de juros da operadora). Fale com a gente pelo WhatsApp para receber sua proposta detalhada.',
    },
    {
      id: 'faq-4',
      question: 'A publicação e a hospedagem estão inclusas?',
      answer:
        'A publicação do site no endereço combinado faz parte do projeto. Hospedagem e domínio são serviços de terceiros, contratados e pagos por você diretamente no provedor de sua escolha (por exemplo, Netlify, Cloudflare ou uma empresa de hospedagem), e a ēloSites não revende esses serviços. Configurar a publicação e conectar o domínio, quando previstos no escopo aprovado, fazem parte do projeto; migrações fora desse escopo podem ser orçadas à parte.',
    },
    {
      id: 'faq-5',
      question: 'O domínio personalizado está incluso?',
      answer:
        'Não. O registro do domínio (.com.br, .com etc.) é pago por você ao provedor de sua escolha e fica sempre na sua conta; a ēloSites não fica dona do domínio. Recomendamos fortemente contratar um domínio próprio: ele passa mais credibilidade, é mais fácil de lembrar e divulgar, e continua seu mesmo que o site mude de hospedagem. Se quiser, indicamos opções de provedores.',
    },
    {
      id: 'faq-6',
      question: 'Depois do projeto eu continuo tendo controle do site?',
      answer:
        'Sim. O site é seu: após a confirmação do pagamento final, o conteúdo, o layout e o código desenvolvidos para o seu projeto passam a ser seus. Quando você quiser, pode pedir a transferência do repositório e das informações de publicação para a sua conta. O domínio e a hospedagem ficam sempre no seu nome.',
    },
    {
      id: 'faq-7',
      question: 'Existe manutenção mensal?',
      answer:
        'Sim, e é opcional — o valor é definido em 20% sobre o valor do orçamento do seu projeto, conforme o plano de manutenção combinado. Cobre até 4 solicitações simples por mês (textos, imagens, contatos, links, pequenos ajustes), sem acúmulo entre meses. Novas páginas, funcionalidades, integrações, redesigns e alterações estruturais são orçados à parte. Não inclui domínio nem hospedagem em outro provedor.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const systemPrefersReduced = useReducedMotion();
  const isReduced = Boolean(systemPrefersReduced || shouldReduceMedia());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReduced ? 0 : 0.05,
        delayChildren: isReduced ? 0 : 0.03,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isReduced ? 0 : 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isReduced ? 0.2 : 0.35,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section
      id="faq"
      className="section-auto-contain pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14 bg-[#0B1226]/30 backdrop-blur-[0.5px] relative border-t border-white/[0.05] overflow-x-clip"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent pointer-events-none" />
      <div className="page-shell page-x">
        <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-5 mb-16">
          <div className="section-kicker inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.07] text-indigo-300 text-xs font-semibold uppercase">
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Perguntas frequentes</span>
          </div>
          <SplitLines
            as="h2"
            text="Tire as dúvidas antes de começar"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-[-0.03em] text-white text-balance"
          />
          <p className="text-base sm:text-lg text-slate-300/95 leading-relaxed max-w-2xl mx-auto">
            Respostas diretas sobre pagamento, publicação, domínio, manutenção e controle do site.
          </p>
        </div>

        <BiReveal direction="up" className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-content-${index}`;
            const buttonId = `faq-btn-${index}`;
            return (
              <BiReveal
                key={faq.id}
                direction="auto"
                index={index}
                delay={index * 0.05}
                className={`card-solid rounded-2xl overflow-hidden transition-colors duration-300 border bracket-panel relative ${
                  isOpen
                    ? 'border-indigo-400/45'
                    : 'border-white/[0.08] hover:border-indigo-400/30'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full p-3.5 min-[360px]:p-5 sm:p-6 lg:p-8 text-left flex items-center justify-between gap-3 min-[360px]:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset min-h-12 transition-colors duration-200 pressable cursor-pointer"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-white min-w-0 text-pretty text-left">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: isReduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? 'bg-indigo-950 text-indigo-300'
                          : 'bg-slate-800/90 text-slate-300'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={isReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={
                        isReduced
                          ? { opacity: 1 }
                          : {
                              opacity: 1,
                              height: 'auto',
                              transition: {
                                height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.28, delay: 0.05, ease: 'easeOut' },
                              },
                            }
                      }
                      exit={
                        isReduced
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              height: 0,
                              transition: {
                                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.18, ease: [0.32,0.72,0,1] },
                              },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={isReduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={isReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: isReduced ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 text-sm sm:text-base text-slate-300/95 leading-relaxed border-t border-white/[0.06] pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BiReveal>
            );
          })}
        </BiReveal>

        <p className="mt-10 text-center text-sm text-slate-400">
          Outra dúvida sobre o seu negócio?
          <br className="md:hidden" />{' '}
          <a
            href={whatsappUrl(SITE_CONFIG.faqWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold"
          >
            Fale diretamente no WhatsApp
          </a>
        </p>
      </div>
    </div>
  </section>
  );
};

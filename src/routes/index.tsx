import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Banknote,
  Eye,
  EyeOff,
  Flame,
  ListVideo,
  Lock,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Timer,
  TrendingDown,
  Wallet,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg.asset.json";
import ebookMockup from "@/assets/ebook-mockup.png";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Reveal } from "@/components/Reveal";
import { SocialProofToast } from "@/components/SocialProofToast";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "TikTok do Zero ao Lucro — Ganha o teu primeiro 1.000MT",
        description:
          "O método prático passo a passo para crescer e monetizar no TikTok em 2026. Sem mostrar rosto, sem seguidores. Para jovens de Moçambique e Angola.",
      },
      {
        property: "og:title",
        content: "TikTok do Zero ao Lucro — Ganha o teu primeiro 1.000MT",
      },
      {
        property: "og:description",
        content:
          "Método prático para crescer e monetizar no TikTok em 2026, sem mostrar rosto e sem seguidores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* ---------------------------------- data ---------------------------------- */

const DORES = [
  {
    icon: Eye,
    texto: "Vês vídeos todo dia, mas a tua conta bancária continua vazia.",
  },
  {
    icon: TrendingDown,
    texto: "Já tentaste postar e não tiveste views.",
  },
  {
    icon: Wallet,
    texto: "Não tens emprego e ainda dependes dos teus pais.",
  },
  {
    icon: Timer,
    texto: "Sentes que estás a ficar para trás enquanto outros jovens de Maputo já estão a faturar.",
  },
];

const PASSOS = [
  {
    numero: "1",
    titulo: "Escolhe o teu nicho",
    texto: "Descobres em minutos o tipo de conteúdo que mais vende em Moçambique.",
  },
  {
    numero: "2",
    titulo: "Posta com o meu roteiro",
    texto: "Usas os roteiros prontos de 15 segundos que prendem e viralizam.",
  },
  {
    numero: "3",
    titulo: "Monetiza",
    texto: "Transformas views em dinheiro com afiliados e vendas diretas.",
  },
];

const APRENDIZAGENS = [
  {
    icon: Flame,
    titulo: "Como achar vídeos virais",
    texto: "O truque para encontrar tendências antes de toda a gente e surfar a onda certa.",
  },
  {
    icon: ListVideo,
    titulo: "Roteiro de 15 segundos que prende",
    texto: "A estrutura exata que faz o espectador ficar até ao fim (e o algoritmo adorar-te).",
  },
  {
    icon: Banknote,
    titulo: "Monetizar sem 10k seguidores",
    texto: "Afiliados e vendas diretas que pagam mesmo com uma conta pequena.",
  },
  {
    icon: EyeOff,
    titulo: "Erros que matam o teu alcance",
    texto: "Os 5 erros que fazem o TikTok esconder os teus vídeos — e como os evitar.",
  },
];

const DEPOIMENTOS = [
  {
    nome: "Anildo, 22 anos",
    cidade: "Matola",
    texto: "Fiz 1.250MT em 4 dias vendendo com TikTok. Comecei do zero, com o meu celular only.",
  },
  {
    nome: "Edmilson, 24 anos",
    cidade: "Quelimane",
    texto: "3 semanas seguindo o método e já fiz 2.100MT com afiliados. Nem mostrava rosto nos vídeos.",
  },
  {
    nome: "Isabel, 21 anos",
    cidade: "Luanda",
    texto: "Nunca pensei que postar sem seguidores daria resultado. Agora faço vendas toda semana.",
  },
];

const FAQS = [
  {
    pergunta: "Preciso de mostrar o rosto?",
    resposta:
      "Não. O método funciona 100% sem mostrar rosto — ensinamos formatos de vídeo que viralizam sem apareceres.",
  },
  {
    pergunta: "Preciso de ter seguidores?",
    resposta:
      "Não. Aprendes a monetizar mesmo sem 10k seguidores, usando afiliados e vendas diretas.",
  },
  {
    pergunta: "Preciso de computador ou equipamento caro?",
    resposta: "Não. Só precisas do teu celular e de 1 hora por dia.",
  },
  {
    pergunta: "Como recebo o e-book?",
    resposta:
      "O acesso é imediato: pagas por M-Pesa ou eMola e recebes o e-book + bônus no teu email ou WhatsApp.",
  },
  {
    pergunta: "E se não gostar?",
    resposta:
      "Tens 7 dias de garantia total. Se não gostares, devolvemos o teu dinheiro sem perguntas.",
  },
];

/* ---------------------------------- hooks --------------------------------- */

/** Daily countdown (CAT, UTC+2): resets at midnight local time. */
function useDailyCountdown() {
  const [left, setLeft] = useState("23:59:59");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const diff = Math.max(0, end.getTime() - now.getTime());
      const h = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60_000) / 1000)).padStart(2, "0");
      setLeft(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return left;
}

/* --------------------------------- page ----------------------------------- */

function CtaButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glow-success animate-pulse-glow inline-flex items-center justify-center gap-2 rounded-2xl bg-success px-8 py-4 font-display text-lg font-bold tracking-wide text-success-foreground uppercase transition-transform hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <Zap className="h-5 w-5" />
      Quero meu primeiro mil
    </button>
  );
}

function LandingPage() {
  const countdown = useDailyCountdown();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-hero-radial min-h-screen overflow-x-clip pb-28">
      <SocialProofToast />

      {/* ------------------------------- HERO ------------------------------- */}
      <header className="relative overflow-hidden">
        {/* Foto de fundo da hero + overlay roxo escuro para o texto ficar legível */}
        <img
          src={heroBg.url}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div aria-hidden className="absolute inset-0 bg-background/65" />

        <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16 sm:pt-16 sm:pb-20">
          <Reveal>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-[11px] font-semibold tracking-widest text-primary uppercase backdrop-blur-sm sm:text-xs">
                <Sparkles className="h-4 w-4" />
                Guia prático para jovens de 18-30 anos · Angola e Moçambique
              </span>

              <h1 className="mt-6 text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl">
                TikTok do Zero <br className="hidden sm:block" />
                ao <span className="text-gradient-neon">Lucro</span>
              </h1>

              <p className="mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
                O método prático passo a passo para crescer e monetizar no TikTok em 2026 —{" "}
                <strong className="text-foreground">sem precisar mostrar rosto, sem seguidores.</strong>
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <CtaButton />
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center gap-1.5">
                    <ShoppingBag className="h-4 w-4 text-success" />
                    Pagamento por M-Pesa ou eMola
                  </p>
                  <p className="mt-1 flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-success" />
                    Acesso imediato ao e-book
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="animate-float absolute top-1/2 right-4 hidden items-center gap-2 rounded-2xl border-hairline bg-card/95 px-4 py-3 shadow-xl backdrop-blur-md sm:right-8 lg:flex">
            <BadgeCheck className="h-5 w-5 text-success" />
            <span className="text-sm font-semibold">1 hora por dia é suficiente</span>
          </div>
          <div className="animate-float-slow absolute bottom-14 right-6 hidden rounded-2xl border-hairline bg-card/95 px-4 py-3 shadow-xl backdrop-blur-md sm:right-14 lg:block">
            <span className="font-display text-sm font-bold text-success">+ views = + MT</span>
          </div>
        </div>
      </header>

      {/* -------------------------------- DOR -------------------------------- */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Cansado de ver outros a ganhar dinheiro no TikTok enquanto tu só{" "}
            <span className="text-gradient-neon">consomes?</span>
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {DORES.map((dor, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex items-start gap-4 rounded-2xl border border-destructive/25 bg-destructive/5 p-4 sm:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/15">
                  <dor.icon className="h-5 w-5 text-destructive" />
                </span>
                <p className="pt-2 text-base text-foreground sm:text-lg">{dor.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ SOLUÇÃO ------------------------------ */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            E se tu pudesses transformar <span className="text-gradient-neon">1 hora por dia</span> no
            TikTok no teu primeiro <span className="text-gradient-neon">1.000MT?</span>
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Só precisas de seguir 3 passos simples:
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PASSOS.map((passo, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative h-full rounded-3xl border-hairline bg-card p-6 text-center">
                <span className="glow-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground">
                  {passo.numero}
                </span>
                <h3 className="mt-4 text-lg font-bold">{passo.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{passo.texto}</p>
                {i < PASSOS.length - 1 && (
                  <span className="absolute top-1/2 -right-4 hidden text-primary sm:block">→</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <CtaButton />
          </div>
        </Reveal>
      </section>

      {/* --------------------------- O QUE Vais APRENDER ---------------------- */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            O que vais aprender dentro do <span className="text-gradient-neon">e-book</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {APRENDIZAGENS.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="h-full rounded-3xl border-hairline bg-card p-6 transition-transform hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <item.icon className="h-6 w-6 text-primary" />
                </span>
                <h3 className="mt-4 font-bold">{item.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------- PROVA SOCIAL ---------------------------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Jovens como tu <span className="text-gradient-neon">já estão a faturar</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((dep, i) => (
            <Reveal key={i} delay={i * 120}>
              <figure className="h-full rounded-3xl border-hairline bg-card p-6">
                <div className="flex gap-1 text-success" aria-label="5 estrelas">
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                  “{dep.texto}”
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 font-display font-bold text-primary">
                    {dep.nome.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{dep.nome}</span>
                    <span className="text-muted-foreground">{dep.cidade}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------- OFERTA ------------------------------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <Reveal>
          <div className="glow-primary rounded-4xl border border-primary/30 bg-card p-6 sm:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <img
                src={ebookMockup}
                alt="E-book TikTok do Zero ao Lucro"
                loading="lazy"
                width={1024}
                height={1024}
                className="mx-auto w-full max-w-sm rounded-3xl"
              />
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-success/15 px-4 py-1.5 text-xs font-bold tracking-widest text-success uppercase">
                  <Flame className="h-4 w-4" /> Oferta de lançamento
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Tudo isto por menos de <span className="text-gradient-neon">300MT</span>
                </h2>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-xl text-muted-foreground line-through">1.497MT</span>
                  <span className="font-display text-5xl font-bold text-success">297MT</span>
                  <span className="pb-1 text-sm text-muted-foreground">hoje</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                    E-book completo "TikTok do Zero ao Lucro" (2026)
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <strong>Bônus 1:</strong> Lista de 30 ideias de vídeos prontas
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                    <span>
                      <strong>Bônus 2:</strong> Roteiros prontos de 15 segundos
                    </span>
                  </li>
                </ul>

                <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
                    <Lock className="h-4 w-4" />
                    Escassez: restam 23 de 100 vagas com desconto
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4 text-primary" />
                    O preço sobe em{" "}
                    <span className="font-display font-bold text-foreground">{countdown}</span>
                  </p>
                </div>

                <div className="mt-6">
                  <CtaButton className="w-full">Baixar e-book agora — 297MT</CtaButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* -------------------------- GARANTIA + FAQ ---------------------------- */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-success/30 bg-success/5 p-8 text-center sm:flex-row sm:text-left">
            <span className="glow-success flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-success/15">
              <ShieldCheck className="h-10 w-10 text-success" />
            </span>
            <div>
              <h2 className="text-2xl font-bold">Garantia de 7 dias</h2>
              <p className="mt-2 text-muted-foreground">
                Baixas o e-book, aplicas o método e, se em 7 dias achares que não é para ti,
                devolvemos 100% do teu dinheiro. Sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="mt-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="overflow-hidden rounded-2xl border-hairline bg-card">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
                  aria-expanded={openFaq === i}
                >
                  {faq.pergunta}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm text-muted-foreground">{faq.resposta}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------- CTA FINAL + FOOTER ------------------------ */}
      <footer className="border-t border-border/60 px-5 pt-14 pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Smartphone className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              O teu primeiro 1.000MT está a <span className="text-gradient-neon">1 clique</span> de
              distância
            </h2>
            <p className="mt-3 text-muted-foreground">
              Amanhã vais wish ter começado hoje. Começa agora.
            </p>
            <div className="mt-6">
              <CtaButton />
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center text-xs text-muted-foreground">
          <p>
            Aviso legal: este produto é um material educativo digital. Os resultados apresentados
            não são garantidos e dependem do esforço e dedicação de cada pessoa. Não somos
            afiliados nem endossados pelo TikTok. Preços em Meticais (MT).
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" />
            Suporte: suporte@tiktokdozeroaolucro.co.mz · © 2026 TikTok do Zero ao Lucro
          </p>
        </div>
      </footer>

      {/* --------------------------- CTA FLUTUANTE ---------------------------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-success/25 bg-background/90 p-3 backdrop-blur-md">
        <Link
          to="/checkout"
          className="animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-2xl bg-success px-6 py-4 font-display text-base font-bold tracking-wide text-success-foreground uppercase transition-transform active:scale-95 sm:mx-auto sm:max-w-md sm:text-lg"
        >
          <ShoppingBag className="h-5 w-5" />
          Baixar e-book agora — 297MT
        </Link>
      </div>
    </div>
  );
}

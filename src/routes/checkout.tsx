import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Loader2,
  Lock,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import ebookMockup from "@/assets/ebook-mockup.png";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      {
        title: "Checkout — TikTok do Zero ao Lucro | 297MT",
        description:
          "Finaliza a tua compra do e-book TikTok do Zero ao Lucro por M-Pesa ou eMola. Acesso imediato após o pagamento.",
      },
      { property: "og:title", content: "Checkout — TikTok do Zero ao Lucro" },
      {
        property: "og:description",
        content: "Finaliza a tua compra por M-Pesa ou eMola. Acesso imediato após o pagamento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

type Metodo = "mpesa" | "emola";
type Estado = "form" | "a-processar" | "pendente";

function CheckoutPage() {
  const [metodo, setMetodo] = useState<Metodo>("mpesa");
  const [estado, setEstado] = useState<Estado>("form");
  const [telefone, setTelefone] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  const submeter = (e: React.FormEvent) => {
    e.preventDefault();
    const digitos = telefone.replace(/\D/g, "");
    if (!nome.trim()) return setErro("Escreve o teu nome completo.");
    if (!email.includes("@")) return setErro("Escreve um email válido.");
    if (digitos.length < 9) return setErro("Escreve um número de celular válido (9 dígitos).");
    setErro("");
    setEstado("a-processar");
    // Simulação do pedido de pagamento — o gateway real (M-Pesa/eMola) é
    // confirmado no celular do cliente via push USSD.
    setTimeout(() => setEstado("pendente"), 2500);
  };

  return (
    <div className="bg-hero-radial flex min-h-screen flex-col px-5 py-10">
      <div className="mx-auto w-full max-w-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a página
        </Link>

        {estado === "pendente" ? (
          <div className="mt-8 rounded-4xl border border-success/30 bg-card p-8 text-center">
            <span className="glow-success mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
              <BadgeCheck className="h-8 w-8 text-success" />
            </span>
            <h1 className="mt-5 text-2xl font-bold">Pedido recebido!</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {nome.split(" ")[0]}, acabamos de enviar o pedido de pagamento de{" "}
              <strong className="text-foreground">297MT</strong> para o teu{" "}
              {metodo === "mpesa" ? "M-Pesa" : "eMola"} ({telefone}).
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Confirma o pagamento no teu celular (insere o teu PIN). Assim que o pagamento for
              confirmado, recebes o e-book + bônus no email <strong className="text-foreground">{email}</strong>.
            </p>
            <p className="mt-6 rounded-2xl border-hairline bg-background/60 p-4 text-xs text-muted-foreground">
              Dificuldade em confirmar? Contacta o suporte: suporte@tiktokdozeroaolucro.co.mz
            </p>
          </div>
        ) : (
          <>
            <h1 className="mt-6 text-center font-display text-3xl font-bold tracking-tight">
              Finalizar <span className="text-gradient-neon">compra</span>
            </h1>

            {/* Resumo do pedido */}
            <div className="mt-6 flex items-center gap-4 rounded-3xl border-hairline bg-card p-4">
              <img
                src={ebookMockup}
                alt="E-book TikTok do Zero ao Lucro"
                loading="lazy"
                width={96}
                height={96}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div className="flex-1 text-sm">
                <p className="font-semibold">TikTok do Zero ao Lucro</p>
                <p className="text-muted-foreground">E-book + 2 bônus exclusivos</p>
                <p className="mt-1">
                  <span className="text-xs text-muted-foreground line-through">1.497MT</span>{" "}
                  <span className="font-display text-lg font-bold text-success">297MT</span>
                </p>
              </div>
            </div>

            <form onSubmit={submeter} className="mt-6 space-y-5 rounded-4xl border-hairline bg-card p-6">
              {/* Método de pagamento */}
              <div>
                <p className="mb-3 text-sm font-semibold">Método de pagamento</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMetodo("mpesa")}
                    aria-pressed={metodo === "mpesa"}
                    className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-colors ${
                      metodo === "mpesa"
                        ? "border-success bg-success/10 text-success"
                        : "border-border bg-background/40 text-muted-foreground"
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    M-Pesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setMetodo("emola")}
                    aria-pressed={metodo === "emola"}
                    className={`flex items-center justify-center gap-2 rounded-2xl border p-4 text-sm font-semibold transition-colors ${
                      metodo === "emola"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background/40 text-muted-foreground"
                    }`}
                  >
                    <Wallet className="h-5 w-5" />
                    eMola
                  </button>
                </div>
              </div>

              {/* Dados */}
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted-foreground">Nome completo</span>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Anildo Mabjaia"
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted-foreground">Email (para receber o e-book)</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="oteuemail@exemplo.com"
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted-foreground">
                    Celular {metodo === "mpesa" ? "M-Pesa" : "eMola"} (ex: 84 123 4567)
                  </span>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="+258 84 123 4567"
                    className="w-full rounded-xl border border-input bg-background/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
                  />
                </label>
              </div>

              {erro && <p className="text-sm font-medium text-destructive">{erro}</p>}

              <button
                type="submit"
                disabled={estado === "a-processar"}
                className="animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-2xl bg-success px-6 py-4 font-display text-base font-bold tracking-wide text-success-foreground uppercase transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
              >
                {estado === "a-processar" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    A processar...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Pagar 297MT com {metodo === "mpesa" ? "M-Pesa" : "eMola"}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Ambiente seguro · Garantia de 7 dias · Acesso imediato após confirmação
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

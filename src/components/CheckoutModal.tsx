import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";

const CHECKOUT_URL = "https://checkout.escalepay.com/8386190";

/** Webhook opcional: preencher com a URL do webhook para receber os leads. */
const WEBHOOK_URL = "";

/** Aceita 9 dígitos (ex: 841234567), com ou sem prefixo +258. */
function normalizeMzPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("258")) d = d.slice(3);
  return d;
}

function isValidMzPhone(raw: string): boolean {
  const d = normalizeMzPhone(raw);
  return d.length === 9 && d[0] === "8" && ["82", "83", "84", "85", "86", "87"].includes(d.slice(0, 2));
}

export function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [erro, setErro] = useState("");

  // Fecha com Escape e bloqueia o scroll da página por trás.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const submeter = (e: React.FormEvent) => {
    e.preventDefault();
    const nomeTrim = nome.trim();
    if (nomeTrim.length < 3 || !nomeTrim.includes(" ")) {
      setErro("Escreve o teu nome completo.");
      return;
    }
    if (!isValidMzPhone(whatsapp)) {
      setErro("Número de WhatsApp inválido. Usa 9 dígitos, ex: 841234567.");
      return;
    }
    setErro("");

    const dados = {
      nome: nomeTrim,
      whatsapp: normalizeMzPhone(whatsapp),
      produto: "TikTok do Zero ao Lucro",
      preco: "197MT",
      data: new Date().toISOString(),
    };

    try {
      const lista = JSON.parse(localStorage.getItem("compras-tiktok-ebook") ?? "[]");
      lista.push(dados);
      localStorage.setItem("compras-tiktok-ebook", JSON.stringify(lista));
    } catch {
      // localStorage indisponível — não bloqueia a compra.
    }

    if (WEBHOOK_URL) {
      void fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      }).catch(() => undefined);
    }

    window.open(CHECKOUT_URL, "_blank", "noopener");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Finalizar Compra"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-3xl bg-white p-6 text-neutral-900 shadow-2xl sm:rounded-3xl"
        style={{ animation: "toast-in 0.25s ease-out both" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-bold">Finalizar Compra</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Preenche os teus dados para continuar para o pagamento — 197MT.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-full p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submeter} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-neutral-700">
              Nome completo <span className="text-red-500">*</span>
            </span>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Anildo Mabjaia"
              autoComplete="name"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-neutral-700">
              Número do WhatsApp <span className="text-red-500">*</span>
            </span>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ex: 841234567"
              autoComplete="tel"
              inputMode="numeric"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30"
            />
          </label>

          {erro && <p className="text-sm font-medium text-red-600">{erro}</p>}

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-6 py-4 font-display text-base font-bold tracking-wide text-white uppercase transition-transform hover:scale-[1.02] active:scale-95"
          >
            <CheckCircle2 className="h-5 w-5" />
            Continuar para Pagamento
          </button>

          <p className="text-center text-xs text-neutral-500">
            Ambiente seguro · Pagamento por M-Pesa ou eMola · Garantia de 7 dias
          </p>
        </form>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

const BUYERS = [
  { name: "Edson", city: "Maputo" },
  { name: "Inês", city: "Beira" },
  { name: "Chissano", city: "Matola" },
  { name: "Yara", city: "Nampula" },
  { name: "Gito", city: "Chimoio" },
  { name: "Lenna", city: "Luanda" },
  { name: "Kelson", city: "Quelimane" },
  { name: "Dário", city: "Tete" },
  { name: "Elsa", city: "Pemba" },
  { name: "Valdo", city: "Huambo" },
  { name: "Nércia", city: "Xai-Xai" },
  { name: "Cremilde", city: "Lichinga" },
];

type Purchase = { name: string; city: string; minutes: number };

/**
 * Simulated "people buying now" notification (local list, no fake sales data).
 * Appears every 12 seconds, bottom-left corner.
 */
export function SocialProofToast() {
  const [purchase, setPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let index = Math.floor(Math.random() * BUYERS.length);

    const show = () => {
      index = (index + 1 + Math.floor(Math.random() * (BUYERS.length - 1))) % BUYERS.length;
      setPurchase({
        ...BUYERS[index],
        minutes: 1 + Math.floor(Math.random() * 9),
      });
      hideTimer = setTimeout(() => setPurchase(null), 5000);
    };

    const first = setTimeout(show, 5000);
    const loop = setInterval(show, 12000);
    return () => {
      clearTimeout(first);
      if (hideTimer) clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, []);

  if (!purchase) return null;

  return (
    <div
      aria-live="polite"
      className="animate-toast-in fixed bottom-24 left-4 z-40 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border-hairline bg-card/95 p-3 pr-5 shadow-xl backdrop-blur-md sm:bottom-6"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15">
        <ShoppingBag className="h-5 w-5 text-success" />
      </span>
      <div className="text-sm leading-tight">
        <p className="font-semibold text-foreground">
          {purchase.name} de {purchase.city} acabou de comprar
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          há {purchase.minutes} min · TikTok do Zero ao Lucro
        </p>
      </div>
    </div>
  );
}

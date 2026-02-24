import { Share2, Mail, MessageSquare, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
  variant?: "compact" | "full";
}

const ShareButton = ({ url, title, text, variant = "compact" }: ShareButtonProps) => {
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
  const shareText = text || title;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        return;
      } catch {
        // User cancelled or error — show fallback
      }
    }
    setShowFallback((prev) => !prev);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Lien copié !");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Impossible de copier le lien");
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n${shareUrl}`)}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(`${title} ${shareUrl}`)}`;

  const fallbackButtons = [
    { label: "WhatsApp", href: whatsappUrl, icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ), bg: "#25D366" },
    { label: "Email", href: emailUrl, icon: <Mail className="w-4 h-4" />, bg: "#4A6741" },
    { label: "SMS", href: smsUrl, icon: <MessageSquare className="w-4 h-4" />, bg: "#3B82F6" },
  ];

  return (
    <div className="relative">
      {/* Main share button */}
      <button
        onClick={handleShare}
        className="inline-flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-white transition-all hover:scale-105 active:scale-95 min-h-[44px] min-w-[44px]"
        style={{ backgroundColor: "#3B82F6", fontFamily: "Montserrat, sans-serif" }}
        aria-label="Partager ce quiz"
      >
        <Share2 className="w-5 h-5" />
        <span className="text-[10px] font-bold leading-none">Partager</span>
      </button>

      {/* Fallback panel (desktop or when native share fails) */}
      {showFallback && (
        <div
          className="absolute right-0 top-full mt-2 z-50 bg-white rounded-xl shadow-lg border border-border/40 p-3 flex flex-col gap-2 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          {fallbackButtons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 min-h-[44px]"
              style={{ backgroundColor: btn.bg }}
              onClick={() => setShowFallback(false)}
            >
              {btn.icon}
              {btn.label}
            </a>
          ))}

          <button
            onClick={() => { handleCopy(); setShowFallback(false); }}
            className="inline-flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold border transition-all hover:opacity-90 min-h-[44px]"
            style={{ backgroundColor: copied ? "#d5e6dd" : "#f8f8f8", borderColor: "#E0E0E0", color: "#1a2b1c" }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copié !" : "Copier le lien"}
          </button>
        </div>
      )}

      {/* Click-away overlay */}
      {showFallback && (
        <div className="fixed inset-0 z-40" onClick={() => setShowFallback(false)} />
      )}
    </div>
  );
};

export default ShareButton;

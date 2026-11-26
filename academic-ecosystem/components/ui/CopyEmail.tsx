"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Copies the address to the clipboard, with a polite confirmation for screen readers. */
export function CopyEmail({ email, className, tone = "light" }: { email: string; className?: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-[3px] border px-4 text-[0.875rem] font-semibold transition-colors",
        tone === "light" ? "border-ink/20 text-ink hover:border-ink" : "border-ivory/25 text-ivory hover:border-ivory",
        className,
      )}
    >
      {copied ? <Check aria-hidden className="size-4" strokeWidth={2} /> : <Copy aria-hidden className="size-4" strokeWidth={1.75} />}
      <span>{copied ? "Copied" : "Copy address"}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}

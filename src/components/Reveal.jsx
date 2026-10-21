import { useEffect, useState } from "react";
import { animate, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { meta, questions } from "@/config/questions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Confetti } from "@/components/magicui/confetti";

const CONFETTI = ["#A94A63", "#E6B7BF", "#F4DADD", "#2E1F28", "#E9C987"];

export function formatAnswer(q, v) {
  if (v === undefined || v === "" || (Array.isArray(v) && !v.length)) return "Skipped";
  if (q.type === "emoji") {
    const o = q.options.find((o) => o.value === v);
    return `${o.emoji} ${o.label}`;
  }
  if (q.type === "slider") return `${v}/${q.max}`;
  return Array.isArray(v) ? v.join(", ") : String(v);
}

export function Reveal({ answers, onEdit, onRestart }) {
  const score = answers[meta.scoreQuestionId] ?? 0;
  const verdict = [...meta.verdicts].reverse().find((v) => score >= v.min) ?? meta.verdicts[0];
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const c = animate(0, score, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [score]);

  const copy = async () => {
    const text = `${meta.title.join(" ")}\n\n` + questions.map((q) => `${q.short}: ${formatAnswer(q, answers[q.id])}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-1 flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
      <Confetti colors={CONFETTI} />

      <div className="relative mx-auto h-48 w-48">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="5" className="stroke-ink/10" />
          <motion.circle
            cx="60" cy="60" r="52" fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-rose"
            initial={{ pathLength: 0 }} animate={{ pathLength: score / meta.scoreMax }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-7xl leading-none tabular-nums" aria-label={`Chemistry ${score} out of ${meta.scoreMax}`}>{shown}</span>
          <span className="mt-1 text-sm text-ink/50">chemistry</span>
        </div>
        {[["right-1 top-4", 0], ["left-2 bottom-6", 1.2]].map(([pos, d]) => (
          <motion.span
            key={pos} aria-hidden className={`absolute ${pos} text-rose`}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.15, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.6, delay: d }}
          >✦</motion.span>
        ))}
      </div>

      <BlurFade delay={0.9} className="mt-6 text-center">
        <h2 className="font-serif text-[34px] leading-tight tracking-tight">{verdict.title}</h2>
        <p className="mx-auto mt-3 max-w-[32ch] text-[16px] leading-relaxed text-ink/65">{verdict.body}</p>
      </BlurFade>

      <BlurFade delay={1.1} className="mt-8">
        <Card className="p-2">
          <dl className="divide-y divide-ink/10">
            {questions.map((q) => (
              <div key={q.id} className="flex items-baseline justify-between gap-6 px-4 py-3.5">
                <dt className="shrink-0 text-sm text-ink/50">{q.short}</dt>
                <dd className="text-right text-[15px] leading-snug">{formatAnswer(q, answers[q.id])}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </BlurFade>

      <BlurFade delay={1.2} className="mt-6 flex flex-col gap-3">
        <Button size="lg" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy my answers"}
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onEdit}>Edit answers</Button>
          <Button variant="ghost" onClick={onRestart}>Start over</Button>
        </div>
      </BlurFade>
    </div>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function Chips({ q, value, onChange }) {
  const props = q.multiple
    ? {
        type: "multiple",
        value: value ?? [],
        onValueChange: (v) => {
          if (q.max && v.length > q.max) return; // ignore picks past the limit
          onChange(v.length ? v : undefined);
        },
      }
    : { type: "single", value: value ?? "", onValueChange: (v) => onChange(v || undefined) };

  return (
    <div>
      <ToggleGroup aria-label={q.prompt} {...props}>
        {q.options.map((o) => (
          <ToggleGroupItem key={o} value={o}>{o}</ToggleGroupItem>
        ))}
      </ToggleGroup>
      {q.multiple && q.max && (
        <p className="mt-4 text-sm tabular-nums text-ink/45">{(value ?? []).length} of {q.max} chosen</p>
      )}
    </div>
  );
}

function EmojiRating({ q, value, onChange }) {
  const selected = q.options.find((o) => o.value === value);
  return (
    <div>
      <div role="radiogroup" aria-label={q.prompt} className="grid grid-cols-5 gap-2">
        {q.options.map((o) => {
          const on = o.value === value;
          return (
            <motion.button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={o.label}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: on ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              onClick={() => onChange(o.value)}
              className={cn(
                "flex aspect-square items-center justify-center rounded-2xl border text-[30px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose",
                on ? "border-ink bg-blush" : "border-ink/10 bg-cream/70",
                value !== undefined && !on && "opacity-45"
              )}
            >
              {o.emoji}
            </motion.button>
          );
        })}
      </div>
      <p className="mt-5 h-7 text-center font-serif text-xl text-ink/75" aria-live="polite">
        {selected?.label ?? <span className="font-sans text-sm text-ink/40">Tap the one that fits</span>}
      </p>
    </div>
  );
}

function ChemistrySlider({ q, value, onChange }) {
  const nums = Array.from({ length: q.max - q.min + 1 }, (_, i) => q.min + i);
  const touched = value !== undefined;
  const v = value ?? Math.round((q.min + q.max) / 2);

  return (
    <div>
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-1 font-serif leading-none text-ink">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={touched ? v : "none"}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="inline-block text-[80px] tabular-nums"
            >
              {touched ? v : "–"}
            </motion.span>
          </AnimatePresence>
          <span className="text-2xl text-ink/30">/{q.max}</span>
        </div>
        <p className="mt-3 h-7 font-serif text-xl text-rose" aria-live="polite">
          {touched ? q.labels[v - q.min] : <span className="font-sans text-sm text-ink/40">{q.placeholder}</span>}
        </p>
      </div>

      <Slider
        className="mt-5"
        min={q.min}
        max={q.max}
        step={1}
        value={[v]}
        data-touched={touched}
        aria-label={q.prompt}
        onValueChange={([n]) => onChange(n)}
      />
      {/* Tick buttons are centered under the thumb's travel range (thumb is 32px wide). */}
      <div className="flex justify-between px-0.5">
        {nums.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Set chemistry to ${n}`}
            className={cn(
              "flex h-11 w-7 items-center justify-center rounded-full text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose",
              touched && n === value ? "font-semibold text-ink" : "text-ink/35 hover:text-ink/70"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextAnswer({ q, value, onChange }) {
  return (
    <div>
      <Textarea
        value={value ?? ""}
        maxLength={q.maxLength}
        placeholder={q.placeholder}
        aria-label={q.prompt}
        onChange={(e) => onChange(e.target.value || undefined)}
      />
      <p className="mt-2 text-right text-xs tabular-nums text-ink/40">{(value ?? "").length}/{q.maxLength}</p>
    </div>
  );
}

export function QuestionInput({ q, value, onChange }) {
  switch (q.type) {
    case "chips": return <Chips q={q} value={value} onChange={onChange} />;
    case "emoji": return <EmojiRating q={q} value={value} onChange={onChange} />;
    case "slider": return <ChemistrySlider q={q} value={value} onChange={onChange} />;
    case "text": return <TextAnswer q={q} value={value} onChange={onChange} />;
    default: return null;
  }
}

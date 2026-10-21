import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { meta, questions } from "@/config/questions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { QuestionInput } from "@/components/inputs";
import { Reveal } from "@/components/Reveal";

const N = questions.length;

const variants = {
  enter: ({ d, r }) => ({ opacity: 0, x: r ? 0 : d * 32 }),
  center: { opacity: 1, x: 0 },
  exit: ({ d, r }) => ({ opacity: 0, x: r ? 0 : d * -32 }),
};

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(meta.storageKey));
    if (s && typeof s.step === "number" && s.step <= N && s.answers) return s;
  } catch {}
  return { step: -1, answers: {} };
}

function isAnswered(q, v) {
  if (q.type === "text") return !!v?.trim();
  if (q.multiple) return Array.isArray(v) && v.length > 0;
  return v !== undefined && v !== "";
}

function ProgressBar({ step }) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-label="Progress" aria-valuemin={1} aria-valuemax={N} aria-valuenow={step + 1}>
      {questions.map((q, i) => (
        <div key={q.id} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            className="h-full origin-left rounded-full bg-rose"
            initial={false}
            animate={{ scaleX: i <= step ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const reduce = useReducedMotion();
  const shake = useAnimationControls();
  const [{ step, answers }, setState] = useState(load);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(meta.storageKey, JSON.stringify({ step, answers })); } catch {}
  }, [step, answers]);

  const go = (to) => {
    setDir(to > step ? 1 : -1);
    setError(false);
    setState((s) => ({ ...s, step: to }));
    window.scrollTo({ top: 0 });
  };
  const setAnswer = (id, v) => {
    setError(false);
    setState((s) => ({ ...s, answers: { ...s.answers, [id]: v } }));
  };
  const restart = () => {
    setDir(-1);
    setError(false);
    setState({ step: -1, answers: {} });
  };

  const inQuestion = step >= 0 && step < N;
  const q = inQuestion ? questions[step] : null;
  const answered = q ? isAnswered(q, answers[q.id]) : false;
  const optional = q?.required === false;

  const next = () => {
    if (!optional && !answered) {
      setError(true);
      if (!reduce) shake.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } });
      return;
    }
    go(step + 1);
  };

  const hasProgress = Object.keys(answers).length > 0;

  return (
    <div className="relative min-h-[100dvh] overflow-x-clip">
      <div aria-hidden className="pointer-events-none fixed -right-28 -top-28 h-80 w-80 rounded-full bg-blush/80 blur-3xl" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        {inQuestion && (
          <header>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm tabular-nums text-ink/60">{step + 1} of {N}</span>
              <button
                type="button"
                onClick={() => window.confirm("Start over? Your answers will be cleared.") && restart()}
                className="-mr-2 flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-ink/50 transition hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
              >
                <RotateCcw className="size-3.5" /> Restart
              </button>
            </div>
            <ProgressBar step={step} />
          </header>
        )}

        <div className="relative flex flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false} custom={{ d: dir, r: reduce }}>
            <motion.div
              key={step}
              custom={{ d: dir, r: reduce }}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col"
            >
              {step === -1 && (
                <div className="flex flex-1 flex-col justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16">
                  <div>
                    <BlurFade delay={0.05}>
                      <h1 className="font-serif text-[68px] leading-[0.95] tracking-tight">
                        {meta.title[0]}<br />{meta.title[1]}
                      </h1>
                    </BlurFade>
                    <BlurFade delay={0.2}>
                      <p className="mt-7 max-w-[30ch] text-[17px] leading-relaxed text-ink/65">{meta.intro}</p>
                    </BlurFade>
                  </div>
                  <BlurFade delay={0.35}>
                    <Button size="lg" className="w-full" onClick={() => go(0)}>
                      {hasProgress ? meta.resumeCta : meta.cta}
                    </Button>
                    <p className="mt-3 text-center text-sm text-ink/45">Takes about two minutes.</p>
                  </BlurFade>
                </div>
              )}

              {inQuestion && (
                <div className="flex flex-1 flex-col justify-center py-6">
                  <motion.div animate={shake}>
                    <Card className="p-6">
                      <h2 className="font-serif text-[30px] leading-[1.12] tracking-tight">{q.prompt}</h2>
                      {q.hint && <p className="mt-2.5 text-[15px] text-ink/55">{q.hint}</p>}
                      <div className="mt-7">
                        <QuestionInput q={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
                      </div>
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            role="alert"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-5 text-sm font-medium text-rose"
                          >
                            {q.error ?? "Choose an answer to continue."}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                </div>
              )}

              {step === N && <Reveal answers={answers} onEdit={() => go(0)} onRestart={restart} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {inQuestion && (
          <footer className="sticky bottom-0 -mx-5 flex gap-3 bg-cream px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <Button variant="outline" size="icon" onClick={() => go(step - 1)} aria-label="Back">
              <ArrowLeft />
            </Button>
            <Button size="lg" className="flex-1" onClick={next}>
              {step === N - 1 ? "Show me the verdict" : optional && !answered ? "Skip" : "Continue"}
              {step < N - 1 && <ArrowRight />}
            </Button>
          </footer>
        )}
      </div>
    </div>
  );
}

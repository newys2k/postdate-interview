import * as React from "react";
import { cn } from "@/lib/utils";

// text-base (16px) stops iOS Safari from zooming on focus.
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[148px] w-full resize-none rounded-2xl border border-ink/15 bg-cream/80 px-4 py-3.5 text-base leading-relaxed text-ink transition placeholder:text-ink/35 focus-visible:border-rose/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose/40",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };

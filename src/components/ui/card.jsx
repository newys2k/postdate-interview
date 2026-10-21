import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[28px] border border-ink/10 bg-white/55 shadow-[0_24px_48px_-32px_rgba(46,31,40,.45)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };

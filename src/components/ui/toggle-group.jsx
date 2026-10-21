import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";

const ToggleGroup = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex flex-wrap gap-2.5", className)} {...props} />
));
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      "min-h-[48px] rounded-full border border-ink/15 bg-cream/70 px-5 py-2.5 text-left text-[15px] text-ink/80 transition-all duration-200 hover:border-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose active:scale-[0.96] data-[state=on]:border-ink data-[state=on]:bg-ink data-[state=on]:text-cream",
      className
    )}
    {...props}
  />
));
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };

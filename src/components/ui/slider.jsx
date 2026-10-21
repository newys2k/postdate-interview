import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Chemistry slider with a heart thumb. Pass data-touched={bool} to dim it until the user interacts.
const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("group relative flex w-full touch-none select-none items-center py-3", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-ink/10">
      <SliderPrimitive.Range className="absolute h-full bg-rose transition-opacity group-data-[touched=false]:opacity-25" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      aria-label={props["aria-label"] ?? "Value"}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white shadow-[0_8px_16px_-8px_rgba(46,31,40,.6)] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-110 group-data-[touched=false]:opacity-75"
    >
      <Heart className="size-4 fill-rose text-rose" />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = "Slider";

export { Slider };

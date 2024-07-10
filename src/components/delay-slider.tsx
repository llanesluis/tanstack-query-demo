import useDelayLS from "../hooks/useDelayLS";
import { cn } from "../lib/utils";
import { Slider } from "./ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function DelaySlider({ className, ...props }: SliderProps) {
  const { delay, setDelay } = useDelayLS();

  const handleValueChannge = (value: number[]) => setDelay(value[0]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <Slider
        onValueChange={handleValueChannge}
        value={[delay]}
        max={2000}
        step={100}
        className={cn("min-w-48", className)}
        {...props}
      />
      <span className="text-sm text-muted-foreground transition">
        Delay:{" "}
        <strong
          className={cn(
            delay >= 500 ? "text-orange-400" : "",
            delay >= 1000 ? "text-orange-500" : "",
            delay >= 1500 ? "text-red-600" : "",
          )}
        >
          {delay}
        </strong>{" "}
        ms
      </span>
    </div>
  );
}

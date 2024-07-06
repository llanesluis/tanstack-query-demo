import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Slider } from "./ui/slider";
import { DELAY_KEY_LS } from "../services/local-storage/sleepLS";

type SliderProps = React.ComponentProps<typeof Slider>;

const initialDelay = Number(
  JSON.parse(localStorage.getItem(DELAY_KEY_LS) || "0"),
);

export default function DelaySlider({ className, ...props }: SliderProps) {
  const [delay, setDelay] = useState(initialDelay);

  useEffect(() => {
    localStorage.setItem(DELAY_KEY_LS, JSON.stringify(delay));
  }, [delay]);

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

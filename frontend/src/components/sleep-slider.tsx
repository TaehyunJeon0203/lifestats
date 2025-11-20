import { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SleepSlider({ className, ...props }: SliderProps) {
    const [value, setValue] = useState(1);

    return (
        <div>
            <Slider
                defaultValue={[1]}
                max={24}
                step={1}
                className={cn("w-[60%]", className)}
                onValueChange={(v) => setValue(v[0])}
                {...props}
            />
            <span className="text-lg font-medium w-8 text-center">{value} 시간</span>
        </div>
    );
}
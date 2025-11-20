import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

// Props 타입 정의
interface SleepSliderProps {
    id?: string;
    name?: string;
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export function SleepSlider({ id, name, value = 7, onChange, className }: SleepSliderProps) {
    const handleValueChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <div>
            <Slider
                id={id}
                name={name}
                value={[value]}
                min={1}
                max={24}
                step={1}
                className={cn("w-[60%]", className)}
                onValueChange={handleValueChange}
            />
            <span className="text-lg font-medium w-8 text-center">{value} 시간</span>
        </div>
    );
}
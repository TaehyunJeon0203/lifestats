import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

// Props 타입 정의
interface CoffeeSliderProps {
    id?: string;
    name?: string;
    value?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export function CoffeeSlider({ id, name, value = 2, onChange, className }: CoffeeSliderProps) {
    const handleValueChange = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <div>
            <Slider
                id={id}
                name={name}
                value={[value]}
                max={10}
                step={1}
                className={cn("w-[60%]", className)}
                onValueChange={handleValueChange}
            />
            <span className="text-lg font-medium w-8 text-center">{value} 잔</span>
        </div>
    );
}
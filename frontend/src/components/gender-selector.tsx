import {
    Field,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface GenderSelectProps {
    value?: string;
    onChange?: (value: string) => void;
}

export function GenderSelect({ value, onChange }: GenderSelectProps) {
    return (
        <div className="w-full max-w-md">
            <Field>
                <FieldLabel>성별</FieldLabel>
                <Select value={value} onValueChange={onChange}>
                    <SelectTrigger>
                        <SelectValue placeholder="성별을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
        </div>
    );
}

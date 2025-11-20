"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// Props 타입 정의
interface DatePickerProps {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                생년월일
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {value ? value.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value || undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onChange?.(date || null);
                            setOpen(false);
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
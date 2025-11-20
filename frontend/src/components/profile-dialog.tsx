import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./date-picker";
import { CoffeeSlider } from "./coffee-slider";
import { SleepSlider } from "./sleep-slider";

export function ProfileDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">정보 입력</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>프로필 정보 입력</DialogTitle>
                        <DialogDescription>
                            프로필 정보를 여기에 입력하세요. 완료되면 저장을 클릭하세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">이름</Label>
                            <Input id="name-1" name="name" defaultValue="홍길동" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">사용자 이름</Label>
                            <Input id="username-1" name="username" defaultValue="@honggildong" />
                        </div>
                        <div className="grid gap-3">
                            <DatePicker />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="coffee-1">하루 커피 섭취량</Label>
                            <CoffeeSlider id="coffee-1" name="coffee" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sleep-1">하루 평균 수면시간</Label>
                            <SleepSlider id="sleep-1" name="sleep" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">취소</Button>
                        </DialogClose>
                        <Button type="submit">저장</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

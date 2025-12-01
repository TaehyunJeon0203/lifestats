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

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import { GenderSelect } from "./gender-selector";

export function ProfileDialog() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // 페이지 이동을 위한 hook

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        dateOfBirth: null as Date | null,
        sleepHours: 7,
        coffeeIntake: 2,
    });

    // 폼 제출 핸들러 (백엔드 연동)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log('📤 전송할 데이터:', formData);

            // 백엔드 API 호출
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    gender: formData.gender,
                    dateOfBirth: formData.dateOfBirth?.toISOString().split('T')[0] || null,
                    sleepHours: formData.sleepHours,
                    coffeeIntake: formData.coffeeIntake
                })
            });

            const data = await response.json();
            console.log('📥 받은 응답:', data);

            if (response.ok && data.success) {
                localStorage.setItem('profileId', data.data.id);

                // 성공 처리
                alert('✅ 프로필이 성공적으로 저장되었습니다!');
                console.log('저장된 프로필 ID:', data.data.id);

                // 대시보드로 리다이렉트
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500);

                // 폼 초기화
                setFormData({
                    name: "",
                    gender: "",
                    dateOfBirth: null,
                    sleepHours: 7,
                    coffeeIntake: 2,
                });
            } else {
                // 실패 처리
                alert(`❌ 저장 실패: ${data.error || '알 수 없는 오류'}`);
            }

        } catch (error) {
            console.error('🔥 API 호출 에러:', error);
            alert('❌ 네트워크 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // Input 필드 변경 핸들러
    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">정보 입력</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>프로필 정보 입력</DialogTitle>
                        <DialogDescription>
                            프로필 정보를 여기에 입력하세요. 완료되면 저장을 클릭하세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">이름</Label>
                            <Input
                                id="name-1"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="홍길동"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid gap-3">
                            <GenderSelect
                                value={formData.gender}
                                onChange={(value: string) => handleInputChange('gender', value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <DatePicker
                                value={formData.dateOfBirth}
                                onChange={(date: Date | null) => handleInputChange('dateOfBirth', date)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="sleep-1">하루 평균 수면시간</Label>
                            <SleepSlider
                                id="sleep-1"
                                name="sleep"
                                value={formData.sleepHours}
                                onChange={(value: number) => handleInputChange('sleepHours', value)}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="coffee-1">하루 커피 섭취량</Label>
                            <CoffeeSlider
                                id="coffee-1"
                                name="coffee"
                                value={formData.coffeeIntake}
                                onChange={(value: number) => handleInputChange('coffeeIntake', value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isLoading}>
                                취소
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? '저장 중...' : '저장'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Download } from 'lucide-react';

interface ShareCardProps {
    profile: {
        name: string;
    };
    stats: {
        age: number;
        hoursLived: number;
        daysLived: number;
        totalCoffeeCups: number;
        totalSleepHours: number;
    };
}

export function ShareCard({ profile, stats }: ShareCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateStoryCard = () => {
        setIsGenerating(true);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 인스타그램 스토리 사이즈 (9:16)
        canvas.width = 1080;
        canvas.height = 1920;

        // 배경 그라데이션
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 텍스트 설정
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';

        // 제목
        ctx.font = 'bold 80px Arial';
        ctx.fillText('내 인생 통계', canvas.width / 2, 200);

        // 이름
        ctx.font = 'bold 60px Arial';
        ctx.fillText(`${profile.name}님`, canvas.width / 2, 300);

        // 카드 영역
        const cardY = 400;
        const cardWidth = 950;
        const cardHeight = 1200;
        const cardX = (canvas.width - cardWidth) / 2;

        // 카드 배경
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 30);
        ctx.fill();

        // 통계 항목 그리기
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'left';

        const items = [
            { emoji: '🎂', label: '나이', value: `${Math.floor(stats.age)}세` },
            { emoji: '⏰', label: '살아온 시간', value: `${stats.hoursLived.toLocaleString()}시간` },
            { emoji: '❤️', label: '심장 박동', value: `${(stats.hoursLived * 60 * 70).toLocaleString()}회` },
            { emoji: '🫁', label: '숨쉰 횟수', value: `${(stats.hoursLived * 60 * 16).toLocaleString()}회` },
            { emoji: '😴', label: '총 수면시간', value: `${(stats.totalSleepHours / 8760).toFixed(1)}년` },
            { emoji: '☕', label: '마신 커피', value: `${stats.totalCoffeeCups.toLocaleString()}잔` },
            { emoji: '💰', label: '커피에 쓴 돈', value: `${(stats.totalCoffeeCups * 3000).toLocaleString()}원` },
        ];

        let yPos = cardY + 120;
        const itemHeight = 150;

        items.forEach((item) => {
            // 이모지
            ctx.font = '50px Arial';
            ctx.fillText(item.emoji, cardX + 70, yPos);

            // 라벨
            ctx.font = '36px Arial';
            ctx.fillStyle = '#666666';
            ctx.fillText(item.label, cardX + 160, yPos - 10);

            // 값
            ctx.font = 'bold 42px Arial';
            ctx.fillStyle = '#333333';
            ctx.fillText(item.value, cardX + 160, yPos + 40);

            yPos += itemHeight;
        });

        // 하단 텍스트
        ctx.textAlign = 'center';
        ctx.font = '36px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('lifestats.app', canvas.width / 2, canvas.height - 120);

        setIsGenerating(false);
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const link = document.createElement('a');
        link.download = `${profile.name}_lifestats.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    const shareToInstagram = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.toBlob(async (blob) => {
            if (!blob) return;

            const file = new File([blob], 'lifestats.png', { type: 'image/png' });

            // 디버깅 로그
            console.log('🔍 Web Share API 지원:', !!navigator.share);
            console.log('🔍 canShare 지원:', !!navigator.canShare);
            if (navigator.canShare) {
                console.log('🔍 파일 공유 가능:', navigator.canShare({ files: [file] }));
            }

            // Web Share API 지원 확인 (더 관대하게)
            if (navigator.share) {
                try {
                    // canShare가 없거나 true를 반환하면 시도
                    const canShare = !navigator.canShare || navigator.canShare({ files: [file] });

                    if (canShare) {
                        await navigator.share({
                            files: [file],
                            title: '내 인생 통계',
                            text: `${profile.name}님의 인생 통계`,
                        });
                        console.log('✅ 공유 성공');
                    } else {
                        // 파일 공유 안되면 다운로드
                        console.log('⚠️ 파일 공유 불가능, 다운로드로 대체');
                        downloadImage();
                        alert('이미지가 다운로드되었습니다. 갤러리에서 인스타그램에 업로드해주세요!');
                    }
                } catch (error: any) {
                    if (error.name === 'AbortError') {
                        console.log('❌ 공유 취소됨');
                    } else {
                        console.error('❌ 공유 오류:', error);
                        // 오류 발생시 다운로드
                        downloadImage();
                        alert('공유에 실패했습니다. 이미지를 다운로드합니다.');
                    }
                }
            } else {
                // Web Share API 미지원시 다운로드
                console.log('❌ Web Share API 미지원');
                downloadImage();
                alert('이미지가 다운로드되었습니다. 갤러리에서 인스타그램에 업로드해주세요!');
            }
        }, 'image/png');
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Button
                    onClick={generateStoryCard}
                    disabled={isGenerating}
                    className="flex-1"
                >
                    {isGenerating ? '생성 중...' : '📸 공유 이미지 생성'}
                </Button>
                <Button
                    onClick={shareToInstagram}
                    variant="default"
                    size="icon"
                    title="인스타그램 공유"
                >
                    <Share2 className="w-4 h-4" />
                </Button>
                <Button
                    onClick={downloadImage}
                    variant="outline"
                    size="icon"
                    title="다운로드"
                >
                    <Download className="w-4 h-4" />
                </Button>
            </div>

            {/* 숨겨진 Canvas */}
            <canvas
                ref={canvasRef}
                style={{ display: 'none' }}
            />

            <p className="text-sm text-muted-foreground text-center">
                💡 모바일에서는 공유 버튼을 눌러 인스타그램에 바로 공유할 수 있습니다
            </p>
        </div>
    );
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProfileData {
    id: string;
    name: string;
    gender: string;
    dateOfBirth: string;
    sleepHours: number;
    coffeeIntake: number;
}

interface StatsData {
    age: number;
    hoursLived: number;
    daysLived: number;
    totalSleepHours: number;
    totalCoffeeCups: number;
    sleepPercentage: number;
}

interface AppContentProps {
    profile: ProfileData | null;
    stats: StatsData | null;
}

export function AppContent({ profile, stats }: AppContentProps) {
    if (!profile || !stats) {
        return (
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">프로필을 먼저 설정해주세요</h2>
                    <p className="text-muted-foreground">통계를 보려면 개인정보를 입력해야 합니다.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{profile.name}님의 인생 통계</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">현재 나이</CardTitle>
                        <span className="text-2xl">🎂</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(Math.abs(stats.daysLived) / 365)}세</div>
                        <p className="text-xs text-muted-foreground">
                            살아온 일수: {Math.abs(stats.daysLived).toFixed(0)}일
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 살아온 시간</CardTitle>
                        <span className="text-2xl">⏰</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.abs(stats.hoursLived).toLocaleString()}시간
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {(Math.abs(stats.hoursLived) / 8760).toFixed(1)}년
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 수면시간</CardTitle>
                        <span className="text-2xl">😴</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.abs(stats.totalSleepHours).toLocaleString()}시간
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {(Math.abs(stats.totalSleepHours) / 8760).toFixed(1)}년
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">총 커피</CardTitle>
                        <span className="text-2xl">☕</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {Math.abs(stats.totalCoffeeCups).toLocaleString()}잔
                        </div>
                        <p className="text-xs text-muted-foreground">
                            하루 평균 {profile.coffeeIntake}잔
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">수면 비율</CardTitle>
                        <span className="text-2xl">📊</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.sleepPercentage.toFixed(1)}%</div>
                        <Progress value={stats.sleepPercentage} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>재미있는 통계</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm">생존 시간:</span>
                                <span className="text-sm font-medium">
                                    {Math.abs(stats.hoursLived).toLocaleString()}시간
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">생존 일수:</span>
                                <span className="text-sm font-medium">
                                    {Math.abs(stats.daysLived).toFixed(0)}일
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">수면으로 보낸 연수:</span>
                                <span className="text-sm font-medium">
                                    {(Math.abs(stats.totalSleepHours) / 8760).toFixed(1)}년
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm">월 평균 커피:</span>
                                <span className="text-sm font-medium">
                                    {(profile.coffeeIntake * 30).toLocaleString()}잔
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
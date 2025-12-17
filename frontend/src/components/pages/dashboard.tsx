import { AppSidebar } from "@/components/app-sidebar";
import { AppContent } from "@/components/app-content";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/config";

interface ProfileData {
  id: string;
  name: string;
  gender: string;
  dateOfBirth: string;
  sleepHours: number;
  dailyCoffeeIntake: number;
}

interface StatsData {
  age: number;
  hoursLived: number;
  daysLived: number;
  totalSleepHours: number;
  totalCoffeeCups: number;
  sleepPercentage: number;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfileAndStats();
  }, []);

  const loadProfileAndStats = async () => {
    try {
      setLoading(true);
      console.log('🔄 대시보드 데이터 로딩 시작...');

      // 저장된 프로필 ID 확인
      const profileId = localStorage.getItem('profileId');
      console.log('📁 저장된 프로필 ID:', profileId);

      if (profileId) {
        // 🔥 백엔드에서 프로필과 통계 가져오기
        console.log('📡 API 요청 시작...');

        const response = await fetch(`${API_URL}/api/profile/${profileId}/stats`);
        const data = await response.json();

        console.log('📥 API 응답:', data);

        if (response.ok && data.success) {
          setProfile(data.profile);

          setStats(data.data);

          console.log('✅ 데이터 로딩 완료');
        } else {
          setError(data.error || '데이터를 불러오는데 실패했습니다.');
          console.error('❌ API 오류:', data.error);
        }
      } else {
        setError('프로필이 설정되지 않았습니다. 프로필을 먼저 생성해주세요.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error('🔥 로딩 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar profile={profile} stats={stats} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Loading...</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar profile={profile} stats={stats} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Error</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600">오류 발생</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={loadProfileAndStats}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                다시 시도
              </button>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  {profile?.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Stats</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <AppContent profile={profile} stats={stats} />
      </SidebarInset>
    </SidebarProvider>
  );
};
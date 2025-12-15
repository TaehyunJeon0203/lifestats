import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import man from "../assets/man.png";

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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  profile?: ProfileData | null;
  stats?: StatsData | null;
}

export function AppSidebar({ profile, stats, ...props }: AppSidebarProps) {
  // 기본값 설정
  const displayName = profile?.name || "";
  const displayAge = stats ? Math.floor(Math.abs(stats.daysLived) / 365) : 0;
  const displayLifetime = stats ? Math.abs(stats.hoursLived).toFixed(1) : "오류";

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-bold">{displayAge}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Lifetime {displayLifetime}h<br />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col items-center">
          <img
            src={man}
            alt="캐릭터"
            className="h-full w-auto object-contain"
          />
          <span className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            {displayName}
          </span>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
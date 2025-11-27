// 기본 시간 통계
export interface TimeStats {
  hoursLived: number;
  daysLived: number;
  yearsLived: number;
  monthsLived: number;
  weeksLived: number;
}

// 생활 패턴 통계
export interface LifestyleStats {
  totalSleepHours: number;
  totalCoffeeCups: number;
  awakeDays: number;
  averageSleepPerDay: number;
  averageCoffeePerDay: number;
}

// 백분율 통계
export interface PercentageStats {
  sleepPercentage: number;
  awakePercentage: number;
  coffeeTimePercentage: number; // 하루 중 카페인 지속 시간
}

// 대시보드용 종합 통계
export interface DashboardStats {
  basic: TimeStats;
  lifestyle: LifestyleStats;
  percentages: PercentageStats;
  lastUpdated: string;
}

// 통계 계산을 위한 입력 데이터
export interface StatsInput {
  dateOfBirth: string;
  sleepHours: number;
  coffeeIntake: number;
  currentDate?: Date;
}

// 통계 비교용 (미래 확장)
export interface StatsComparison {
  current: DashboardStats;
  previousMonth?: Partial<DashboardStats>;
  trend?: 'up' | 'down' | 'stable';
}

// 목표 설정용 (미래 확장)
export interface LifeGoals {
  targetSleepHours?: number;
  maxCoffeeIntake?: number;
  healthScore?: number;
}
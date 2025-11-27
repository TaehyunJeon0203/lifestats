// 기본 라이프 통계
export interface LifeStats {
  // 살아온 시간
  hoursLived: number;
  daysLived: number;
  
  // 커피 통계
  totalCoffeeCups: number;
  
  // 수면 통계
  totalSleepHours: number;
  sleepPercentage: number; // 전체 인생 중 잠든 비율
}

// 통계 계산용 입력 데이터
export interface StatsInput {
  dateOfBirth: string;
  sleepHours: number;
  coffeeIntake: number;
}

// API 응답용
export interface StatsResponse {
  success: boolean;
  data: LifeStats;
  profile: {
    name: string;
    dateOfBirth: string;
  };
}
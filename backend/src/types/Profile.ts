export interface Profile {
  id?: number;
  name: string;
  age?: number;
  gender?: 'M' | 'F' | 'Other';
  playtime?: number;
  birthdate?: string;
  dateOfBirth?: string;  // 추가
  sleepHours?: number;   // 추가
  coffeeIntake?: number; // 추가
  account_created?: string;
  last_played?: string;
  total_assets?: number;
  share_token?: string;
}
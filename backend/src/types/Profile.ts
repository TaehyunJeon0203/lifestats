export interface Profile {
  id?: number;
  name: string;
  age?: number;
  gender?: 'M' | 'F' | 'Other';
  playtime?: number;
  birthdate?: string;
  account_created?: string;
  last_played?: string;
  total_assets?: number;
  share_token?: string;
}
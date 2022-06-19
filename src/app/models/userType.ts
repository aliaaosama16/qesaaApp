export enum UserType {
  client = 'client',
  provider = 'provider',
  market = 'market',
}

export interface UserTypeData {
  id: UserType;
  type: UserType;
}

export interface User {
  id: number;
  user_type: string;
  first_name: string;
  email: string;
  full_phone: boolean;
  phone: string;
  api_token: string;
  instagram: string;
  twitter: string;
  city_id: number;
  city_title: '';
  neighborhood_id: number;
  neighborhood_title: '';
  is_active: boolean;
  is_blocked: boolean;
  is_confirmed: boolean;
  lang: boolean;
  avatar: boolean;
  license_image: boolean;
}

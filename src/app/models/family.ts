import { GeneralResponse } from 'src/app/models/general';
import { UserData } from './general';

export interface FamilyData extends UserData {
  provider_id: number;
}

export interface FamilyListResponse extends GeneralResponse {
  data: Family[];
}

export interface FamilyDataResponse extends GeneralResponse {
  data: Family;
}

export interface Family {
  id: number;
  first_name: string;
  email: string;
  full_phone: string;
  phone: string;
  api_token: string;
  instagram: string;
  twitter: string;
  city_id: number;
  city_title: string;
  neighborhood_id: number;
  neighborhood_title: string;
  avatar: string;
  license_image: string;
}

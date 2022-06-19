import {
  AuthDataResponse,
  GeneralResponse,
  Language,
  UserData,
} from './general';
import { UserType } from './userType';

export interface LoginData extends Language {
  phone: number;
  password: string;
  device_id: string;
  user_type?: UserType;
  phone_code?:string
}

export interface RegisterData extends UserData {
  user_type: UserType;
  first_name: string;
  phone: number;
  password: string;
  city_id?: number;
  neighborhood_id?: number;
  instagram?: string;
  twitter?: string;
  avatar?: string;
  license_image?: string;
  phone_code?:string;
}

export interface ForgetPasswordData extends Language {
  phone: number;
  phone_code:string
}
export interface ActivationData extends UserData {
  code: number;
  device_id: string;
}

export interface LogOutData extends UserData {
  device_id: string;
}

export interface UpdateUserData extends UserData{
  first_name:string;
  phone:number;
  avatar?:string;
  password?:string;
}

export interface AuthResponse extends GeneralResponse {
  status?: string;
  data?: AuthDataResponse;
}

export enum Status {
  Active = 'active',
  NonActive = 'non-active',
  Blocked = 'blocked',
  NonConfirm = 'non-confirm',
}

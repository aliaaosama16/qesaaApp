export interface GeneralResponse {
  key: number;
  msg: string;
  show_image?: boolean;
  notification_count?: number;

  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;

  maroof?: string;
  status?: string;
  image?: string;
  app_url?: string;
}

export interface Language {
  lang?: string;
}

export interface UserLocation extends UserData {
  lat: number;
  lng: number;
}

export interface UserData extends Language {
  user_id?: number;
}

export interface GeneralSectionResponse {
  id?: string;
  title?: string;
  image?: string;
  checked?: boolean;
  url?: string;
  desc?: string;
  lat?: string;
  lng?: string;
  section_id?: number;
  section_title?: string;
  service_id?: number;
  service_title?: string;
  count?: number;
}

export interface AuthDataResponse {
  
  first_name: string;
  full_phone: string;
  instagram: string;
  twitter: string;
  city_id: number;
  city_title: string;
  neighborhood_id: number;
  neighborhood_title: string;
  license_image: string;
  id?: number;
  user_type?: string;
  name: string;
  email?: string;
  phone: string;
  api_token?: string;
  is_active?: boolean;
  is_blocked?: boolean;
  is_confirmed?: boolean;
  lang?: string;
  avatar: string;
  see_family?:boolean;
  is_login:boolean
}

export interface ImageInfo extends Language {
  image: File;
}

export interface CountryData extends UserData {
  country_id: number;
}

export interface CitysData extends UserData {
  city_id: number;
}

export interface CitysResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface LocationAddessResponse extends GeneralResponse {
  data: string;
}


import { GeneralResponse, UserData } from './general';
import { StoreOrderType } from './sections';
export interface OrderListResponse extends GeneralResponse {
  data: Order[];
}

export interface OrderResponse extends GeneralResponse {
  data: Order;
}
export interface Order {
  provider_lat: number;
  provider_lng: number;
  type: StoreOrderType;
  id: number;
  user_id: string;
  user_name: string;
  user_phone: string;
  provider_id: number;
  provider_name: string;
  provider_phone: string;
  city_id: number;
  city_title_ar: string;
  city_title_en: string;
  neighborhood_id: number;
  neighborhood_title_ar: string;
  neighborhood_title_en: string;
  name: string;
  phone: string;
  phone_full: string;
  whatapp: string;
  lat: number;
  lng: number;
  notes: string;
  date: string;
  time: string;
  is_rated: boolean;
  rate: number;
  desc: string;
  status: string;
  status_f: string;
  status_map: StatusMap;
  order_date_time: string;
  order_date: string;
  order_time: string;
  order_services: any[];
  image: string;
  provider_full_phone: string;
  user_full_phone: string;
}

export interface StatusMap {
  key: string;
  value: boolean;
  // refused:boolean= false,
  // "new"='true',
  // "current"= 'true',
  // "in_way"='true',
  // "finish"='false'
}

export interface OrderData extends UserData {
  order_id: number;
}

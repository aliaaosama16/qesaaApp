import { GeneralResponse, GeneralSectionResponse, UserData } from './general';

export interface SectionResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface SectionProductsData extends UserData {
  section_id: number;
  title?: string;
}

export interface SectionProductsResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface ProductData extends UserData {
  service_id: number;
}

export interface ProductResponse extends GeneralResponse {
  data: GeneralSectionResponse;
}

export interface ProductsResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface CartData extends UserData {
  cart_id: number;
  count: number;
}

export enum CartCount {
  delete,
  update,
}

//store-order
export interface StoreOrderData extends UserData {
  type: StoreOrderType;
  name?: string;
  phone?: string;
  city_id?: number;
  neighborhood_id?: number;
  lat?: number;
  lng?: number;
  date?: string;
  time?:string;
  image?: string;
  notes?: string;
}

export enum StoreOrderType {
  service = 'service',
  volunteer = 'volunteer',
}


export interface RatingData extends UserData {
  provider_id: number;
  rate: number;
  desc?:string;
  order_id:number;
}
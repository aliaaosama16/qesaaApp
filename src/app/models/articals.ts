import { UserData, GeneralResponse } from './general';

// ALL articles  [services , news , projects , photos , videos]
export interface ArticalsData extends UserData {
  type:string;
}

export interface ArticalsDataResponse extends GeneralResponse {
  data: Artical[];
}

// specifiec article  [services , news , projects , photos , videos]
export interface ArticalData extends UserData {
  media_id: Number;
}

export interface ArticalDataResponse extends GeneralResponse {
  data: Artical;
}

export interface Artical {
  id: number;
  title: string;
  short_desc: string;
  desc: string;
  date: string;
  image: string;
  video: string;
}
export enum ArticalType {
  services = 'services',
  news = 'news ',
  projects = 'projects',
  photos = 'photos',
  videos = 'videos',
}

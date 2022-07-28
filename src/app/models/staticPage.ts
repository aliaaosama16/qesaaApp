import { GeneralResponse, GeneralSectionResponse, UserData } from './general';

export interface StaticPageData extends UserData {
  title: StaticPageTitle;
}

export interface StaticPageResponse extends GeneralResponse {
  data: GeneralSectionResponse;
}

export enum StaticPageTitle {
  about = 'about',
  condition = 'condition',
  vission = 'vission',
  goals = 'goals',
  message = 'message',
  policy = 'policy',
  support = 'support',
  volunteer = 'volunteer',
  home = 'home',
  market = 'market',
  services = 'services',
}

export interface SlideData extends UserData {
 type:StaticPageTitle;
}

export interface SlideResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

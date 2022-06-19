import {
  GeneralResponse,
  GeneralSectionResponse,
} from 'src/app/models/general';

export interface AppData extends GeneralResponse{
  data:AppDataOptions;
}

export interface AppDataOptions {
  cities:GeneralSectionResponse[];
  order_times:GeneralSectionResponse[];
  our_location:GeneralSectionResponse[];
}
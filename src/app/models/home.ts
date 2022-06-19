import { GeneralResponse, GeneralSectionResponse } from "./general";

export interface HomeResponse extends GeneralResponse {
    data: HomeResponseOptions;
  }
  
  export interface HomeResponseOptions {
    sliders: GeneralSectionResponse[];
    upcoming_date_time:string,
    upcoming_date:string,
    upcoming_time:string,
    volunteers_count: string,
    beneficiaries_count: string,
    satisfaction_masure: string,
    partners: GeneralSectionResponse[];
    says:GeneralSectionResponse[];
  }
  
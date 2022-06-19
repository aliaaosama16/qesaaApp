import { GeneralResponse } from './general';

export interface Intro extends GeneralResponse {
  data: IntroData;
}

export interface IntroData {
  first_title: string;
  first_desc: string;
  first_image: string;
  second_title: string;
  second_desc: string;
  second_image: string;
  third_title: string;
  third_desc: string;
  third_image: string;
}

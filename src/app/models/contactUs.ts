import { Language } from './general';

export interface ContactUsData extends Language {
  type: ContactType;
  name: string;
  phone: string;
  message: string;
  email?:string;
}

export enum ContactType {
  contact = 'contact',
  suggest = 'suggest',
  volunteer = 'volunteer',
}

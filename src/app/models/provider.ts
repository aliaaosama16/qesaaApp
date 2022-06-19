import { UserData } from 'src/app/models/general';
export interface LocationData extends UserData {
  lat: number;
  lng:  number;
}

export interface ChangeStatusData extends UserData {
  order_id: number;
  status: StatusList;
  cancel_notes?: string;
}

export enum StatusList {
  in_way = 'in_way',
  finish = 'finish',
  cancel = 'cancel',
}

import { Language } from "./general"

export interface ForgetPasswordData extends Language{
  
    phone:number
}

export interface ChangePasswordData{
    user_id:number,
    code:string,
    password:string
}

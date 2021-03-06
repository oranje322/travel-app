import { SET_COUNTRIES, SET_LANG } from "../reducers/reducer";
import { ICountry } from "../reducers/reducerTypes";

export interface ISetCountries {
  type: typeof SET_COUNTRIES,
  payload: ICountry[]
}

export interface ISetLang {
  type: typeof SET_LANG,
  payload: string
}



export type ActionsTypes = ISetCountries | ISetLang
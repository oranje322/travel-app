import { ICountry } from "../reducers/reducerTypes";
import { ISetCountries, ISetLang } from "./actionsTypes";
import { SET_COUNTRIES, SET_LANG } from "../reducers/reducer";

export const setCountries = (payload: ICountry[]): ISetCountries => ({ type: SET_COUNTRIES, payload });
export const setLang = (payload: string): ISetLang => ({ type: SET_LANG, payload });
import {SET_COUNTRIES, SET_FILTERED_COUNTRIES, SET_LANG, SET_SEARCH_VALUE} from "../reducers/reducer";
import {ICountry} from "../reducers/reducerTypes";

export interface ISetCountries {
	type: typeof SET_COUNTRIES,
	payload: ICountry[]
}

export interface ISetLang {
	type: typeof SET_LANG,
	payload: string
}

export interface ISetSearchValue {
	type: typeof SET_SEARCH_VALUE,
	payload: string
}

export interface ISetFilteredCountries {
	type: typeof SET_FILTERED_COUNTRIES,
	payload: ICountry[]
}


export type ActionsTypes = ISetCountries | ISetLang | ISetSearchValue | ISetFilteredCountries
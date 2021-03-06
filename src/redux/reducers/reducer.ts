import { IState } from "./reducerTypes";
import { ActionsTypes } from "../actions/actionsTypes";

export const SET_COUNTRIES = 'SET_COUNTRIES'
export const SET_LANG = 'SET_LANG'

const initialState: IState = {
  countries: [],
  lang: 'ru',
}


const reducer = (state = initialState, action: ActionsTypes): IState => {
  switch (action.type) {
    case SET_COUNTRIES: {
      return {
        ...state,
        countries: action.payload
      }
    }
    case SET_LANG: {
      return {
        ...state,
        lang: action.payload
      }
    }
    default:
      return state;
  }
};

export default reducer
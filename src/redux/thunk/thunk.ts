import { ThunkAction } from "redux-thunk";
import { IState } from "../reducers/reducerTypes";
import { ActionsTypes } from "../actions/actionsTypes";
import { Api } from "../../api/api";
import { setCountries } from "../actions/actions";

export const setCountriesThunk = (): ThunkAction<void, IState, unknown, ActionsTypes> => {
  return async (dispatch) => {
    let response = await Api.getCountries();
    dispatch(setCountries(response.data));
  };
};
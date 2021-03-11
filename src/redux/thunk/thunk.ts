import {ThunkAction} from "redux-thunk";
import {IState} from "../reducers/reducerTypes";
import {ActionsTypes} from "../actions/actionsTypes";
import {Api} from "../../api/api";
import {setCountries, setFilteredCountries, setSearchValue} from "../actions/actions";

export const setCountriesThunk = (): ThunkAction<void, IState, unknown, ActionsTypes> => {
	return async (dispatch, getState) => {
		let response = await Api.getCountries();
		dispatch(setCountries(response.data));
		sessionStorage.setItem('travel-app-state', JSON.stringify(getState()))
	};
};

export const changeSearchThunk = (value: string): ThunkAction<void, IState, unknown, ActionsTypes> => {
	return async (dispatch, getState) => {
		dispatch(setSearchValue(value))

		if (getState().searchValue.length > 0) {
			let filteredCountries = getState().countries.filter(
				country => country.country.toLowerCase().includes(value.toLowerCase())
					|| country.capital.toLowerCase().includes(value.toLowerCase())
			)
			dispatch(setFilteredCountries(filteredCountries))
		}
	}
}
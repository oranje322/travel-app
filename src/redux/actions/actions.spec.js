import {SET_COUNTRIES, SET_FILTERED_COUNTRIES, SET_LANG, SET_SEARCH_VALUE, SET_USER_DATA} from "../reducers/reducer";
import {setCountries, setFilteredCountries, setLang, setSearchValue, setUserData} from "./actions";


describe('actions', () => {
	it('should create an action to set lang', () => {
		const payload = 'en'
		const expectedAction = {
			type: SET_LANG,
			payload
		}
		expect(setLang(payload)).toEqual(expectedAction)
	})
	it('should create an action to set countries', () => {
		const payload = []
			const expectedAction = {
				type: SET_COUNTRIES,
				payload
			}
			expect(setCountries(payload)).toEqual(expectedAction)
	})
	it('should create an action to set search value', () => {
		const payload = 'russia'
		const expectedAction = {
			type: SET_SEARCH_VALUE,
			payload
		}
		expect(setSearchValue(payload)).toEqual(expectedAction)
	})
	it('should create an action to set filtered countries', () => {
		const payload = []
		const expectedAction = {
			type: SET_FILTERED_COUNTRIES,
			payload
		}
		expect(setFilteredCountries(payload)).toEqual(expectedAction)
	})
	it('should create an action to set user data', () => {
		const payload = {}
		const expectedAction = {
			type: SET_USER_DATA,
			payload
		}
		expect(setUserData(payload)).toEqual(expectedAction)
	})
})
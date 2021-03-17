import reducer, {initialState} from "./reducer";

describe('reducer initial state', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			{
				...initialState
			}
		)
	})
})

describe('reducer lang', () => {
	it('should set lang', () => {
		expect(
			reducer(initialState, {
				type: "SET_LANG",
				payload: 'en'
			})
		).toEqual(
			{
				...initialState,
				lang: 'en'
			}
		)
	})
})

describe('set countries reducer', () => {
	const action = {
		type: "SET_COUNTRIES", payload: [{
			country: 'Russia',
			capital: 'Moscow',
			coordinates: [123, 456],
			currency: 'RUB',
			ISOCode: 'RU',
			timezone: 'Europe/Moscow',
			imageURL: 'imageUrl',
			videoURL: 'videoUrl',
			desc: 'Moscow',
			attractions: [{
				name: 'name',
				imageURL: 'imageUrl',
				desc: 'desc',
				_id: 'id'
			}]
		}]
	}
	const state = reducer(initialState, action)

	it('should set countries length === 1', () => {
		expect(state.countries).toHaveLength(1)
	})

	it('should set countries data', () => {
		expect(state.countries).toEqual([{
			country: 'Russia',
			capital: 'Moscow',
			coordinates: [123, 456],
			currency: 'RUB',
			ISOCode: 'RU',
			timezone: 'Europe/Moscow',
			imageURL: 'imageUrl',
			videoURL: 'videoUrl',
			desc: 'Moscow',
			attractions: [{
				name: 'name',
				imageURL: 'imageUrl',
				desc: 'desc',
				_id: 'id'
			}]
		}])
	})
})

describe('reducer user data', () => {
	const action = {
		type: 'SET_USER_DATA', payload: {
			name: 'Alesha',
			email: 'alesha@alesha.ru',
			photo: 'photo'
		}
	}
	const state = reducer(initialState, action)

	it('should set user data', () => {
		expect(state.userData).toEqual({
			name: 'Alesha',
			email: 'alesha@alesha.ru',
			photo: 'photo'
		})
	})
})


describe('reducer search value', () => {
	const action = {
		type: 'SET_USER_DATA', payload: 'qwe'
	}
	const state = reducer(initialState, action)

	it('should set search value', () => {
		expect(state.userData).toEqual('qwe')
	})
})



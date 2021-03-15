import { IRatingResponse } from "../api/api";

export const calculateRating = (array: IRatingResponse[]) => {
	let ratingsArray = array.map(obj => {
		return obj.rating
	})
	let reduce = ratingsArray.reduce((sum, current) => {
		return sum + current
	}, 0)
	return +(reduce / ratingsArray.length).toFixed(1)
}

export const nameRateArray = (array: IRatingResponse[]) => {
	let nameRate = array.map(obj => {
		return {
			name: obj.userName,
			rate: obj.rating
		}
	})
	return nameRate.filter(({ name }) => name !== undefined)
}

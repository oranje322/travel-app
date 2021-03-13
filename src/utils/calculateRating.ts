import {IRatingResponse} from "../api/api";

export const calculateRating = (array:IRatingResponse[]) => {
	let ratingsArray = array.map(obj => {
		return obj.rating
	})
	let reduce = ratingsArray.reduce((sum, current) => {
		return sum + current
	}, 0)

	return +(reduce / ratingsArray.length).toFixed(1)
}
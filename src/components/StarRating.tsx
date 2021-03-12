import React, {useEffect, useState} from "react";
import {Api} from "../api/api";
import {calculateRating} from "../utils/calculateRating";
import Rate from "rc-rate/es";
import 'rc-rate/assets/index.css';
import {useSelector} from "react-redux";
import {IState} from "../redux/reducers/reducerTypes";


interface Rating {
	id: string
}

export const StarRating = ({id}: Rating) => {
	const [starsValue, setStarsValue] = useState(0)
	const userName = useSelector((state: IState) => state.userData.name)
	console.log(userName)

	useEffect(() => {
		Api.getRating(id).then(r => setStarsValue(calculateRating(r.data)))
	}, [])

	const onClickChangeRate = (rating:number) => {
		Api.setRating(id, userName, rating).then(r => console.log(r))
	}

	return (
		<div className={'star-rating'}>
			<Rate count={5}
						value={starsValue}
						allowHalf={true}
						onChange={(rating) => onClickChangeRate(rating)}
						style={{fontSize: '30px', outline: "none", border: "none"}}
			/>
		</div>
	)
}; 
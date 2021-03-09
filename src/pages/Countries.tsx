import React, { useEffect, useState } from "react";
import "../countries.scss";
import Header from "../components/Header";
import ImageGallery from 'react-image-gallery';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../redux/reducers/reducerTypes";
import { Api } from "../api/api";

interface paramTypes {
	ISOCode: string
}

//todo пофиксить баг, если первый рендер был на этой странице - country undefined
//todo пофиксить размеры картинок в галерее и добавить/стилизовать описание
//todo видео с youtube вставляется не по прямой ссылке на видео, а по пути /embed/idVideo, в базу нужно вместо полного урла положить id
//todo виджеты

const Countries = () => {
	const { ISOCode } = useParams<paramTypes>()

	const lang = useSelector((state: IState) => state.lang)
	const country = useSelector((state: IState) => state.countries)
		.filter(countryObj => countryObj.ISOCode === ISOCode)[0]

	const [temperature, setTemperature] = useState<number | string>('')
	//насчет иконки хз, нужна ли она?
	const [temperatureIcon, setTemperatureIcon] = useState<string>('')

	useEffect(() => {
		Api.getTemperature(country.coordinates, lang).then(r => {
			setTemperature(Math.round(r.data.main.temp))
			setTemperatureIcon(r.data.weather[0].icon)
		})
	}, [])

	const myRenderItem = (props: any) => {
		return <div className="image-gallery-container">
			<img className="image-gallery-image" src={props.original} title="hello world" />
			<span className="image-gallery-description">{props.description}
			</span>
			<p className="image-gallery-title">{props.originalTitle}</p>
		</div>;
	}
	const images = [
		...country.attractions.map(attr => {
			return {
				original: attr.imageURL,
				thumbnail: attr.imageURL,
				description: attr.desc,
				originalTitle: attr.name,
				renderItem: myRenderItem
			}
		}
		)
	];



	return (
		<div className={"countries"}>
			<Header inputVisible={false} />

			<div className="widgets-block">
				{/* блок с виджетами */}
				<div className="widgets-block_info">
					<p className="weather"><img src={`http://openweathermap.org/img/wn/${temperatureIcon}.png`} alt="" /> {temperature} ℃</p>
					<p className="currency">1£ = 1.3$</p>
				</div>
				<div className="widgets-block_time">
					<p className="time">15:00</p>
					<h2 className="name">{`${country.country}, ${country.capital}`}</h2>
				</div>
			</div>

			<div className={"img-block"}>
				<img className={"country-img"} src={country.imageURL} alt="country-img" />
			</div>
			<div className="video-block">
				<iframe title={country.country} width="1000" height="420" src={`https://www.youtube.com/embed/${country.videoURL}`} frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen></iframe>
			</div>
			<div className="desc-block">
				<p className="desc-text">
					{country.desc}
				</p>
			</div>
			<div className="gallery-block">
				<h2 className={'subtitle'}>Что посмотреть?</h2>
				<div className="slider">
					<ImageGallery items={images} />
				</div>
			</div>
			<div className="map">
				<h2 className="subtitle">Где это?</h2>
			</div>
		</div>
	);
};

export default Countries;
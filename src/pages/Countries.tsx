import React, {useEffect, useState} from "react";
import "../countries.scss";
import Header from "../components/Header";
import Clock from "../components/Clock";
import {StarRating} from "../components/StarRating";
import ImageGallery from "react-image-gallery";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {IState} from "../redux/reducers/reducerTypes";
import {Api} from "../api/api";
import getSymbolFromCurrency from "currency-symbol-map";
import {Map} from "../components/Map";
import Footer from "../components/Footer";


interface paramTypes {
	ISOCode: string
}

const Countries = () => {
	const {ISOCode} = useParams<paramTypes>();

	const lang = useSelector((state: IState) => state.lang);
	const country = useSelector((state: IState) => state.countries)
		.filter(countryObj => countryObj.ISOCode === ISOCode)[0];

	const [temperature, setTemperature] = useState<number | string>("");
	const [temperatureIcon, setTemperatureIcon] = useState<string>("");
	const [currency, setCurrency] = useState<{ [index: string]: any }>({USD: 0, EUR: 0, RUB: 0})

	useEffect(() => {
		Api.getTemperature(country.coordinates, lang).then(r => {
			setTemperature(Math.round(r.data.main.temp));
			setTemperatureIcon(r.data.weather[0].icon);
		});
	}, [country.coordinates, lang]);

	useEffect(() => {
		Api.getСurrency(country.currency).then((r) => {
			let [usd, eur, rub] = r.map(obj => {
				if (obj.status === "fulfilled") {
					return obj.value.data.rates[country.currency].toFixed(2)
				} else return 0
			})
			setCurrency({
				USD: +usd,
				EUR: +eur,
				RUB: +rub
			})
		});
	}, [country.currency]);


	const myRenderItem = (props: any) => {
		return <div className="image-gallery-container">
			<img className="image-gallery-image" src={props.original} title="hello world"/>
			<StarRating totalStars={5}/>
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
					starRating: StarRating,
					renderItem: myRenderItem
				}
			}
		)
	];


	return (
		<div className={"countries"}>
			<Header inputVisible={false}/>

			<div className="widgets-block">
				{/* блок с виджетами */}
				<div className="widgets-block_info">
					<p className="weather"><img src={`http://openweathermap.org/img/wn/${temperatureIcon}.png`}
																			alt=""/> {temperature} ℃</p>
					<p className="currency">
						{
							Object.keys(currency).map((key, index) => {
								if (key !== country.currency) {
									return <span
										key={index}>1 {getSymbolFromCurrency(key)} = {currency[key]} {getSymbolFromCurrency(country.currency)} </span>

								}
							})
						}
					</p>

				</div>
				<div className="widgets-block_time">
					<p className="time"><Clock lang={"RU"} timeZone={country.timezone}/></p>
					<h2 className="name">{`${country.country}, ${country.capital}`}</h2>
				</div>
			</div>

			<div className={"img-block"}>
				<img className={"country-img"} src={country.imageURL} alt="country-img"/>
			</div>
			<div className="video-block">
				<iframe title={country.country} width="1000" height="420"
								src={`https://www.youtube.com/embed/${country.videoURL}`} frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen></iframe>
			</div>
			<div className="desc-block">
				<p className="desc-text">
					{country.desc}
				</p>
			</div>
			<div className="gallery-block">
				<h2 className={"subtitle"}>Что посмотреть?</h2>
				<div className="slider">
					<ImageGallery items={images}/>
				</div>
			</div>
			<div className="map">
				<div>
					<h2 className="subtitle">Где это?</h2>
					<div>
						<Map coordinates={country.coordinates}/>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	);
};

export default Countries;
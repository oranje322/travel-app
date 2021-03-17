import React, { useEffect } from "react";
import "../css/countries.scss";
import { useTranslation } from 'react-i18next';
import Header from "../components/Header";
import ImageGallery from "react-image-gallery";
import { StarRating } from "../components/StarRating";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IState } from "../redux/reducers/reducerTypes";
import { Map } from "../components/Map";
import Footer from "../components/Footer";
import About from "../components/About/About";
import Widget from "../components/Widgets/Widgets";
import Video from "../components/Video/Video.js";

interface paramTypes {
	ISOCode: string;
}


const Countries = () => {
	const { ISOCode } = useParams<paramTypes>();
	const lang = useSelector((state: IState) => state.lang);
	const country = useSelector((state: IState) => state.countries).filter(
		(countryObj) => countryObj.ISOCode === ISOCode
	)[0];
	const { t, i18n } = useTranslation();
	function ScrollToTop() {
		useEffect(() => {
			window.scrollTo(0, 0);
		}, []);
		return null;
	}

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang, i18n]);

	// функция рендера картинок галереи
	const myRenderItem = (props: any) => {
		return (
			<div className="image-gallery-container">
				<img className="image-gallery-image" src={props.original} alt={'img'} />
				<StarRating id={props.id} />
				<span className="image-gallery-description">{props.description}</span>
				<p className="image-gallery-title">{props.originalTitle}</p>
			</div>
		);
	};

	const images = country.attractions.map((attr) => {
		return {
			original: attr.imageURL + "?fit=crop&w=1000",
			thumbnail: attr.imageURL + "?fit=crop&w=100",
			description: attr.desc,
			originalTitle: attr.name,
			renderItem: myRenderItem,
			id: attr._id
		};
	});

	return (
		<div className={"countries"}>
			<div className={"content-wrapper"}>
				<div className={"content"}>
					<ScrollToTop />
					<Header inputVisible={false} />
					<Widget lang={lang} country={country} />
					<About imageURL={country.imageURL} country={country.country} capital={country.capital} desc={country.desc} />

					<div className="gallery-block">
						<h2 className={"subtitle"}>{t("title-sights")}</h2>
						<div className="slider">
							<ImageGallery items={images} />
						</div>
					</div>

					<Video videoURL={country.videoURL} country={country.country} />

					<div className="map">
						<div>
							<h2 className="subtitle">{t("title-map")}</h2>
							<Map coordinates={country.coordinates} code={country.ISOCode} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Countries;

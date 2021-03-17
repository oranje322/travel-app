import React, { useEffect } from "react";
import CountryCard from "./CountryCard";
import { useSelector } from "react-redux";
import { IState } from "../redux/reducers/reducerTypes";
import Clouds from "./Clouds/Clouds.js";
import { useTranslation } from 'react-i18next';

const Body = () => {

	const countriesMass = useSelector((state: IState) => state.countries)
	const searchValue = useSelector((state: IState) => state.searchValue)
	const filteredCountries = useSelector((state: IState) => state.filteredCountries)
	const lang = useSelector((state: IState) => state.lang);
	const { t, i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [i18n, lang]);

	return (
		<div className="container body">
			<Clouds />
			<main className={"body"}>
				<div className="body-title">
					<h1 className="title">{t("title")}</h1>
					<h2 className="subtitle">{t("subtitle")}</h2>
				</div>
				<div className="countries-block">
					<h3 className="countries-title">
						{t("title-where")}
					</h3>
					<div className="countries-grid">
						{
							searchValue.length > 0 ? filteredCountries.map((country, index) => <CountryCard key={index}
								data={country} />)
								: countriesMass.map((country, index) => <CountryCard key={index}
									data={country} />)
						}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Body;
import React from "react";
import CountryCard from "./CountryCard";
import { useSelector } from "react-redux";
import { IState } from "../redux/reducers/reducerTypes";

const Body = () => {

	const countriesMass = useSelector((state: IState) => state.countries)
	const searchValue = useSelector((state: IState) => state.searchValue)
	const filteredCountries = useSelector((state: IState) => state.filteredCountries)

	return (
		<div className="container body">
			<main className={"body"}>
				<div className="body-title">
					<h1 className="title">Как прекрасен этот мир, посмотри</h1>
					<h2 className="subtitle">Узнавай. Путешествуй. Делись.</h2>
				</div>
				<div className="countries-block">
					<h3 className="countries-title">
						КУДА ПОЕДЕМ?
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
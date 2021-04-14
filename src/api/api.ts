import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

// if you want start on localhost change baseurl to http://localhost:5000/
const instance = axios.create({
	// baseURL: 'http://localhost:5000/'
	baseURL: "/"
});

const apiKeyWeather = "c69952b53bdb81d1c0e2f8bc3eb5666d"

const apiKeyCurrency = '99dd498e05e547d6b01b5e9778f49140'

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'
const currencyApiUrl = 'https://openexchangerates.org/api/latest.json'

export const Api = {

	getCountries(lang: string): Promise<any> {
		if (lang === 'en') {
			return instance.get(`/countries?lang=${lang}`)
		} else if (lang === 'de') {
			return instance.get(`/countries?lang=${lang}`)
		} else {
			return instance.get("/countries")
		}
	},

	getTemperature(coordinates: number[], lang: string): Promise<any> {
		return axios.get(
			`${weatherApiUrl}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKeyWeather}&units=metric&lang=${lang}`
		)
	},

	login(body: string): Promise<any> {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		return instance.post("/login", body, config);
	},

	signup(body: string): Promise<any> {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		return instance.post("/join", body, config);
	},

	async getСurrency(currency: string) {
		try {
			const countryCurrency = currency
			const res = await axios.get<ICurrencyResp>(`${currencyApiUrl}?app_id=${apiKeyCurrency}`)
			let countryCurrencyInUSD = 0;
			for (let item in res.data.rates) {
				if (item === countryCurrency) {
					countryCurrencyInUSD = 1 / res.data.rates[item];
				}
			}
			const exchange: ExchangeType = {
				countryCurrency: countryCurrencyInUSD,
				currencyInUSD: countryCurrencyInUSD * res.data.rates.USD,
				currencyInEUR: countryCurrencyInUSD * res.data.rates.EUR,
				currencyInRUB: countryCurrencyInUSD * res.data.rates.RUB,
			};
			return exchange
		} catch (e) {
			console.error(e)
		}

	},

	getRating(id: string) {
		return instance.post<IRatingResponse[]>('/rating', {id})
	},

	setRating(attrId: string, userName: string, rating: number): Promise<any> {
		return instance.put('/rating', {attrId, userName, rating})
	}
};

interface ICurrencyResp {
	rates: {
		[key: string]: number
	}
}

export interface IRatingResponse {
	_id: string,
	attraction: string,
	email: string,
	userName: string,
	__v: number,
	rating: number
}

type ExchangeType = {
	countryCurrency: number;
	currencyInUSD: number;
	currencyInEUR: number;
	currencyInRUB: number;
};

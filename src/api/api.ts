import axios from "axios";


const instance = axios.create({
	baseURL: "http://localhost:5000"
});

const apiKeyWeather = 'c69952b53bdb81d1c0e2f8bc3eb5666d'

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'
const currencyApiUrl = 'https://api.exchangeratesapi.io/latest'

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

	getСurrency(currency: string) {
		return Promise.allSettled([
			axios.get<ICurrencyResp>(`${currencyApiUrl}?symbols=${currency}&base=USD`),
			axios.get<ICurrencyResp>(`${currencyApiUrl}?symbols=${currency}&base=EUR`),
			axios.get<ICurrencyResp>(`${currencyApiUrl}?symbols=${currency}&base=RUB`),
		])
	},

	getRating(id: string) {
		return instance.post<IRatingResponse[]>('/rating', { id })
	},

	setRating(attrId: string, userName: string, rating: number): Promise<any> {
		return instance.put('/rating', { attrId, userName, rating })
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

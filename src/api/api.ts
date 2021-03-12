import axios from "axios";


const instance = axios.create({
	baseURL: "http://localhost:5000"
});

const apiKeyWeather = 'c69952b53bdb81d1c0e2f8bc3eb5666d'

const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather'
const currencyApiUrl = 'https://api.exchangeratesapi.io/latest'

export const Api = {

	getCountries(): Promise<any> {
		return instance.get("/countries");
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
	}
};

interface ICurrencyResp {
	rates: {
		[key: string]: number
	}
}

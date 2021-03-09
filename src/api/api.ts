import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000"
});

const apiKeyWeather = 'c69952b53bdb81d1c0e2f8bc3eb5666d'

export const Api = {

  getCountries(): Promise<any> {
    return instance.get("/countries");
  },

  getTemperature(coordinates:number[], lang:string ): Promise<any> {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKeyWeather}&units=metric&lang=${lang}`
    )
  }
};
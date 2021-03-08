import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000"
});

export const Api = {

  getCountries(): Promise<any> {
    return instance.get("/countries");
  }
};
import axios from "axios";

const instance = axios.create({
  baseURL: "localhost"
});

export const Api = {

  getCountries(): Promise<any> {
    return instance.get("/");
  }

};
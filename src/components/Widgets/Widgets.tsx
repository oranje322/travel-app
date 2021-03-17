import React, { useState, useEffect } from "react";
import Clock from "./Clock";
import getSymbolFromCurrency from "currency-symbol-map";
import { Api } from "../../api/api";
import classes from "./Widget.module.scss";

interface Props {
  lang: string;
  country: any;
}

function Widgets(props: Props) {
  const { lang, country } = props;

  const [temperature, setTemperature] = useState<number | string>("");
  const [temperatureIcon, setTemperatureIcon] = useState<string>("13n");
  const [temperatureDesc, setTemperatureDesc] = useState<string>("");
  const [currency, setCurrency] = useState<{ [index: string]: any }>({ USD: 0, EUR: 0, RUB: 0 });

  useEffect( () => {
    Api.getTemperature(country.coordinates, lang).then((r) => {
      setTemperatureDesc(r.data.weather[0].description);
      setTemperature(Math.round(r.data.main.temp));
      setTemperatureIcon(r.data.weather[0].icon);
    });
  }, [country.coordinates, lang]);

  useEffect(() => {
    Api.getСurrency(country.currency).then((r) => {
      let [usd, eur, rub] = r.map((obj) => {
        if (obj.status === "fulfilled") {
          return obj.value.data.rates[country.currency].toFixed(2);
        } else return 0;
      });
      setCurrency({
        USD: +usd,
        EUR: +eur,
        RUB: +rub,
      });
    });
  }, [country.currency]);

  return (
    <div className={classes.widgets}>
      <div className={[classes.currency, classes.widget].join(" ")}>
        <span>
          {Object.keys(currency).map((key, index) => {
            if (key !== country.currency) {
              return (
                <span key={index}>
                  1 {getSymbolFromCurrency(key)} = {currency[key]} {getSymbolFromCurrency(country.currency)}
                  <br />
                </span>
              );
            } else return ''
          })}
        </span>
      </div>

      <div className={[classes.weather, classes.widget].join(" ")}>
        <img className={classes.weatherIcon} src={`http://openweathermap.org/img/wn/${temperatureIcon}.png`} alt="weather"/>
        <span>
          {temperature} °С,
          <br /> <span className={classes.weatherDesc}>{temperatureDesc}</span>
        </span>
      </div>

      <div className={[classes.time, classes.widget].join(" ")}>
        <Clock lang={lang} timeZone={country.timezone} />
      </div>
    </div>
  );
}

export default Widgets;

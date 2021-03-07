import React from "react";
import africaImg from "../assets/img/africa.png";

const CountryCard = () => {
  return (
    <div className="country-card">
      <img className={"card-img"} src={africaImg} alt="card"/>
      <span className="card-text">КЕНИЯ</span>
    </div>
  );
};

export default CountryCard;
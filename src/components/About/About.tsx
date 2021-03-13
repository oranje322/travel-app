import React from "react";
import classes from "./About.module.scss";

interface Props {
  imageURL: string;
  country: string;
  capital: string;
  desc: string;
}

function About(props: Props) {
  return (
    <div className={classes.about}>
      <div className={classes.descContainer}>
        <h2 className="title">{`${props.country}, ${props.capital}`}</h2>
        <p className={classes.desc}>{props.desc}</p>
      </div>
      <div className={classes.imgContainer}>
        <img className={classes.img} src={props.imageURL + "?fit=crop&h=500"} alt={props.capital} />
      </div>
    </div>
  );
}

export default About;

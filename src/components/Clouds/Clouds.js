import React from "react";
import classes from "./Clouds.module.scss";
import clouds from "../../assets/img/clouds.png";

function Clouds() {

  return (
    <div>
			<img className={[classes.clouds, classes.cloud1].join(" ")} src={clouds} />
			<img className={[classes.clouds, classes.cloud2].join(" ")} src={clouds} />
			<img className={[classes.clouds, classes.cloud3].join(" ")} src={clouds} />
		</div>
  );
}

export default Clouds;

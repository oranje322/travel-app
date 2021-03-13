import React, { useRef, useEffect } from 'react';
import classes from './Airplane.module.scss';
import plane from '../../assets/img/plane.png';

function Airplane() {
	const planeRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
    window.requestAnimationFrame(runPlaneAnimation);
  }, []);

  const directionsHorizontal = ['left', 'right'];
  const directionsVertical = ['top', 'bottom'];


  const runPlaneAnimation = () => {
    const plane = planeRef.current;
    if (!plane) return;
    // console.log(window.innerWidth);
    console.log(plane);
    // console.log('plane top& left', plane.offsetTop, plane.offsetLeft);

    //init position
    // plane.style.left = plane.getBoundingClientRect().left

    plane.style.left = plane.getBoundingClientRect().left + 10 + "px";
    plane.style.top = plane.getBoundingClientRect().top - 3 + "px";

    // если самолет не в экране
    // if (!(plane.offsetLeft < window.innerWidth+plane. && plane.offsetLeft > 0 && plane.offsetTop > 0 &&  plane.offsetTop < window.innerHeight)) {
    //   plane.style.left = 10 + "px";
    //   plane.style.top = 500 + "px";
    // }
    // window.requestAnimationFrame(runPlaneAnimation);
  }
	return <img ref={planeRef} className={classes.airplane} src={plane} alt="plane" />
}

export default Airplane;

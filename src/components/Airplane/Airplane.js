import React, { useRef, useEffect, useState } from "react";
import classes from "./Airplane.module.scss";
import planeImg from "../../assets/img/plane.png";
import { getRandomNumber } from "../../utils/functions";

function Airplane() {
  const planesRef = useRef(null);
  let reqId;
  const [planes, setPlanes] = useState();
  const windowWidth = window.innerWidth;

  useEffect(() => {
    setPlanes(planesRef.current.children);
  }, []);

  useEffect(() => {
    if (!planes) return;
    for (let i = 0; i < planes.length; i++) {
      initPlaneStyleParams(planes[i], planes[i].id);
    }
    animate();
    return () => {
      window.cancelAnimationFrame(reqId);
    }
  }, [planes]);

  const animate = () => {
    reqId = window.requestAnimationFrame(animate);
    if (!planes) return;
    for (let i = 0; i < planes.length; i++) {
      animatePlane(planes[i]);
    }
  };

  const animatePlane = (plane) => {
    const planeParams = plane.getBoundingClientRect();
    const speed = {
      x: planeParams.width / 25,
      y: -1 * planeParams.width / 80,
    };

    
    if (
      planeParams.x > -2 * planeParams.width &&
      planeParams.x <= windowWidth &&
      planeParams.y > -2 * planeParams.height
      ) {
      plane.style[plane.id] = (plane.id === "left" ? planeParams.left : windowWidth - planeParams.right) + speed.x + "px";
      plane.style.top = planeParams.top + speed.y + "px";
    } else {
      const planeWidth = getRandomNumber(5, 30);
      plane.style.width = planeWidth + "vw";
      plane.style[plane.id] = -1 * planeWidth + "vw";
      plane.style.top = getRandomNumber(20, 100) + "vh";
    }
  };

  const initPlaneStyleParams = (plane, dir) => {
    const planeWidth = getRandomNumber(5, 30);
    plane.style.width = planeWidth + "vw";
    plane.style[dir] = -1 * planeWidth + "vw";
    plane.style.top = getRandomNumber(20, 100) + "vh";
  };

  return (
    <div ref={planesRef}>
      <img id="left" className={classes.airplaneLeft} src={planeImg} alt="plane" />
      <img id="right" className={classes.airplaneRight} src={planeImg} alt="plane" />
    </div>
  );
}

export default Airplane;

import React, { useRef, useEffect } from "react";
import classes from "./Video.module.scss";

const Video = (props) => {
  const videoRef = useRef();

  const updateSize = () => {
    if (videoRef.current) {
      videoRef.current.height = videoRef.current.offsetWidth * 9 / 16;
    }
  };

  useEffect(() => {
    updateSize();
  }, [])

  window.addEventListener("resize", updateSize);

  return (
    <div className={classes.Video}>
      <iframe
        ref={videoRef} 
        title={props.country}
        width="1366"
        height="768"
        src={`https://www.youtube.com/embed/${props.videoURL}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Video;

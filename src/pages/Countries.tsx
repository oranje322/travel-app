import React from "react";
import "../countries.scss";
import Header from "../components/Header";
import countryImg from "../assets/img/moscow.jpg";
import ImageGallery from 'react-image-gallery';

const Countries = () => {

  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

  return (
    <div className={"countries"}>
      {/* <Header inputVisible={false} /> */}
      <Header />
      <div className="widgets-block">
        блок с виджетами
      </div>
      <div className={"img-block"}>
        <img className={"country-img"} src={countryImg} alt="country-img" />
      </div>
      <div className="video-block">
        <iframe width="1000" height="420" src="https://www.youtube.com/embed/YrNxPr4PKQo" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
      <div className="desc-block">
        <p className="desc-text">
          Крупнейшая страна мира, расположенная в Восточной Европе и Северной Азии и омываемая водами Тихого и Северного Ледовитого океанов. Ландшафт России крайне разнообразен: на ее территории есть и тундра, и леса, и субтропические пляжи. В Большом театре в Москве и Мариинском театре в Санкт-Петербурге выступают балетные труппы, снискавшие всемирную славу. Санкт-Петербург, основанный императором Петром I, известен своим Зимним дворцом в стиле барокко, в котором размещается часть обширной художественной коллекции музея \"Эрмитаж\"."
        </p>
      </div>
      <div className="gallery-block">
        <h2 className={'subtitle'}>Что посмотреть?</h2>
        <div className="slider">
          <ImageGallery items={images} />
        </div>
      </div>
      <div className="map">
        <h2 className="subtitle">Где это?</h2>
      </div>
    </div>
  );
};

export default Countries;
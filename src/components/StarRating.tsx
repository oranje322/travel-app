import React, { useEffect, useState } from "react";
import { Api } from "../api/api";
import { calculateRating, nameRateArray } from "../utils/calculateRating";
import Rate from "rc-rate/es";
import 'rc-rate/assets/index.css';
import { useSelector } from "react-redux";
import { IState } from "../redux/reducers/reducerTypes";
import { useTranslation } from 'react-i18next';

interface Rating {
  id: string
}
interface nameRate {
  name: string,
  rate: number
}

export const StarRating = ({ id }: Rating) => {
  const [starsValue, setStarsValue] = useState(0);
  const [array, setArray] = useState<nameRate[]>([]);
  const { t } = useTranslation();
  const userName = useSelector((state: IState) => state.userData.name)

  useEffect(() => {
    Api.getRating(id).then(r => {
      setStarsValue(calculateRating(r.data));
    })
  }, [])

  useEffect(() => {
    Api.getRating(id).then(r => {
      setArray(nameRateArray(r.data))
    })
  }, [])

  const onClickChangeRate = (rating: number) => {
    Api.setRating(id, userName, rating).then(r => setStarsValue(calculateRating(r.data)))
  }
  const [style, setStyle] = useState({ display: 'none' });
  const toggle = (act: string) => {
    act === 'over' ? setStyle({ display: 'flex' }) : setStyle({ display: 'none' })
  }

  return (
    <>
      <div className={'star-rating'}>
        <Rate count={5}
          key={1}
          value={starsValue}
          allowHalf={true}
          onChange={(rating) => onClickChangeRate(rating)}
          style={{ fontSize: '30px', outline: "none", border: "none" }}
        />
      </div>
      <button className="show-star" onMouseOver={() => toggle('over')}
        onMouseOut={() => toggle('out')}>{t("allStars")}</button>
      <div className="show-star_other" style={style}>
        {
          array.map((item, index) => {
            return <div key={index} className="show-star_other_item">
              <p>{item.name}</p>
              <Rate count={5}
                value={item.rate}
                style={{ fontSize: '20px', outline: "none", border: "none" }}
                disabled={true}
              />
            </div>
          })
        }
      </div>
    </>
  )
}; 
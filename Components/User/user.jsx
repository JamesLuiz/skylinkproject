import React, {useContext, useState} from 'react';
import Image from 'next/image';
import style from '../User/user.module.css';
import skyImage from '../../assets/funtoken.png';
import { ERC20ICOContext } from '@/Contents/Skylink';
const User = () => {
  const {holderArray} = useContext(ERC20ICOContext)

  return (
    <div className={style.user}>
      
      {holderArray .map((el, i)=> (
        <div key={i + 1} className={style.user_box}>
          <h4 className={style.user_box_name}>
            User #{el[0].toNumber()}
          </h4>
          <div className={style.user_box_price_box}>
            <p className={style.user_box_price}>
              {el[3].toNumber()} SKL 
            </p>
            <p className={style.user_box_status}>
                ${el[3].toNumber() * 50} / {el[3].toNumber()} token Price
            </p>
          </div>
          <div className={style.user_box_img}>
            <Image className={style.user_box_img_img} src={skyImage} alt="SkyLink Image" width={35} height={35}/>
            <p> To:{""} {el[1].slice(0,22)}...   </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default User;
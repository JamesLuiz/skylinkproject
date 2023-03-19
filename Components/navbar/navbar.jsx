import React, {useState, useContext} from 'react'
import style from "./navbar.module.css";
import { ERC20ICOContext } from '@/Contents/Skylink';
import Image from 'next/image';
import loader from "../../assets/loder.gif";
import skyImage from "../../assets/funtoken.png";

const Navbar = () => {
    const {account,  accountBalance, userId} = useContext(ERC20ICOContext)
  return (
    <div className={style.navBar}>
        <div className={style.navBar_box}>
            <div className={style.navBar_box_left}>
                <h1>Skylink</h1>
            </div>
            <div className={style.navBar_box_right}>
                <p>
                    Token balance {""} {""} <span>{accountBalance}</span>
                </p>
                <p>
                    <span>
                        #{userId} {""} {""} {account}
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Navbar
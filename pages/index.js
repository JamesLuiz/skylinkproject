import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import style from "../styles/index.module.css";
import banner from "../assets/bg-3.png";
import skyImage from "../assets/funtoken.png"
import User from "../Components/User/user";
import Transfer from "@/Components/Transfer/transfer";
// internal import
import { ERC20ICOContext } from "../Contents/Skylink";
import Sale from "@/Components/Sale/sale";
function Home() {
  const {
    checkConnection,
    buyToken,
    TokenSale,
    ERC20Skylink,
    holderArray,
    transferToken,
    tokenHolder,
    TokenQuantity,
    TokenName,
    tokenStandard,
    tokenSymbol,
    tokenSold,
    tokenPrice,
    tokenOwner,
    tokenOwnerBal,
    account,
    accountBalance,
    userId,
    tokenContract
  } = useContext(ERC20ICOContext);
  useEffect(() => {
    checkConnection();
    tokenHolder();
    ERC20Skylink();
  }, []);

  return (
    <div className={style.home}>
      <div className={style.heroSection}>
        <div className={style.heroSection_left}>
          <h1>Launch Skylink</h1>
          <div className={style.heroSection_left_btn}>
            <button className={style.btn}>white paper</button>
            <button className={style.btn}>Skylink tokens</button>
          </div>
        </div>
        <div className={style.heroSection_right}>
          <Image src={skyImage} alt="banner" width={300} height={300} className={style.heroSection_right_img_one}/>
          <Image src={skyImage} alt="banner" width={200} height={200} className={style.heroSection_right_img} />
          <Image src={skyImage} alt="banner" width={100} height={100} className={style.heroSection_right_img}/>
          <Image src={skyImage} alt="banner" width={50} height={50} className={style.heroSection_right_img}/>
          <Image src={skyImage} alt="banner" width={20} height={20} className={style.heroSection_right_img}/>
        </div>
      </div>
      <Transfer 
        TokenQuantity={TokenQuantity} 
        TokenName=    {TokenName} 
        TokenStandard={tokenStandard}
        TokenSymbol  ={tokenSymbol}
        TokenOwnerBal={tokenOwnerBal}
        TransferToken={transferToken}
      />
      <User holderArray={holderArray}/>
      <Sale 
        buytoken = {buyToken}
        sales = {TokenSale}
        tokenContract ={tokenContract}
      />

    </div>
  );
}

export default Home;

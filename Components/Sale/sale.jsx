import React, {useContext, useState, useEffect } from 'react'
import style from "./sale.module.css"
import { ERC20ICOContext } from '@/Contents/Skylink'

const Sale = () => {
  useEffect(() => {
    checkConnection();
    TokenSale()
  });
  
  const [tokenNumber, setTokenNumber] = useState(0);
  
  const {tokenContract, tokenPrice, tokenSold, TokenSale, checkConnection, buyToken} = useContext(ERC20ICOContext)
  return (
    <div className={style.sale_box}>
      <div className={style.sale_box_left}>
        <input type="number" placeholder="Token Amount" min={1} onChange={(e)=> setTokenNumber(e.target.value)} />
        <div className={style.buy_btn}>
          <button onClick={()=> buyToken(tokenNumber)}>Buy SkyLink</button>
        </div>
      </div>
      <div className={style.sale_box_right}>
        
        
      </div>
    </div>
  )
}

export default Sale
import React, {useState, useContext} from 'react';
import Image from 'next/image'
import style from "../Transfer/transfer.module.css";
import skyImage from "../../assets/funtoken.png";
import { ERC20ICOContext } from "../../Contents/Skylink";
const Transfer = () => {
    const {TokenQuantity, TokenName, tokenOwnerBal, transferToken,} = useContext(ERC20ICOContext);
    const [transferAccount, setTransferAccount] = useState("");
    const [tokenNumber, setTokenNumber] = useState(0);
  return (
    <div className={style.transfer}>
        <div className={style.transfer_box}>
            
            <div className={style.transfer_box_left}>
                <h2>Market cap</h2>
            </div>
            <div className={style.transfer_box_left_box}>
                <p>
                    Token name
                    <span>{TokenName}</span>
                </p>
                <p>
                    Token Supply
                    <span>{TokenQuantity}</span>
                </p>

                <p>
                    Token Symbol {""}
                    <span className={style.skylink}>
                        <Image src={skyImage} alt="token image" width={70} height={70} objectFit="cover" className={style.skylink_img}/>
                    </span>
                </p>
                <p>
                    Tokens Left
                    <span>{tokenOwnerBal}</span>
                </p>
            </div>
            <div>
                <h3>this is where the responsive graph will be</h3>
            </div>
            <div className={style.transfer_box_right}>
                <h2>Transfer Token</h2>
                {/* take the input value and set as token number to be transferred */}
                <input type="text" placeholder="Address" onChange={(e)=> setTransferAccount(e.target.value)} />
                <input type="number" placeholder="Token Amount" min={1} onChange={(e)=> setTokenNumber(e.target.value)} />
                
                <div className={style.transfer_box_right_btn}>
                    <button onClick={()=> transferToken(transferAccount, tokenNumber)}>Send SKylink</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Transfer;
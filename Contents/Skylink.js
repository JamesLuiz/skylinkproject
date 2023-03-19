// 0x5FbDB2315678afecb367f032d93F642f64180aa3
//0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
import React, {useState, useEffect, useContext} from 'react'
import Web3Modal from "web3modal";
import {ethers} from "ethers";
import { saleTokenAddress } from './constants';
import { saleTokenABI } from './constants';

//internal import
// fetching smart contract
const fetchContract = (signerOrProvider) => new ethers.Contract(skylinkAddress, skylinkABI, signerOrProvider)

const accountAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
import { skylinkAddress, skylinkABI } from './constants';
export const ERC20ICOContext = React.createContext();

export const ERC20Provider = ({children}) => {
  // user account

  const [holderArray,   setholderArray] = useState([]);
  const [account,       setAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [userId,           setuserId] = useState("");

  //----token info
  const [TokenQuantity,  setTokenQuantity] = useState("");
  const [TokenName,      setTokenName] = useState("");
  const [tokenStandard,  setTokenStandard] = useState("");
  const [tokenSymbol,    setTokenSymbol] = useState("");
  const [tokenOwner,     setTokenOwner] = useState("");
  const [tokenOwnerBal,  setTokenOwnerBal] = useState("");
  const [allTokenHolder, setAllTokenHolder] = useState("")
  // infos from token sale smart contract
  const [tokenPrice, setTokenPrice] = useState("");
  const [tokenSold, setTokenSold] = useState("")
  const [tokenContract, setTokenContract] = useState("")

  
  // connecting and communicating with wallet
  const checkConnection = async()=> {
    try {
        if (!window.ethereum) return console.log("please install MetaMask");
            const accounts = await window.ethereum.request({method: "eth_accounts"});
            setAccount(accounts[0]);
        
        //....fetching data from smart contract user, using web3Modal 
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner(accountAddress);
        const contract = fetchContract(signer);

        // get all token holder 
        const allTokenHolder = await contract.balanceOf(accounts[0]);
        setAccountBalance(allTokenHolder.toNumber());

        const totalHolders = await contract._userId();
        setuserId(totalHolders.toNumber());
    } catch (error) {
        console.log("communication error")
    }
  }

  // fetch Erc20 contract details function
  const ERC20Skylink = async()=> {
    try {
        // connection to smart contract
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner(accountAddress);
        const contract = fetchContract(signer);

        //token supply 
        const supply = await contract.totalSupply();
        const totalSupply = supply.toNumber();
        setTokenQuantity(totalSupply)

        //fetch token name
        const name = await contract.name();
        setTokenName(name);

        // fetch token symbol
        const tokenSymbol = await contract.symbol()
        setTokenSymbol(tokenSymbol);

        //fetch token version
        const standard = await contract.standard();
        setTokenStandard(standard);

        // fetch contract owner
        const contractOwner = await contract.contractOwner();
        setTokenOwner(contractOwner);

        // contract owner balance
        const balance = await contract.balanceOf(accountAddress)
        setTokenOwnerBal(balance.toNumber());
    } catch (error) {
        console.log("error in communicating with token contract")
    }
  }

  // fetch transfer function from contract
  const transferToken = async(address, value) =>{
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner(accountAddress);
        const contract = fetchContract(signer);

        const transfer = await contract.transfer(address, value)
        transfer.wait();
        

    } catch (error) {
        console.log(error)
    }
  }

  // get token holder info
  const tokenHolder = async()=> {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner(accountAddress);
        const contract = fetchContract(signer);

        const allTokenHolder = await contract.getTokenHolder();
        setAllTokenHolder(allTokenHolder)

        allTokenHolder.map(async (el) => {
            const singleHolderData = await contract.getTokenHolderData(el);
            holderArray.push(singleHolderData);
            console.log(singleHolderData)

        });
    } catch (error) {
        console.log("could not fetch data")
    }
  }

  // interact with token sale contract
  // fetch token sale smart contract
 const fetchContractsale = (signerOrProvider) => new ethers.Contract(saleTokenAddress, saleTokenABI, signerOrProvider)


  const TokenSale = async()=> {
    try {
      // connect contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(accountAddress);
      const contract = fetchContractsale(signer);
      
      const Price = await contract.tokenPrice();
      setTokenPrice (Price);

      const tokenSold = await contract.tokenSold();
      setTokenSold(tokenSold);

      const contractSale = await contract.tokenContract()
      setTokenContract(contractSale)
    }
    catch (error) {
      console.log("cannot perform transaction");
    }
  }
  
  const buyToken = async(value)=>{
    try {
      // connect contract
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner(accountAddress);
      const contract = fetchContractsale(signer);

      const Purchase = await contract.buyToken(BigInt(value * 1));
      Purchase.wait();
      window.location.wait();

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ERC20ICOContext.Provider value={{
        checkConnection,
        TokenSale,
        buyToken, 
        ERC20Skylink,
        transferToken, 
        tokenHolder,
        TokenQuantity,
        tokenPrice,
        tokenSold,
        TokenName,    
        tokenStandard,
        tokenSymbol,  
        tokenOwner,
        holderArray,   
        tokenOwnerBal,
        account,       
        accountBalance,
        userId,
        tokenContract        
    }}>
      {children}
    </ERC20ICOContext.Provider>
  )

}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Skylink.sol";

contract TokenSale{
    address admin;
    Skylink public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;


    event Sell(address _buyer, uint256 _amount);

    constructor (Skylink _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
    
    // some calculations
    function multiply(uint256 x, uint256 y) internal pure returns(uint256 z){
        require(y==0 || (z = x * y) / y==x);
    }

    // buy token function, (connect this function)

    function buyToken (uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));

        // checck if the address = getter or number of tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);
        // transfer of tokens
        require(tokenContract.transfer(msg.sender, _numberOfTokens));

        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    // terminate contract(connect this too)

    function terminate() public {
        require(msg.sender == admin);
        //transfer remaining balance to admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
        //destroy contract
        payable(admin).transfer(address(this).balance);
        
    }
} 
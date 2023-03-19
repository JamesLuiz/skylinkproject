// SPDX-License-Identifier: MIT

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
pragma solidity ^0.8.17;


contract Skylink {
    string public name = "Skylink"; 
    string public symbol = "SKL";
    string public standard = "SKL v.1.0";
    uint256 public totalSupply;
    uint256 public _userId;

    address public contractOwner;
    address[] public tokenHolder;

    event Transfer(
        address indexed _from,
        address indexed _to, 
        uint256 _value
    );
// trnasfering token instead of the main contract owner
    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping (address => TokenHolderInfo) public TokenHolderInfos;

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken;
        bool _tokenHolder;
    }

    mapping (address => uint256) public balanceOf;

    constructor (uint256 _initialSupply) {
        contractOwner = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function inc() internal {
        _userId++;
    }
    // transfer token to address (the address, and the token)
    function transfer(address _to, uint256 _value) public returns (bool successful) {
        require(balanceOf[msg.sender] >= _value);
        inc();
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //call the struct and update all the data in it
        TokenHolderInfo storage tokenHolderInfo = TokenHolderInfos[_to];
        tokenHolderInfo._to = _to;
        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._totalToken = _value;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._tokenId = _userId;
        // push the address
        tokenHolder.push(_to);

        // call the event Transfer
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    //nested mapping that keeps track of the approve function
    mapping (address => mapping (address => uint256)) public allowance;

    // this function approves someone else to spend tokens on behalf of the original contract owner
    
    function approve(address _spender, uint256 _value) public returns (bool successul) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Tranfer function for adresses that are approved by the by the approve function

    function transferFrom (address _from, address _to, uint256 _value) public returns (bool successful) {
        // subtract from balance
        balanceOf[_from] -= _value;
        //add to new address balance
        balanceOf[_to] += _value;

        // keep track of the balance
        allowance[_from] [msg.sender] -= _value;

        // emit the transfer event
        emit Transfer(_from, _to, _value);
        return true;
    }

    // keeps token data from smart contract to display on fron end

    function getTokenHolderData(address _address) public view returns (uint256, address, address, uint256, bool) {
        return(
            TokenHolderInfos[_address]._tokenId, 
            TokenHolderInfos[_address]._to,
            TokenHolderInfos[_address]._from,
            TokenHolderInfos[_address]._totalToken,
            TokenHolderInfos[_address]._tokenHolder
        );
    }

    //
     function getTokenHolder() public view returns(address[] memory) {
        return tokenHolder;
     } 
}
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Champions {
    string private bestPlayer;

    constructor() {
        bestPlayer = "";
    }

    function setPlayer(string memory newPlayer) public {
        bestPlayer = newPlayer;
    }

    function getPlayer() public view returns (string memory) {
        return bestPlayer;
    }   
}

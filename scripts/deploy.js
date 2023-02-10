
const hre = require("hardhat");

async function main() {
 

  const Skylink = await hre.ethers.getContractFactory("Skylink");
  const skylink = await Skylink.deploy();

  await skylink.deployed();

  console.log(
    `Skylink with 1 ETH and unlock timestamp deployed to ${skylink.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

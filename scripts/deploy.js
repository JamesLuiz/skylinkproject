const hre = require("hardhat");

async function main() {
  const Skylink = await hre.ethers.getContractFactory("Skylink");
  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const skylink = await Skylink.deploy(40000000000);

  const tokenPrice = 1000000000000000;

  const sale = await TokenSale.deploy(skylink.address, tokenPrice);

  await skylink.deployed();
  await sale.deployed();

  console.log(
    `Skylink with 1 ETH and unlock timestamp deployed to ${skylink.address}`
  );
  console.log(
    `Sale with 1 ETH and unlock timestamp deployed to ${sale.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

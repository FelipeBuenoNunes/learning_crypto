async function main () {
  const Champions = await ethers.getContractFactory('Champions');
  
  const champions = await Champions.deploy();
  await champions.deployed();
  console.log('deployed to:', champions.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
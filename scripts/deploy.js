async function main () {
  const Felos = await ethers.getContractFactory('Felos');
  
  const felos = await Felos.deploy();
  await felos.deployed();
  console.log('deployed to:', felos.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
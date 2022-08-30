const {
    Contract,
    Wallet,
    ethers,
    Signer
} = require('ethers')
const express = require('express')
const fs = require('fs')

const app = express();
app.use(express.json());

// Connect to blockchain data
const provider = new ethers.providers.JsonRpcProvider();
var wallet, signer, contract;

//function to connect to the contract, using the new wallet
async function connectToContract() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    signer = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider).connect(provider);
    contract = new ethers.Contract(contractAddress, abi, signer);
}

const abi = JSON.parse(fs.readFileSync('/home/felipeollx/Documents/crypto/artifacts/contracts/Lock.sol/Felos.json').toString()).abi;

app.post("/new-wallet", async (req, res) => {
    wallet = Wallet.createRandom();
    connectToContract();
    res.send(`Your public key ${await wallet.getAddress()}`);
});

app.post("/mint", async (req, res) => {
    res.send(await contract.mint(await wallet.getAddress(), 1));
});

app.get("/get-balance", async (req, res) => {
    const balance = await contract.balanceOf(await wallet.getAddress())
    res.send(balance.toString());
})

app.listen(8080);
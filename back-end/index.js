const {
    Contract,
    Wallet,
    getDefaultProvider,
    ethers,
    Signer
} = require('ethers')
const express = require('express')
const fs = require('fs')

const app = express();
app.use(express.json());
const provider = new ethers.providers.JsonRpcProvider();

const wallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);

const abi = JSON.parse(fs.readFileSync('/home/felipeollx/Documents/crypto/artifacts/contracts/Lock.sol/Felos.json').toString()).abi;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const signer = wallet.connect(provider);
const contract = new ethers.Contract(contractAddress, abi, signer);


async function mint() {
    const opa = await contract.mint("0x5FbDB2315678afecb367f032d93F642f64180aa3", 20000000);
    return opa;
}

async function getTotal() {
    return await contract.totalSupply();
}

async function getBalance() {
    return await contract.balanceOf("0x5fbdb2315678afecb367f032d93f642f64180aa3");
}

app.route("/player")
    .get(async (req, res) => {  
        res.status(200).send(await getTotal());
    })
    .post(async (req, res) => {
        res.status(200).send(await mint());
    });

app.post("/balance", async (req, res) => {
    res.send(await getBalance())
});

app.listen(8080);
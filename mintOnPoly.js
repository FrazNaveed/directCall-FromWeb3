const Web3 = require('web3');
require('dotenv').config();
const abi = require("./abi.json");
const rpcPoly = "https://speedy-nodes-nyc.moralis.io/df800cc67c2b4ffd5f3e4005/polygon/mumbai"
const contractPoly = "0x1156B5c22F4eb2F8EBcE3938E43767C0B2B55A81"

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const web3Poly = new Web3(rpcPoly);

const contract_Poly = new web3Poly.eth.Contract(abi, contractPoly); 

const mintNFT = async () =>{

    const noncePOLY = await web3Poly.eth.getTransactionCount(PUBLIC_KEY, 'latest'); 
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractPoly,
        'nonce': noncePOLY,
        'gas': 500000,
        'maxPriorityFeePerGas': 2999999987,
        'data': contract_Poly.methods.mintNFT(PUBLIC_KEY, 3).encodeABI()
      };
      const signedTx = await web3Poly.eth.accounts.signTransaction(tx, PRIVATE_KEY);
      const transactionReceipt = await web3Poly.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log(transactionReceipt);
}

mintNFT();

import Lisk from "./wallet.js";

const lisk = new Lisk();

//const wallet = await lisk.createWallet();
// const address = await lisk.getBalance(
//     "0xeD49E2882093D9aa6c521793FEeB76A70c23aa3B"
// );
const trnasaction = lisk.sendTransaction(
    "0x97B4113439d35e68Cca418FfF6210Bb640D87f8d",
    "0.0001"
);
console.log(trnasaction);

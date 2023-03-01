import { ethers } from "./ethers-5.6.esm.min.js";
import { contractAddress, abi } from "./constant.js";

const fundButton = document.getElementById("fund_button");
const connectButton = document.getElementById("connect_button");
const balanceButton = document.getElementById("balance_button");
const withdrawButton = document.getElementById("withdraw_button");

fundButton.onclick = fund;
connectButton.onclick = connect;
balanceButton.onclick = getBalance;
withdrawButton.onclick = withdraw;

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log("metamack detected");
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        connectButton.innerHTML = "connected";
        console.log("wallet connected");
    } else {
        console.log("please install metamask");
        connectButton.innerHTML = "Please install metamask";
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress);
        console.log(`contract balance: ${balance}`);
    } else {
        console.log("please install metamask");
    }
}

async function fund(ethAmount) {
    const etherAmount = document.getElementById("ethAmount");

    console.log(`Funding with ${ethAmount}`);
    // provider / connection to the blockchain
    // signer / wallet/ someone with gas
    // contract that we are interaction with (ABI and address)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fundMeContract = new ethers.Contract(contractAddress, abi, signer);
    try {
        const transactionResponse = await fundMeContract.fund({
            value: ethers.utils.parseEther(etherAmount),
        });
        await listenForTransaction(transactionResponse, provider);
        console.log("done");
    } catch (error) {
        console.error(error);
    }
}

function listenForTransaction(transactionResponse, provider) {
    console.log(`transaction: ${transactionResponse.hash}`);
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(`confirmation ${transactionReceipt.confirmations}`);
            resolve();
        });
    });
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const fundMeContract = new ethers.Contract(
            contractAddress,
            abi,
            signer
        );
        const transactionResponse = await fundMeContract.withdraw();
        await listenForTransaction(transactionResponse, provider);
    } else {
        console.log("please install wallter");
    }
}

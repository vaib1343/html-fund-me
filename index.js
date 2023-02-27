async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log("metamack detected");
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        document.getElementById("connect_button").innerHTML = "connected";
        console.log("wallet connected");
    } else {
        console.log("please install metamask");
        document.getElementById("connect_button").innerHTML =
            "Please install metamask";
    }
}

async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}`);
    // provider / connection to the blockchain
    // signer / wallet/ someone with gas
    // contract that we are interaction with (ABI and address)
}

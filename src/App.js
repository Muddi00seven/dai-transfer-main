import React, { useState } from 'react'
import Web3 from 'web3'
import './App.css'
import { simpleStorageAbi, contractAddress } from './abis'





function App() {
  const [address, setAddress] = useState("");
  let [amount, setAmount] = useState('');
  const [accounts, setAccounts] = useState();
  const [loadContract, setLoadContract] = useState()
  const [web3, setWeb3] = useState(null)


  const connectWallet = async () => {
    const web3 = new Web3(Web3.givenProvider);
    await Web3.givenProvider.enable();
    setWeb3(web3);
    console.log(web3)
    const contract = new web3.eth.Contract(simpleStorageAbi, contractAddress);
    console.log("contract", contract)
    console.log("contract", contract.methods)

    setLoadContract(contract);
    console.log("contract", typeof contract)
    const uAccounts = await web3.eth.getAccounts();
    console.log("accounts",typeof  uAccounts)
    setAccounts(uAccounts);
  }


  const Transfer = async () => {
    console.log("amount", amount, "address", address, accounts)
    try {
      if (loadContract !== undefined) {
        amount = amount * 10e17
        amount = amount.toString();
        const result = await loadContract.methods.transfer(address, amount).send({
          from: accounts[0]
        })
        console.log(result)
      }
    }
    catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="App">
      <label>Enter Recipient's Address</label><br></br>
      <input
        type="text"
        placeholder="0x123XXXXXXX"
        required
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />
      <label>Enter amount</label><br></br>
      <input type="text"
        placeholder="1.0000000000"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /><br></br>
      {
        !web3 ?
          <button onClick={connectWallet}>connect Wallet</button>
          :
          <button onClick={Transfer}>Send</button>

      }

    </div>
  );
}

export default App;

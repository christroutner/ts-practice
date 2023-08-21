/*
  Send a transactoin using the Sepolia testnet.
  The account used in this example has already been loaded with testnet coins.
*/

import Web3 from 'web3'

const provider = 'https://rpc.ankr.com/eth_sepolia/4d57e604f2505f964c927dcdd7a94b51fd5496cbd778029c9b5400531bedb3dc'
const privateKeyHex = 'f91b5691c87df3cbed63445fde3a6a9b507291790efbd623c55c4d74920a3631'
const address = '0x81065cb98312849Ff08759CCFDD3A6A89b8c60f5'

async function start() {
  try {
    // Instantiate the web3 library.
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const privateKey = Buffer.from(privateKeyHex, 'hex');
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey.toString('hex'));

    const balance = await web3.eth.getBalance(account.address)
    console.log('balance: ', balance)

    const gasPrice = await web3.eth.getGasPrice()
    console.log('gasPrice: ', gasPrice)

    // const value = web3.utils.toWei('0.0000001', 'ether')
    const value = 1000000000000000n
    console.log('value: ', value)

    const txParams = {
      // nonce: web3.utils.toHex(await web3.eth.getTransactionCount(account.address)),
      from: account.address,
      to: address,
      // value: web3.utils.toHex(value),
      value,
      gas: '21000'
      // gasPrice: web3.utils.toHex(gasPrice),
      // gasLimit: web3.utils.toHex(1000),
    };

    // const receipt = await web3.eth.sendTransaction(txParams);
    const signedTx = await account.signTransaction(txParams)


    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    console.log('receipt: ', receipt)

  } catch(err) {
    console.error('Error: ', err)
  }
}
start()

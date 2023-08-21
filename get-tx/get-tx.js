/*
  Get details on a testnet transaction.
*/

import Web3 from 'web3'

const provider = 'https://rpc.ankr.com/eth_sepolia/4d57e604f2505f964c927dcdd7a94b51fd5496cbd778029c9b5400531bedb3dc'
const txid = '0x1a5d6633e3db51808cce004c475db2f33906b3c66323dcd7740d5f1c72047092'

async function start() {
  try {
    // Instantiate the web3 library.
    const web3Provider = new Web3.providers.HttpProvider(provider);
    const web3 = new Web3(web3Provider);

    const txDetails = await web3.eth.getTransaction(txid)
    console.log('txDetails: ', txDetails)

  } catch(err) {
    console.error('Error: ', err)
  }
}
start()

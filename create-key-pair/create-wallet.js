/*
  Get the latest block from the Ethereum chain
*/
import Web3 from 'web3';
const provider = 'https://rpc.ankr.com/eth/4d57e604f2505f964c927dcdd7a94b51fd5496cbd778029c9b5400531bedb3dc';
async function start() {
    try {
        const web3Provider = new Web3.providers.HttpProvider(provider);
        const web3 = new Web3(web3Provider);
        const account = web3.eth.accounts.create();
        console.log('account: ', account);
    }
    catch (err) {
        console.error('Error: ', err);
    }
}
start();

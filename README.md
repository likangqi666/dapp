### Please download and use 'develop' branch.
### 'master' branch now is a backup of the previous code I implemented before.
I keep this branch here because the ownership belongs to the company where I did my internship. It is a very very small possibility but they probably may ask me something about this code. So I leave it here as well.

## Introduction
This project is a prototype of a healthcare insurance management system. It is
based on an Ethereum smart contract.
My implementation is mainly under config/src folder. This implementation has only
been briefly tested with Chrome. The unit test is pending for further implementation.
The correct way of use this prototype is to create your own Ethereum address and
access these page via Mist browser or other tools for Ethereum. But here for simplify
the procedure I have created an address and hardcoded directly in the code. So
all the transaction will be sent through this address.
The address is "0xa1AF1C42DbF15D0795560AF5Fe0117542c99C8f4". If you are curious
about the status of this testing address, you can find the transaction history here:
https://ropsten.etherscan.io/address/0xa1af1c42dbf15d0795560af5fe0117542c99c8f4

This was an internship project. I planned to make it a conference paper. But I
only have a contract for a limited time. So I don't have enough time to do the
qualification. The draft version of the paper is . It was not sent out because of
the missing qualification and verification. But this document may provide a more
detailed information about the whole idea.

To deploy the react project locally:
* Download this git repo
* Execute `npm start` in the root path of the repo
* The default host address is localhost:3000

Future work:
* Unit test
* A fancy and cool UI

### Please download and use 'develop' branch.
### 'master' branch now is a backup of the previous code I implemented before.

## Introduction
This project is a prototype of a healthcare insurance management system. It is
based on an Ethereum smart contract.
The implementation of the web UI is mainly under 'config/src' folder. This
implementation has only been briefly tested with Chrome. The unit test is pending
for further implementation.

The source code of the smart contract is 'contract.sol'. One example contract is
deployed on Ropsten Testnet. The address is "0xeaf144c42c795d5bcf71993882a5900253de8471".
You can view the status and transactions here:
https://ropsten.etherscan.io/address/0xeaf144c42c795d5bcf71993882a5900253de8471

The expected way to try this prototype is to create your own Ethereum account and
access these page via Mist browser or other Ethereum wallets. But here for simplify
the procedure I have created a testing address on Ropsten and hardcoded this account
directly in the code as the sender. So all the transaction will be sent through this address.
The testing address is "0xa1AF1C42DbF15D0795560AF5Fe0117542c99C8f4". If you are curious
about the status of this testing address, you can find the transaction history here:
https://ropsten.etherscan.io/address/0xa1af1c42dbf15d0795560af5fe0117542c99c8f4


This was an internship project. I planned to make it a conference paper. But I
only have a contract for a limited time. So I don't have enough time to do the
qualification. The draft version of the paper is 'internship_draft.pdf'. It was not sent out because of
the missing qualification and verification. But this document may provide a more
detailed information about the whole idea.

To deploy the react project locally:
* Download this git repo
* Execute `npm start` in the root path of the repo
* The default host address is localhost:3000

Future work:
* Unit test
* A fancy and cool UI
* Test with more browsers

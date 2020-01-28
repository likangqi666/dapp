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

This was an internship project. I planned to make it a conference paper. But I
only have a contract for a limited time. So I don't have enough time to do the
qualification. The draft version of the paper is 'internship_draft.pdf'. It was
not sent out because of the missing qualification and verification part. But this
document provides a more detailed information about the whole idea.

## Prerequisite
* node
* Any Ethereum wallet, for connecting to Ethereum blockchain. Here I recommend
  Metamask(https://metamask.io/). It is a Google Chrome extension. And it is more
  user friendly than the official Ethereum tools when you only need the basic functions.

To deploy the react project locally:
* Download this git repo
* Execute `npm start` in the root path of the repo
* The default host address is localhost:3000

To use this prototype:
* Five pages are created. In the main page, other four pages can be accessed. Each
  one is designed for a specific role in the healthcare management system.
* This web project doesn't have any database/server running behind. All the interactions
  are Ethereum transactions. Ideally, the user must access these pages with their
  own Ethereum account. But in order to simplify this procedure, I have created
  a testing account and hardcoded it and its private key in the code. So when you
  are using this prototype. All transactions are sent from this account. This testing
  account is "0xa1AF1C42DbF15D0795560AF5Fe0117542c99C8f4". If you want to see how
  this account works in Ethereum, you can find the transaction history here:
  https://ropsten.etherscan.io/address/0xa1af1c42dbf15d0795560af5fe0117542c99c8f4
* 'internship_draft.pdf' contains more information

Future work:
* Unit test
* A fancy and cool UI
* Test with more browsers

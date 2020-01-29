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
  several testing accounts and deposited some Ether to these accounts. The
  private keys are listed below:

  | Accounts            | Private Key                                                      |
  | ------------------- |:----------------------------------------------------------------:|
  |Issuer               | 1BAE5C35433A946DE45FDA652B37719A8D5A064B68B48AF2772298515C1F5451 |
  |Healthcare Provider 1| 5BCDCA5242333773FB33DA030B930784806C996BB7FA420AF42D41E67E6E9538 |   
  |Healthcare Provider 2| F6C6F9813BB40B6964D2117ECC0E8E6E9678D21092F43B986BD34B8BE93BA13A |   
  |Insurance  Provider  | 78AE9EE7AEBDA81AA462CA3FD88C5F484E1DA4385AD40D63521E70862A0D2460 |
  |Patient 1            | 0F73502AC03036252784308CD96AB51B1FBDBC2C9D17A71DD9DAF1DE8726735E |
  |Patient 2            | AFAA3FAC000FCA616FBEB4E6B4D7E019E27C61B5EAE11E70C92C9A102FC7522E |
  
* These accounts are already added to the testing smart contract. You can import
  them in your wallet through the private key. If you want to   use your own
  account you need to use the 'issuer' account and the issuer interface   to add
  your new account.
* 'internship_draft.pdf' contains more information about this project

Future work:
* Unit test
* A fancy and cool UI
* Test with more browsers

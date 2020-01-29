import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Table, FormControl } from 'react-bootstrap';
import createReactClass from 'create-react-class';
import './App.css';
import * as serviceWorker from './serviceWorker';

//Setup Styles
const inputStyle = {
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:30,
  marginRight:10
};
const buttonStyle = {
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:40,
  width: 90,
  marginLeft: 180,
  color:"white",
  backgroundColor:"coral"
};

//Setup smart contracts
var web3;
if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  alert("You are not connected to Ethereum!");
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//Identity contract address
var contractAddress = "0xeaf144c42c795d5bcf71993882a5900253de8471";
var contractAbi = [{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_Type","type":"uint256"}],"name":"issueHP","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"}],"name":"newIssuer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"}],"name":"issueIP","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numHps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"readIssuer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"d","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_age","type":"uint256"},{"name":"_gender","type":"uint256"}],"name":"issuePatient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"issuers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"adr","type":"address"}],"name":"isIssuer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIssuer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPatient","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_trustee","type":"address"}],"name":"setTrustee","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOne","type":"address"},{"indexed":false,"name":"issuer","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"NewIssuer","type":"event"}];
//Contract object
var myContract = new web3.eth.Contract(contractAbi, contractAddress);

var IssuePatient = createReactClass({
    handleInputAddress: function(adr){
    this.setState({Address:adr.target.value});
  },
    getInitialState: function (){
    return { Address: '',BSN:'', Age:'',Gender:0 };
  },
    handleInputBSN: function(bsn){
      this.setState({BSN: bsn.target.value});
    },
    handleInputAge: function(age){
      this.setState({Age:age.target.value});
    },
    handleInputGender: function(gnd){
      this.setState({Gender:parseInt(gnd.target.value)});
    },
    issueNewPatient: async function(){
      var accounts = await ethereum.enable();
      console.log(accounts);
      console.log(this.state.Address);
      myContract.methods.issuePatient(this.state.Address,
                                      this.state.BSN,
                                      this.state.Age,
                                      this.state.Gender)
                        .call({from:accounts[0]},function(err,res){
                            if(!err) {
                              alert("New patient account has been registered!");
                            }
                        });
    },
    render: function() {
              return (
                    <div>
                      <div>
                        <p>
                          <input style={inputStyle}
                                 placeholder = "New Patient Account"
                                 size = "50"
                                 type="text"
                                 onChange = {this.handleInputAddress}
                                 value = {this.state.address} >
                          </input>
                        </p>
                        <p>
                          <input style={inputStyle}
                                 placeholder = "BSN"
                                 size = "15"
                                 type="text"
                                 onChange = {this.handleInputBSN}
                                 value = {this.state.BSN}>
                          </input>
                          <input style={inputStyle}
                                 placeholder = "Age"
                                 size = "10"
                                 type = "text"
                                 onChange = {this.handleInputAge}
                                 value = {this.state.age}>
                          </input>
                          <select style={inputStyle}
                                  id = "gender"
                                  onChange = {this.handleInputGender}>
                             <option value="1">Male</option>
                             <option value="2">Female</option>
                          </select>
                        </p>
                      </div>
                      <div >
                        <button style={buttonStyle} onClick = {this.issueNewPatient}>Issue</button>
                      </div>
                    </div>
              );
   }
});

var IssueIssuer = createReactClass({
    handleInputAddress: function(adr){
        this.setState({address:adr.target.value});
    },
    getInitialState: function (){
        return { address: ''};
    },
    checkBSN: async function(){
    //myContract.issuePatient(this.state.address,this.state.BSN);
    var accounts = await ethereum.enable();
    myContract.methods.newIssuer(String(this.state.address))
                      .call({from: accounts[0]},function(err,res){
                                          console.log(res);
                                        });
    },
    render: function() {
      return (
        <div>
          <div>
            <p>
              <input style={inputStyle}
                     placeholder = "New Issuer Account"
                     size = "60"
                     type="text"
                     onChange = {this.handleInputAddress}
                     value = {this.state.address}>
              </input>
            </p>
          </div>
          <div>
            <button style={buttonStyle}
                    onClick = {this.checkBSN}> Issue
            </button>
          </div>
        </div>
  );
  }
});

var IssueHealthcareProvider = createReactClass({
    handleInputAddress: function(adr){
      this.setState({address:adr.target.value});
    },
    getInitialState: function (){
      return { address: '',id:'', type:1};
    },
    handleInputID: function(id){
      this.setState({id: id.target.value});
    },
    handleInputType: function(type){
      this.setState({type: type.target.value});
    },
    issueHP: async function(){
      var accounts = await ethereum.enable();
      myContract.methods.issueHP(this.state.address,this.state.id,this.state.type)
                        .call({from: accounts[0]},
                              function(err,res){
                                            if(!err){
                                              alert("Healthcare provider is added, transaction hash is:  " + String(res));
                                            }
                                        });
    },
    render: function() {
      return (
                <div>
                  <p>
                    <input style={inputStyle}
                           placeholder = "New Healthcare Provider Address"
                           size = "60" type="text"
                           onChange = {this.handleInputAddress}
                           value = {this.state.address}>
                    </input>
                  </p>
                  <p>
                    <input style={inputStyle}
                           placeholder = "ID"
                           size = "15"
                           type="text"
                           onChange = {this.handleInputID}
                           value = {this.state.id}>
                    </input>
                    <select style={inputStyle}
                            placeholder = "Type"
                            id = "hpType"
                            onChange = {this.handleInputType}>
                              <option value="1">Family Doctor</option>
                              <option value="2">Hospital</option>
                              <option value="3">Dentist</option>
                              <option value="4">Drug Therapy</option>
                    </select>
                  </p>
                  <div>
                    <button style={buttonStyle} onClick = {this.issueHP}>Issue</button>
                  </div>
                </div>
              );
  }
});

var AddInsuranceProvider = createReactClass({
    handleInputAddress: function(adr){
      this.setState({address:adr.target.value});
    },
    getInitialState: function (){
      return { address: '',id:''};
    },
    handleInputID: function(id){
      this.setState({id: id.target.value});
    },
    issueHP: async function(){
      var accounts = await ethereum.enable();
      myContract.methods.issueIP(this.state.address,this.state.id)
                        .call({from: accounts[0]});
    },
    render: function() {
      return (
                <div>
                  <input style={inputStyle}
                         placeholder = "New Insurance Provider Address"
                         size = "60"
                         type="text"
                         onChange = {this.handleInputAddress}
                         value = {this.state.address}>
                  </input>
                  <p>
                    <input style={inputStyle}
                           placeholder = "ID"
                           size = "15"
                           type="text"
                           onChange = {this.handleInputID}
                           value = {this.state.id}>
                    </input>
                  </p>
                  <p>
                    <button style={buttonStyle}
                            onClick = {this.issueHP}>Issue</button>
                  </p>
                </div>
              );
  }
});

var Test = createReactClass({
	getInitialState:function(){
		return{
		adr:"0x8de94e6ef12c73de77e27a2e95529b2bd57c0399",
		abi:[{"constant":true,"inputs":[],"name":"getCreator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"uint256"},{"name":"_data2","type":"uint256"},{"name":"_data3","type":"uint256"},{"name":"_data4","type":"uint256"}],"name":"changeData4","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"uint256"},{"name":"_data2","type":"uint256"}],"name":"changeData2","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"uint256"}],"name":"changeData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_data","type":"uint256"},{"name":"_data2","type":"uint256"},{"name":"_data3","type":"uint256"}],"name":"changeData3","outputs":[],"payable":false,"type":"function"}]
		};
	},
	click1:function(){
		var testContr = new web3.eth.Contract(this.state.abi,this.state.adr);
		testContr.methods.changeData(1)
                     .call({from:accounts[0]},function(err,res){});
	},
	click2:function(){
		var testContr = new web3.eth.Contract(this.state.abi,this.state.adr);
		testContr.methods.changeData2(1,2)
                     .call({from:accounts[0]},function(err,res){});
	},
	click3:function(){
		var testContr = new web3.eth.Contract(this.state.abi,this.state.adr);
		testContr.methods.changeData3(1,2,3)
                     .call({from:accounts[0]},function(err,res){});
	},
	click4:function(){
		var testContr = new web3.eth.Contract(this.state.abi,this.state.adr);
		testContr.methods.changeData4(1,2,3,4)
                     .call({from:accounts[0]},function(err,res){});
	},
	render: function(){
    return(
    	<div>
        <button onClick = {this.click1}>1</button>
      	<button onClick = {this.click2}>2</button>
      	<button onClick = {this.click3}>3</button>
      	<button onClick = {this.click4}>4</button>
    	</div>
  	);
  }
});

var ContractInitialization = createReactClass({
  getInitialState: function(){
    return(
      {adr:''}
    )
  },
  handleInputAdr: function(adr){
    contractAddress = adr.target.value;
    this.setState({
      adr:adr.target.value
    });
  },
  setContract: function(){
    myContract = new web3.eth.Contract(contractAbi,contractAddress);
    console.log(myContract);
    console.log(contractAddress);
  },
  render: function(){
    return(
      <div>
        <input size = "60" type="text" onChange = {this.handleInputAdr} value = {this.state.adr}>
        </input>
        <button onClick = {this.setContract}>Set</button>
      </div>
    );
  }
});
var CheckIssuer = createReactClass({
  getInitialState: function(){
    return(
      {adr:''}
    )
  },
  handleInputAdr: function(adr){
    this.setState({
      adr:adr.target.value
    });
  },
  checkIdentity: async function(){
    var accounts = await ethereum.enable();
    myContract.methods.isIssuer(this.state.adr)
                      .call({from: accounts[0]},function(err,res){
                              if (res){
                                alert("This address is an issuer.");
                              }else{
                                alert("This address is not an issuer");
                              }
                            });
  },
  render: function(){
    return(
    <div>
      <input style={inputStyle} placeholder = "Issuer Address" size = "60" type="text" onChange = {this.handleInputAdr} value = {this.state.adr}>
      </input>
      <p>
      <button style={buttonStyle} onClick = {this.checkIdentity}>Check</button></p>
    </div>
  );}
});

function Issuer() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={"https://cert.ccsemc.com/filing/images/UL_Logo.gif"} className="App-logo" alt="logo" />
          <h2 className="headerFont">Healthcare Identity Management Prototype </h2>
          <h2 className="headerFont">***Issuers Interface***</h2>
        </div>
        <p className="App-intro">
        </p>
        <div className = "App-body">
          <div className = "box">
            <h3 className = "App-innerHeader">Add a New Patient Account </h3>
            <IssuePatient />
          </div>
          <div className = "box">
            <h3 className = "App-innerHeader">Add a New Issuer Account </h3>
            <IssueIssuer />
          </div>
          <div className = "box">
            <h3 className = "App-innerHeader">Add a New Healthcare Provider Account</h3>
            <IssueHealthcareProvider />
          </div>
          <div className = "box">
            <h3 className = "App-innerHeader">Add a New Insurance Provider</h3>
            <AddInsuranceProvider />
          </div>
          <div className = "box">
            <h3 className = "App-innerHeader">Check Issuer Addres</h3>
            <CheckIssuer />
          </div>
        </div>
      </div>
    );
  }

ReactDOM.render(<Issuer />, document.getElementById('root'));

serviceWorker.unregister();

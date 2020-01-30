import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
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
const buttonStyle2 = {
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:40,
  width: 90,
  marginLeft: 10,
  color:"white",
  backgroundColor:"coral"
};
const buttonStyle3 = {
  borderRadius:5,
  fontSize:13,
  height:30,
  width: 60,
  marginLeft: 10,
  color:"white",
  backgroundColor:"coral"
};
const choiceStyle = {
  borderRadius:5,
  fontSize:15,
  borderWidth:2,
  height: 25,
  width: 150,
  marginLeft: 50,
  color:"coral",
  borderColor:"coral",
  backgroundColor:"white"
};
const popupStyle = {
  borderRadius:5,
  backgroundColor:"#f6f5be",
  width:300,
  zIndex:100,
  margin:"auto",
  fontSize:15,
  marginTop:30,
  marginBottom:30,
  borderWidth:2
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
//Before Metamask can automatically inject web3 and return the default accounts,
//but this feature has been removed. So I have to hardcode the account here;
var policy;
var contractAddress = "0xeaf144c42c795d5bcf71993882a5900253de8471";
var contractAbi = [{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_Type","type":"uint256"}],"name":"issueHP","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"}],"name":"newIssuer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"}],"name":"issueIP","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numHps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"readIssuer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"d","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_age","type":"uint256"},{"name":"_gender","type":"uint256"}],"name":"issuePatient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"issuers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"adr","type":"address"}],"name":"isIssuer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIssuer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPatient","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_trustee","type":"address"}],"name":"setTrustee","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOne","type":"address"},{"indexed":false,"name":"issuer","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"NewIssuer","type":"event"}];
var myContract = new web3.eth.Contract(contractAbi, contractAddress);
var policyAbi =[{"constant":true,"inputs":[],"name":"ReadProvider","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ReadOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimContent","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_item","type":"uint256"},{"name":"_balance","type":"uint256"}],"name":"SetBalance","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pr","type":"address"},{"name":"_amount","type":"uint256[]"},{"name":"_item","type":"uint256[]"},{"name":"num","type":"uint256"}],"name":"MakeClaim","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DisplayClaims","outputs":[{"name":"providers","type":"address[]"},{"name":"pttSigs","type":"bool[]"},{"name":"paidSigs","type":"bool[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_item","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"CheckBalance","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_pr","type":"address"}],"name":"SetOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimAudit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"VerifyClaim","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_p","type":"address"}],"type":"constructor"}];
var policyItems = ["0","Ambulance Fee","Medical Check-Up","Dental Care","Diabetes Services"];

var MyInfo = createReactClass({
  getInitialState: function(){
    return {IncID:''};
  },
  getUserInfo: async function(){
    var tempRes;
    var accounts = await ethereum.enable();
    return new Promise(function(resolve, reject) {
              myContract.methods.readIns(accounts[0]).call(
                             {from: accounts[0]},
                             function(err, res) {
                               if (err) {
                                 console.log(err);
                               } else {
                               tempRes = res;
                               resolve(tempRes);
                               }
                             });
          })
  },
  componentWillMount: async function(){
    var result = await this.getUserInfo();
    if(result == 0){
      alert("You are not using a registered insurance provider account!");
      this.setState({IncID:"Illegal account!"});
    }else{
      this.setState({IncID:String(result)});
    }
  },
  render: function(){
            return(
              <div>
                <nobr>
                  <font color="chocolate">ID: </font>
                    {this.state.IncID}
                </nobr>
              </div>
            );
  }
});

var CheckID = createReactClass({
  getInitialState: function(){
    return {BSN:"", Age:"", Gender:"", Issuer:"",address:''};
  },
  getUserInfo: async function(){
    var tempRes;
    var userAddress = this.state.address;
    var accounts = await ethereum.enable();
    return new Promise(function(resolve, reject) {
    myContract.methods.readID(userAddress).call(
           {from: accounts[0]},
           function(err, res) {
             if (err) {
               console.log(err);
             } else {
             tempRes = res;
             resolve(tempRes);
             }
           });
    })
  },
  handleInputAddress: function(adr){
    this.setState({address:adr.target.value});
  },
  checkInfo: async function(){
    console.log(this.state.address);
    var result = await this.getUserInfo();
    this.setState({BSN:String(result[1]),
                   Age:String(result[3]),
                   Gender:String(result[2]),
                   Issuer:String(result[4])});
  },
  render: function(){

    return(
      <div>
        <nobr>
          <input style={inputStyle}
                 placeholder = "Patient Address"
                 size = "45"
                 type="text"
                 onChange = {this.handleInputAddress}
                 value = {this.state.address}>
          </input>
          <button style={buttonStyle2} onClick = {this.checkInfo}>Check</button>
        </nobr>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <td>BSN</td>
              <td>{this.state.BSN}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{this.state.Age}</td>
            </tr>
            <tr>
              <td>Gender</td>
             <td>{this.state.Gender}</td>
            </tr>
            <tr>
              <td>Issued by</td>
            <td>{this.state.Issuer}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
var SetOwner = createReactClass({
  getInitialState: function (){
    return { cntAddress: '',bnfAddress:'' };
  },
  handleContractAddress: function(cadr){
    this.setState({cntAddress: cadr.target.value});
  },
  handleOwnderAddress: function(owner){
    this.setState({bnfAddress: owner.target.value});
  },

  setBeneficiay: async function(){
    var policyContract = new web3.eth.Contract(policyAbi,this.state.cntAddress);
    var accounts = await ethereum.enable();
    policyContract.methods.SetOwner(this.state.bnfAddress,contractAddress)
                          .send(
                            {from: accounts[0]},
                            function(err,res){
                              if(!err){
                                alert("Transaction finished: "+String(res));
                              }
                            }
                          );
  },
  render: function(){

    return(<div>
      <p>
        <input style={inputStyle} placeholder = "Contract Address" size = "60" type="text" onChange = {this.handleContractAddress} value = {this.state.cntAddress}>
        </input>
      </p>
      <p>
        <input style={inputStyle} placeholder = "Beneficiary Address" size = "60" type="text" onChange = {this.handleOwnderAddress} value = {this.state.bnfAddress}>
        </input>
      </p>
      <p>
        <button style={buttonStyle} onClick = {this.setBeneficiay}>Set</button>
      </p>
    </div>
);
  }
});

var CheckClaims = createReactClass({
    getInitialState: function (){
    return {
      address: '',
      providers:[],
      pttSigs:[],
      paidSigs:[],
      items:[],
      amounts:[],
      list:[],
      content:[],
      claimID:''
    };
  },
    handleInputAddress: function(adr){
    policy = adr.target.value;
    this.setState({address:adr.target.value});
  },
    getClaims: async function(){
        var policyContract = new web3.eth.Contract(policyAbi, this.state.address);
        var tempRes;
        var accounts = await ethereum.enable();
        return new Promise (function(resolve,reject){
          policyContract.methods.DisplayClaims()
                                .call(
                                  {from: accounts[0]},
                                  function(err,res){
                                    if (err) {
                                      console.log(err);
                                    } else {
                                     tempRes = res;
                                     resolve(tempRes);
                                    }
                                  }
                                );
        });
     },
     getContent: async function(e){
      var policyContract = new web3.eth.Contract(policyAbi, this.state.address);
      var tempRes;
      var accounts = await ethereum.enable();
      return new Promise(
        function(resolve,reject){
          policyContract.methods.ClaimContent(e)
                                .call(
                                  {from: accounts[0]},
                                  function(err,res){
                                    if (err) {
                                    console.log(err);
                                    } else {
                                   //alert(res);
                                      tempRes = res;
                                      resolve(tempRes);
                                    }
                                  });
        });
     },
     showContent:async function(e){
      this.setState({claimID:e.target.value});
      var result = await this.getContent(e.target.value);
      this.setState({items:result[0],amounts:result[1]});
      var c = [];
      for (var k = 0; k < this.state.items.length; k++){
        c.push(
          <tr key = {k+10}>
            <td>{k}</td>
            <td>{String(policyItems[this.state.items[k]])}</td>
            <td>{String(this.state.amounts[k])}</td>
          </tr>
        );
      };
      var t = (
        <div style = {popupStyle}>
          <h4 style = {{margin:"auto"}}>Claim Content</h4>
          <table style = {{border:3,zIndex:200,backgroundColor:"white",margin:"auto",borderRadius:5}}>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {c}
            </tbody>
          </table>
          <nobr style={{marginLeft:100,marginTop:30,marginBottom:30}}>
            <button style={buttonStyle3}
                    onClick = {this.verifyClaim}
                    value = {this.state.claimID}>Verify</button>
            <button style={buttonStyle3} onClick = {this.cancelClaim}>Cancel</button>
          </nobr>
        </div>
      );
      this.setState({content:t});
    },
    cancelClaim: function(){
      this.setState({content:''});
    },
    verifyClaim: async function(e){
      var policyContract = new web3.eth.Contract(policyAbi, this.state.address);
      var accounts = await ethereum.enable();
      policyContract.methods.ClaimAudit(e.target.value)
                            .send(
                              {from: accounts[0]},
                              function(err,res){
                                if(!err){
                                  alert("Claim verified: "+String(res));
                                }
                              }
                            );
    },
    showClaims: async function(){
      var result = await this.getClaims();
      this.setState({providers:result[0], pttSigs:result[1], paidSigs:result[2]});
      var lines = [];
      for (var i = 0; i <this.state.providers.length; i++){
        lines.push(
          <tr key = {i}>
            <td>{i}</td>
            <td>{this.state.providers[i]}</td>
            <td>{String(this.state.pttSigs[i])}</td>
            <td>{String(this.state.paidSigs[i])}</td>
            <td><button style={{fontSize:8, backgroundColor:"coral",borderRadius:5,color:"white"}}
                        onClick = {this.showContent}
                        value = {i}>Show</button></td>
          </tr>
        );
      };
      this.setState({list:lines});
    },
    render: function() {
      return (
        <div>
          <nobr><input style = {inputStyle} placeholder = "Policy Contract Address" size = "45" type="text" onChange = {this.handleInputAddress} value = {this.state.address}>
          </input>
          <button style = {buttonStyle2} onClick = {this.showClaims}>Show Claims</button></nobr>
          <div style={{width:500}}>
            <table>
              <thead>
                <tr style={{fontSize:10}}>
                  <th>#</th>
                  <th>Claim Sender</th>
                  <th>User Verification</th>
                  <th>Insurance Verification</th>
                  <th>Content</th>
                </tr>
              </thead>
              <tbody style={{fontSize:10}}>
                {this.state.list}
              </tbody>
            </table>
          </div>
          {this.state.content}
        </div>
      );
  }
});

var SetCoverage = createReactClass({
  getInitialState: function(){
    return({address:""});
  },
  handleContractAddress: function(adr){
  this.setState({address:adr.target.value});
  },
  coverItem: async function(i){
    var policyContract = new web3.eth.Contract(policyAbi, this.state.address);
    var accounts = await ethereum.enable();
    policyContract.methods.SetBalance(i.target.value,1)
                          .send(
                            {from:accounts[0]},
                            function(err,res){
                              if(!err){
                                alert("Transaction finished: "+String(res));
                              }
                            }
                          );
  },
  render: function(){
    return (
      <div>
        <p>
          <input style={inputStyle} placeholder = "Contract Address" size = "60" type="text" onChange = {this.handleContractAddress} value = {this.state.address}>
          </input>
        </p>
        <p>
          <nobr>
            <button style={choiceStyle} onClick = {this.coverItem} value = {1}>Ambulance Fee</button>
            <button style={choiceStyle} onClick = {this.coverItem} value = {2}>Medical Check-Up</button>
          </nobr>
        </p>
        <p>
          <nobr>
            <button style={choiceStyle} onClick = {this.coverItem} value = {3}>Dental Care</button>
            <button style={choiceStyle} onClick = {this.coverItem} value = {4}>Diabetes Services</button>
          </nobr>
        </p>
      </div>
    );
  }
});

function InsuranceProvider() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={"https://cert.ccsemc.com/filing/images/UL_Logo.gif"} className="App-logo" alt="logo" />
          <h2 className="headerFont">Healthcare Identity Management Prototype </h2>
          <h2 className="headerFont">***Insurance Providers Interface***</h2>
        </div>
        <p className="App-intro">
        </p>
        <div className = "App-body">
          <div className="box">
            <h3 className = "App-innerHeader">My Information</h3>
            <MyInfo />
          </div>
          <div className ="box" >
            <h3 className = "App-innerHeader">Set beneficiary of a policy contract</h3>
            <SetOwner />
          </div>
          <div className ="box" >
            <h3 className = "App-innerHeader">Set policy coverage</h3>
            <SetCoverage />
          </div>
          <div className ="box" >
            <h3 className = "App-innerHeader">Check patient identity </h3>
            <CheckID />
          </div>
          <div className ="box" >
            <h3 className = "App-innerHeader">Check insurance claims</h3>
            <div>
              <CheckClaims />
            </div>
          </div>
        </div>
      </div>
    );
}

ReactDOM.render(<InsuranceProvider />, document.getElementById('root'));

serviceWorker.unregister();

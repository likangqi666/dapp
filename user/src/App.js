import './App.css';
import React, { Component } from 'react';
import Web3 from 'web3';
var Table=require('react-bootstrap/lib/Table');
var web3;
if (typeof window.web3 !== 'undefined') {
  web3=new Web3(window.web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//accounts are managed in Metamask (or Mist, Geth)
var accounts=web3.eth.accounts;
//Identity contract address
var contractAddress="0x20eaf53fae5054422af523dcaf87a4fa7e9b70f2";
//Identity contract ABI
var contractAbi=[{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_Type","type":"uint256"}],"name":"issueHP","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"}],"name":"newIssuer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"}],"name":"issueIP","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numHps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"readIssuer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"d","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_age","type":"uint256"},{"name":"_gender","type":"uint256"}],"name":"issuePatient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"issuers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"adr","type":"address"}],"name":"isIssuer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIssuer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPatient","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_trustee","type":"address"}],"name":"setTrustee","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_issuer","type":"address"}],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOne","type":"address"},{"indexed":false,"name":"issuer","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"NewIssuer","type":"event"}];
//Identity contract object
var myContract=web3.eth.contract(contractAbi).at(contractAddress);

//Policy contract ABI
var policyAbi=[{"constant":true,"inputs":[],"name":"ReadProvider","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ReadOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimContent","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_item","type":"uint256"},{"name":"_balance","type":"uint256"}],"name":"SetBalance","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pr","type":"address"},{"name":"_amount","type":"uint256[]"},{"name":"_item","type":"uint256[]"},{"name":"num","type":"uint256"}],"name":"MakeClaim","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DisplayClaims","outputs":[{"name":"providers","type":"address[]"},{"name":"pttSigs","type":"bool[]"},{"name":"paidSigs","type":"bool[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_item","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"CheckBalance","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_pr","type":"address"}],"name":"SetOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimAudit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"VerifyClaim","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_p","type":"address"}],"type":"constructor"}];
var policyItems=["0","Ambulance Fee","Medical Check-Up","Dental Care","Diabetes Services"];
var gender=["Male","Female"];
var healthcareType=[0,"Family Doctor","Hospital","Dentist","Drug Therapy"];

//Styles
const inputStyle={
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:30,
  marginRight:10
};
const buttonStyle={
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
const buttonStyle2={
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
const popupStyle={
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
const buttonStyle3={
  borderRadius:5,
  fontSize:13,
  height:30,
  width: 60,
  marginLeft: 10,
  color:"white",
  backgroundColor:"coral"
};
//Display current personal info
var MyInfo=React.createClass({
  getInitialState: function(){
    return {BSN:"", Age:"", Gender:"", Issuer:""};
  },
  getUserInfo: function(){
    var tempRes;
    return new Promise(function(resolve, reject) {
    myContract.readID(accounts[0],{from: accounts[0]},function(err, res) {
     if (err) {
       console.log(err);
     } else {
     tempRes=res;
     resolve(tempRes);
   }
 })
 })
 },
  componentWillMount: async function(){
    var result=await this.getUserInfo();
    this.setState({BSN:String(result[1]), Age:String(result[3]), Gender:String(result[2]), Issuer:String(result[4])});
    },

  render: function(){

    return(
    <div>
    <table>
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
       <td>{gender[this.state.Gender]}</td>
      </tr>
      <tr>
        <td>Issued by</td>
      <td>{this.state.Issuer}</td>
      </tr>
    </table>
  </div>
);
  }
});

//Read/change additional info
var MyAdInfo=React.createClass({
  getInitialState: function(){
    return {curInfo:"",newInfo:""};
  },
  getUserInfo: function(){
    var tempRes;
    return new Promise(function(resolve, reject) {
    myContract.readID(accounts[0],{from: accounts[0]},function(err, res) {
     if (err) {
       console.log(err);
     } else {
     tempRes=res;
     resolve(tempRes);
   }
 })
 })
 },
  componentWillMount: async function(){
    var result=await this.getUserInfo();
    this.setState({curInfo:String(result[1])});
    },
  handleNewInfo: function(info){
    this.setState({newInfo: info.target.value});
  },
  changeInfo: function(){
      myContract.setInfo(this.state.newInfo,{from: accounts[0]},function(err, res) {
      });
  },
  render: function(){

    return(
      <div>
      <p>{this.state.curInfo}</p>
      <p><input style={inputStyle} placeholder="New Information" size="60" type="text" onChange={this.handleNewInfo} value={this.state.newInfo}>
      </input></p>
    <p><button style={buttonStyle} onClick={this.changeInfo}>Change</button></p>
      </div>
);
  }
});

//Add trustee
var AddTrustPerson=React.createClass({
    handleInputAddress: function(adr){
    this.setState({address:adr.target.value});
  },
    getInitialState: function (){
    return { address: '',BSN:'' };
  },
    handleInputBSN: function(bsn){
    this.setState({BSN: bsn.target.value});
    },
    issueNewPatient: function(){
    myContract.setTrustee(this.state.address,{from: accounts[0]},function(err,res){
      console.log(res);
    });
    },
    render: function() {
  return (
    <div>
    <p><input style={inputStyle} placeholder="Trusted Account" size="60" type="text" onChange={this.handleInputAddress} value={this.state.address}>
    </input></p>
    <p><button style={buttonStyle} onClick={this.issueNewPatient}>Add</button></p>
    </div>
  );
  }
});

//Current selected policy contract
var policy;

//Display applied claims
var CheckClaims=React.createClass({
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
    policy=adr.target.value;
    this.setState({address:adr.target.value});
  },
    getClaims: function(){
    var policyContract=web3.eth.contract(policyAbi).at(this.state.address);
    var tempRes;
    return new Promise (function(resolve,reject){
      policyContract.DisplayClaims({from: accounts[0]},function(err,res){if (err) {
       console.log(err);
     } else {
     tempRes=res;
     resolve(tempRes);
   }
      });
    });
    },
    getContent: function(e){
      var policyContract=web3.eth.contract(policyAbi).at(this.state.address);
      var tempRes;
      return new Promise(
        function(resolve,reject){
          policyContract.ClaimContent(e,{from: accounts[0]},function(err,res){if (err) {
           console.log(err);
         } else {
           //alert(res);
         tempRes=res;
         resolve(tempRes);
        }
      });
        }
      );
    },
    showContent:async function(e){
      this.setState({claimID:e.target.value});
      var result=await this.getContent(e.target.value);
      this.setState({items:result[0],amounts:result[1]});
      var c=[];
      for (var k=0; k < this.state.items.length; k++){
        c.push(
          <tr key={k+10}>
            <td>{k}</td>
            <td>{String(policyItems[this.state.items[k]])}</td>
            <td>{String(this.state.amounts[k])}</td>
          </tr>
        );
      };
    var t=(
    <div style={popupStyle}>
      <h4 style={{margin:"auto"}}>Claim Content</h4>
      <table style={{border:3,zIndex:200,backgroundColor:"white",margin:"auto",borderRadius:5}}>
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
        <button style={buttonStyle3} onClick={this.verifyClaim} value={this.state.claimID}>Verify</button>
        <button style={buttonStyle3} onClick={this.cancelClaim}>Cancel</button>
      </nobr>
    </div>);
    this.setState({content:t});
    },
    cancelClaim: function(){
      this.setState({content:''});
    },
    verifyClaim: function(e){
      var policyContract=web3.eth.contract(policyAbi).at(this.state.address);
      policyContract.VerifyClaim(e.target.value,{from: accounts[0]},function(err,res){
        if(!err){
          alert("Claim verified: "+String(res));
        }
      });
      this.setState({content:''});
      this.setState({content:''});
    },
    showClaims: async function(){
    var result=await this.getClaims();
    this.setState({providers:result[0], pttSigs:result[1], paidSigs:result[2]});
    var lines=[];
    for (var i=0; i <this.state.providers.length; i++){
      lines.push(
        <tr key={i}>
          <td>{i}</td>
          <td>{this.state.providers[i]}</td>
          <td>{String(this.state.pttSigs[i])}</td>
          <td>{String(this.state.paidSigs[i])}</td>
          <td><button style={{fontSize:8, backgroundColor:"coral",borderRadius:5,color:"white"}} onClick={this.showContent} value={i}>Show</button></td>
        </tr>
      );
    };
    this.setState({list:lines});
    },
    render: function() {
  return (
    <div>
      <nobr><input style={inputStyle} placeholder="Policy Contract Address" size="45" type="text" onChange={this.handleInputAddress} value={this.state.address}>
      </input>
      <button style={buttonStyle2} onClick={this.showClaims}>Show Claims</button></nobr>
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

/*Check healthcare provider identity*/

var CheckHP=React.createClass({
  getInitialState: function(){
    return {hcType:'',hcID:'',address:''};
  },
  getUserInfo: function(adr){
    var tempRes;
    return new Promise(function(resolve, reject) {
    myContract.readHc(adr,{from: accounts[0]},function(err, res) {
     if (err) {
       console.log(err);
     } else {
     tempRes=res;
     resolve(tempRes);
   }
 })
 })
 },
 handleInputAddress: function(adr){
 policy=adr.target.value;
 this.setState({address:adr.target.value});
},
  check: async function(){
    var result=await this.getUserInfo(this.state.address);
    console.log(result);
    this.setState({hcID:String(result[0]),hcType:healthcareType[parseInt(result[1])]});
    console.log(healthcareType[parseInt(result[1])]);
    },
  render: function(){

    return(
      <div>
        <nobr>
          <input style={inputStyle} placeholder="Healthcare Provider Address" size="45" type="text" onChange={this.handleInputAddress} value={this.state.address}>
          </input>
          <button style={buttonStyle2} onClick={this.check}>Check</button>
        </nobr>
        <h4><font color="chocolate">Healthcare Provider Type: </font></h4>
        <p>
          {this.state.hcType}
        </p>
        <h4><font color="chocolate">ID: </font></h4>
        <p>
          {String(this.state.hcID)}
        </p>
      </div>
);
  }
});

class App extends Component {
  render() {
    return (<div className="App">
        <div className="App-header">
          <img src={"https://cert.ccsemc.com/filing/images/UL_Logo.gif"} className="App-logo" alt="logo" />
          <h2>Welcome to Healthcare Identity Management System! </h2>
        </div>
        <p className="App-intro">
        </p>
        <div className="App-body">
          <div className="box" >
            <h3 className="App-innerHeader">My Identity Information</h3>
            <MyInfo />
          </div>
          <div className="box">
            <h3 className="App-innerHeader">My Personal Information</h3>
            <MyAdInfo />
          </div>
          <div className="box">
            <h3 className="App-innerHeader">Add a trustee</h3>
            <AddTrustPerson />
          </div>
          <div className="box">
            <h3 className="App-innerHeader">Check insurance claims</h3>
            <CheckClaims />
          </div>
          <div className="box">
            <h3 className="App-innerHeader">Check Healthcare Provider Identity</h3>
            <CheckHP />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

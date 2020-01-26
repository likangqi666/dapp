import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import * as serviceWorker from './serviceWorker';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

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
const buttonStyleSubmit = {
  borderRadius:5,
  fontSize:15,
  borderTop:8,
  borderLeft:0,
  borderRight:0,
  height:40,
  width: 90,
  marginLeft: 185,
  marginTop: 20,
  color:"white",
  backgroundColor:"#A40819"
};
const buttonStyleCheck = {
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:40,
  width: 90,
  marginLeft: 10,
  color:"white",
  backgroundColor:"#A40819"
};
const buttonStyleAdd = {
  borderRadius:5,
  fontSize:15,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:30,
  width: 30,
  marginLeft: 3,
  color:"white",
  backgroundColor:"#A40819"
};

//Setup smart contracts
var web3;
if (typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//Before Metamask can automatically inject web3 and return the default accounts,
//but this feature has been removed. So I have to hardcode the account here;
//var accounts = web3.eth.accounts;
var accounts =["0xa1AF1C42DbF15D0795560AF5Fe0117542c99C8f4"];
var contractAddress = "0xC48eCd3C1f3BB9f00ad4353e09F43073719C0e32";
var contractAbi = [{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_Type","type":"uint256"}],"name":"issueHP","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_issuer","type":"address"}],"name":"newIssuer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"}],"name":"issueIP","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numHps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"readIssuer","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"d","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_id","type":"uint256"},{"name":"_age","type":"uint256"},{"name":"_gender","type":"uint256"}],"name":"issuePatient","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"issuers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIps","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"adr","type":"address"}],"name":"isIssuer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numIssuer","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"numPatient","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_trustee","type":"address"}],"name":"setTrustee","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOne","type":"address"},{"indexed":false,"name":"issuer","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"NewIssuer","type":"event"}];
var myContract = new web3.eth.Contract(contractAbi, contractAddress);
var policyAbi =[{"constant":true,"inputs":[],"name":"ReadProvider","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"patient","type":"address"}],"name":"readID","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ReadOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimContent","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_insPr","type":"address"}],"name":"readIns","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_hcPr","type":"address"}],"name":"readHc","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_item","type":"uint256"},{"name":"_balance","type":"uint256"}],"name":"SetBalance","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_pr","type":"address"},{"name":"_amount","type":"uint256[]"},{"name":"_item","type":"uint256[]"},{"name":"num","type":"uint256"}],"name":"MakeClaim","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"DisplayClaims","outputs":[{"name":"","type":"address[]"},{"name":"","type":"bool[]"},{"name":"","type":"bool[]"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_item","type":"uint256"},{"name":"_amount","type":"uint256"}],"name":"CheckBalance","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_pr","type":"address"}],"name":"SetOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"ClaimAudit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"},{"name":"_trustee","type":"address"}],"name":"checkTrustee","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"VerifyClaim","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_p","type":"address"}],"type":"constructor"}];
var healthcareType = [0,"Family Doctor","Hospital","Dentist","Drug Therapy"];

//Functions
var CheckID = createReactClass({
  getInitialState: function(){
    return {BSN:"", Age:"", Gender:"", Issuer:"",address:''};
  },
  getUserInfo: function(){
    var tempRes;
    var userAddress = this.state.address;
    return new Promise(function(resolve, reject) {
      myContract.methods.readID(userAddress)
      .call({from: accounts[0]},
            function(err, res) {
             if (err) {
               console.log(err);
             } else {
             tempRes = res;
             resolve(tempRes);
             }
            })
    })
  },
  handleInputAddress: function(adr){
    this.setState({address:adr.target.value});
  },
  checkInfo: async function(){
    console.log(this.state.address);
    var result = await this.getUserInfo();
    this.setState({BSN:String(result[1]), Age:String(result[3]), Gender:String(result[2]), Issuer:String(result[4])});
  },
  render: function(){
    return(
    <div>
      <nobr>
        <input style={inputStyle} placeholder = "Patient Address" size = "45" type="text" onChange = {this.handleInputAddress} value = {this.state.address}>
        </input>
        <button style={buttonStyleCheck} onClick = {this.checkInfo}>Check</button>
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

var MyInfo = createReactClass({
  getInitialState: function(){
    return {hcType:'',hcID:''};
  },
  getUserInfo: function(){
    var tempRes;
    return new Promise(function(resolve, reject) {
      myContract.methods.readHc(accounts[0])
      .call({from: accounts[0]},
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
    console.log(result);
    this.setState({hcID:String(result[0]),hcType:healthcareType[parseInt(result[1])]});
    console.log(healthcareType[parseInt(result[1])]);
  },
  render: function(){
    return(
      <div>
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

var ClaimList = createReactClass({
    getInitialState: function(){
      return({
        amount:'',
        item:1,
      });
    },
    handleInputAmount: function(amt){
      this.setState({amount:amt.target.value});
    },
    handleSelections: function(slt){
      this.setState({item:slt.target.value});
    },
    add: function(item,amount){
      this.props.onChange(this.state.item,this.state.amount);
    },
    render: function(){
      return(
        <div>
          <select style = {inputStyle} id = "claimItems" onChange = {this.handleSelections}>
              <option value="1">Ambulance Fee</option>
              <option value="2">Medical Check-Up</option>
              <option value="3">Dental Care</option>
              <option value="4">Diabetes Services</option>
            </select>
            <input style = {inputStyle} placeholder="Amount" size = "60" type="number" onChange = {this.handleInputAmount} value = {this.state.amount}>
            </input>
            <button style = {buttonStyleAdd} onClick = {this.add}>+</button>
        </div>
      );
    }
  });

var MakeClaim = createReactClass({
    handleInputAmount: function(amt){
    this.setState({amount:amt.target.value});
    },
    getInitialState: function (){
      return {
        address:'',
        amounts: [],
        items:[],
        list:[
        //
        {"id":1}
        ]
      };
    },
    submitClaim: function(){
      var policyContract = new web3.eth.Contract(policyAbi, this.state.address);
      console.log(policyContract,this.state.amounts,contractAddress);
      policyContract.methods.MakeClaim(contractAddress,
                                       this.state.amounts,
                                       this.state.items,
                                       this.state.amounts.length)
                            .call({from: accounts[0]},
                                  function(err, res) {
                                   if (err) {
                                     console.log(err);
                                   } else {
                                   alert("Claim submitted. Transaction hash: " + String(res));
                                   }
                                 });
    },
    handleInputAddress: function(adr){
      this.setState({address:adr.target.value});
    },
    handleSelections: function(slt){
      this.setState({item: slt.target.value});
    },
    addNew: function(item,amount){
      this.setState({
        items: this.state.items.concat([web3.utils.toBN(item)]),
        amounts: this.state.amounts.concat([web3.utils.toBN(amount)]),
        list: this.state.list.concat([{"id": ++this.state.list.length}])
      });
    },
    render: function() {
      return (
        <div>
          <input style={inputStyle} placeholder = "Policy Address" size = "60" type="text" onChange = {this.handleInputAddress} value = {this.state.address}>
          </input>
          <h4><font color="chocolate">Claim contents:</font></h4>
          {this.state.list.map((item) => (
            <ClaimList ref = {String(this.state.list.length)} key = {item.id} onChange = {this.addNew}/>
          ))}
        <button style = {buttonStyleSubmit} onClick = {this.submitClaim}>Submit</button>
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
    myContract = new web3.eth.Contract(contractAbi, contractAddress);
    //console.log(myContract);
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

function HealthcareProvider() {
  return (
    <div className="App">
        <div className="App-header">
          <img src={"https://cert.ccsemc.com/filing/images/UL_Logo.gif"} className="App-logo" alt="logo" />
          <h2 className="headerFont">Healthcare Identity Management System Prototype</h2>
          <h2 className="headerFont">***Healthcare Providers Interface*** </h2>
        </div>
        <div className = "App-body">
          <div className="box">
            <h3 className = "App-innerHeader">My Information</h3>
            <MyInfo />
          </div>
          <div className = "box">
            <h3 className = "App-innerHeader">Check Patient Identity </h3>
            <CheckID />
          </div>
          <div className = "box2">
            <h3 className = "App-innerHeader">Make a Claim</h3>
            <MakeClaim />
          </div>
        </div>
      </div>
  );
}

ReactDOM.render(<HealthcareProvider />, document.getElementById('root'));

serviceWorker.unregister();

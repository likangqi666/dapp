import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';
import createReactClass from 'create-react-class';

const buttonStyle = {
  fontSize:20,
  borderTop:0,
  borderLeft:0,
  borderRight:0,
  height:50,
  width: 380,
  color:"#A40819",
  backgroundColor:"white",
  borderColor:"#A40819",
  border:"solid",
  borderWidth:4,
  borderRadius:5,
  textAlign:"center",
};

var Subpage = createReactClass({
  propoTypes: {
    pageName: "",
  },
  goToPage: function(event){
    switch (this.props.pageName) {
      case "Healthcare Provider":
        window.open("healthcareProvider.html");
      case "Insurance Provider":
        window.open("insuranceProvider.html");
      case "Issuer":
        window.open("issuer.html");
      case "Patient":
        window.open("patient.html");
        break;
      default:
        this.pageUrl = window.location.href;
    }
  },
  render: function(){
    return(
      <div>
        <button style={buttonStyle}
                onClick={this.goToPage}>{this.props.pageName}</button>
      </div>
    );
  }
});

function MainPage() {
  return (
    <div className="App">
        <div className="App-header">
          <img src={"https://cert.ccsemc.com/filing/images/UL_Logo.gif"} className="App-logo" alt="logo" />
          <h2 className="headerFont">Healthcare Identity Management System Prototype</h2>
          <h2 className="headerFont">Please Select Your Identity: </h2>
        </div>
        <div className = "App-body">
          <Subpage pageName = "Healthcare Provider"/>
          <Subpage pageName = "Insurance Provider"/>
          <Subpage pageName = "Issuer"/>
          <Subpage pageName = "Patient"/>
        </div>
      </div>
  );
}

ReactDOM.render(<MainPage />, document.getElementById('root'));

serviceWorker.unregister();

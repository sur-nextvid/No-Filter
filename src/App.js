import React, { Component } from "react";
import web3 from "./web3";

import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
    // this.state = {
      
    // };
  

  componentDidMount() {
    
  }

  
    let user = web3.eth.getAccounts();

  render() {
    return (
      <div className="App">
        <h1>No Filter V. 0.3.0</h1>
        <p>Your Address: </p>
      </div>
    );
  }
}

export default App;

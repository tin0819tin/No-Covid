import React, {Fragment, useState, useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// utility for web3 and smart contract
import getWeb3 from "utils/getWeb3";
import COVIDContract from "build/contracts/COVID.json"

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ActionPage from "views/ActionPage/ActionPage"
import ArrivePage from "views/ArrivePage/ArrivePage"

var hist = createBrowserHistory();

const NoCovid = () => {
    // Web3
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [networkId, setNetworkId] = useState(null);
    const [contract, setContract] = useState(null);

     // Setup web3.js
    useEffect(() => {
        const getweb3 = async () => {
        const web3result = await getWeb3();
        setWeb3(web3result);
        }
        getweb3();    
    }, []);

    useEffect(() => {
        const getaccount = async () => {
        if(web3 !== null){
            const accountresult = await web3.eth.getAccounts();
            setAccount(accountresult);
            const networkidresult = await web3.eth.net.getId();
            setNetworkId(networkidresult);
        }    
        }
        getaccount();
    }, [web3]);

    useEffect(() => {
        try{
            if(networkId !== null){
                const deployedNetwork = COVIDContract.networks[networkId];
                console.log(deployedNetwork.address);
        
                const instance = new web3.eth.Contract(
                COVIDContract.abi,
                deployedNetwork && deployedNetwork.address,
                );
                setContract(instance);
                console.log(instance);
            }
        }
        catch(error){
            console.log(error);
        }
        
    }, [networkId]);

    return(
        <div>
            <Router history={hist}>
                <Switch>
                    <Route path="/landing" render={(props) => <LandingPage {...props} contract={contract} />}  />
                    <Route path="/login" render={(props) => <LoginPage {...props} contract={contract} />} />
                    <Route path="/action" render={(props) => <ActionPage {...props} contract={contract} />}  />    
                    <Route path="/arrive" render={(props) => <ArrivePage {...props} contract={contract} />}  />  
                    <Route path="/" component={Components} />
                </Switch>
            </Router>
        </div>
    );
}

export default NoCovid;
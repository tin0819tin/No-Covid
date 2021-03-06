import React, { useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from 'components/CustomButtons/Button.js';
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import { Drawer, Input} from 'antd';

// images
import chocolate_cake from '../../../images/chocolate_cake.jpg';
import cupcake from '../../../images/cupcake.jpg';
import ice_cream from '../../../images/ice_cream.jpg';
import donut from '../../../images/donut.jpg';
import macaron from '../../../images/macaron.jpg';
import milkshake from '../../../images/milkshake.jpg';

// Connect to contract using web3
import getWeb3 from "utils/getWeb3";
import COVIDContract from "build/contracts/COVID.json"

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  const dessert_width = "200";
  const dessert_height = "300";
  const [num_chocolate_cake, setNum_chocolate_cake] = useState(0);
  const [num_cupcake, setNum_cupcake] = useState(0);
  const [num_ice_cream, setNum_ice_cream] = useState(0);
  const [num_donut, setNum_donut] = useState(0);
  const [num_macaron, setNum_macaron] = useState(0);
  const [num_milkshake, setNum_milkshake] = useState(0);
  const [costs, setCosts] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const resetOrder = () => {
    setNum_chocolate_cake(0);
    setNum_cupcake(0);
    setNum_ice_cream(0);
    setNum_donut(0);
    setNum_macaron(0);
    setNum_milkshake(0);
    setCosts(0)
    onClose();
  };

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
    if(networkId !== null){
      const deployedNetwork = COVIDContract.networks[networkId];
      // console.log(deployedNetwork.address);

      const instance = new web3.eth.Contract(
        COVIDContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setContract(instance);
    }
  }, [networkId]);

  return (
    <div className={classes.section}>
      <Drawer
        title="My Order"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
      <h5>
        Destination
        <Input onChange={(event) => {
          setAddress(event.target.value)
          // console.log(address)
          }} placeholder="Address" />
      </h5>
      <h5>
        Your phone number
        <Input onChange={(event) => {
          setPhone(event.target.value)
          // console.log(phone)
        }} placeholder="Phone number" />
      </h5>
      <h5>
        Items
      </h5>
      {num_chocolate_cake
        ? <p>Chocolate Cake  x {num_chocolate_cake}</p>
        : <p></p>
      }
      {num_cupcake
        ? <p>Cupcake  x {num_cupcake}</p>
        : <p></p>
      }
      {num_ice_cream
        ? <p>Ice Cream  x {num_ice_cream}</p>
        : <p></p>
      }
      {num_donut
        ? <p>Donut  x {num_donut}</p>
        : <p></p>
      }
      {num_macaron
        ? <p>Macaron  x {num_macaron}</p>
        : <p></p>
      }
      {num_milkshake
        ? <p>Milkshake  x {num_milkshake}</p>
        : <p></p>
      }
      {costs
        ? <>
            <hr></hr>
            <h4 align="right">${costs}</h4>
          </>
        : <p>No item</p>
      }
      <Button size="sm" color="success" onClick={() =>
      {
        contract.methods.UploadOrder([num_chocolate_cake, num_cupcake, num_cupcake, num_donut, num_macaron, num_milkshake], address, phone).send({from: '0x56F442A2F5E251a9cb8B78745E9a41E8970B9d3f'});
        resetOrder;
        }} disabled={!costs}> send my order </Button>
      <Button size="sm" color="rose" onClick={resetOrder}>reset</Button>
      <Button size="sm" onClick={onClose}>cancel</Button>
      </Drawer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Menu</h2>
          <h5 className={classes.description}>
            Tonight, I would like some...
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <img src={chocolate_cake} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Chocolate Cake $60"
              description="sweet in my vain"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_chocolate_cake} onClick={() => {
              if(num_chocolate_cake > 0)
                setNum_chocolate_cake(num_chocolate_cake - 1)
                setCosts(costs - 60)
                }}>-</Button>
            <font size="3" color="black"> {num_chocolate_cake} </font>
            <Button justIcon round size="sm" onClick={() => 
              {
                setNum_chocolate_cake(num_chocolate_cake + 1)
                setCosts(costs + 60)
              }}>+</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <img src={cupcake} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Cupcake $60"
              description="so soft"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_cupcake} onClick={() => {
              if(num_cupcake > 0)
                setNum_cupcake(num_cupcake - 1)
                setCosts(costs - 60)
                }}>-</Button>
            <font size="3" color="black"> {num_cupcake} </font>
            <Button justIcon round size="sm" onClick={() => 
            {
              setNum_cupcake(num_cupcake + 1)
              setCosts(costs + 60)
            }}>+</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <img src={ice_cream} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Ice Cream $50"
              description="summer time"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_ice_cream} onClick={() => {
              if(num_ice_cream > 0)
                setNum_ice_cream(num_ice_cream - 1)
                setCosts(costs - 50)
                }}>-</Button>
            <font size="3" color="black"> {num_ice_cream} </font>
            <Button justIcon round size="sm" onClick={() => 
              {
                setNum_ice_cream(num_ice_cream + 1)
                setCosts(costs + 50)
                }}>+</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <br></br>
            <img src={donut} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Donut $50"
              description="crispy circle"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_donut} onClick={() => {
              if(num_donut > 0)
                setNum_donut(num_donut - 1)
                setCosts(costs - 50)
                }}>-</Button>
            <font size="3" color="black"> {num_donut} </font>
            <Button justIcon round size="sm" onClick={() => 
              {
                setNum_donut(num_donut + 1)
                setCosts(costs + 50)
            }}>+</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <br></br>
            <img src={macaron} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Macaron $70"
              description="a cute little thing"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_macaron} onClick={() => {
              if(num_macaron > 0)
                setNum_macaron(num_macaron - 1)
                setCosts(costs - 70)
                }}>-</Button>
            <font size="3" color="black"> {num_macaron} </font>
            <Button justIcon round size="sm" onClick={() => 
              {
                setNum_macaron(num_macaron + 1)
                setCosts(costs + 70)
                }}>+</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <br></br>
            <img src={milkshake} width={dessert_width} height={dessert_height}/>
            <InfoArea
              title="Milkshake $50"
              description="shake it off!!!"
              vertical
            />
            <Button justIcon round size="sm" disabled={!num_milkshake} onClick={() => {
              if(num_milkshake > 0)
                setNum_milkshake(num_milkshake - 1)
                setCosts(costs - 50)
                }}>-</Button>
            <font size="3" color="black"> {num_milkshake} </font>
            <Button justIcon round size="sm" onClick={() => 
              {
                setNum_milkshake(num_milkshake + 1)
                setCosts(costs + 50)
                }}>+</Button>
          </GridItem>
        </GridContainer>
        <br></br>
        <Button onClick={showDrawer}> Save my order </Button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import faker from "faker";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from 'components/CustomButtons/Button.js';
import CustomInput from "components/CustomInput/CustomInput.js";
import styles1 from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import styles2 from "assets/jss/material-kit-react/views/landingPage.js";
import { Drawer, Input} from 'antd';

// images
import chocolate_cake from '../../images/chocolate_cake.jpg';
import cupcake from '../../images/cupcake.jpg';
import ice_cream from '../../images/ice_cream.jpg';
import donut from '../../images/donut.jpg';
import macaron from '../../images/macaron.jpg';
import milkshake from '../../images/milkshake.jpg';

const useStyles1 = makeStyles(styles1);
const useStyles2 = makeStyles(styles2);

export default function OrderPage(props) {
  const classes1 = useStyles1();
  const classes2 = useStyles2();
  const {web3, contract, ...rest} = props;
  const dessert_width = "200";
  const dessert_height = "300";
  const [clientAddr, setClientAddr] = useState("");
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
    setAddress("");
    document.getElementById("addressInput").value = ""
    setPhone("");
    document.getElementById("phoneInput").value = ""
    setCosts(0)
    onClose();
  };
  
  const setUpOrder = (num_chocolate_cake, num_cupcake, num_ice_cream, num_donut, num_macaron, num_milkshake, address, phone, costs) => {
    const restaurant_address = "No. 16-1, Aly. 14, Ln. 283, Sec. 3, Roosevelt Rd., Da’an Dist., Taipei City, Taiwan"
    contract.methods.UploadOrder([num_chocolate_cake, num_cupcake, num_ice_cream, num_donut,  num_macaron, num_milkshake], address,  phone, restaurant_address, costs).send({from: clientAddr});
    console.log(clientAddr, "order")
    console.log([num_chocolate_cake, num_cupcake, num_ice_cream, num_donut, num_macaron, num_milkshake], address, phone, restaurant_address, costs)
}

  const getaccount = async () => {
    console.log(web3, contract)
    if(web3 !== null && contract !== null){
        const accountresult = await web3.eth.getAccounts(); // get accounts
        console.log("accountresult", accountresult);
        setClientAddr(accountresult[0]); // 第一個為 client
    }    
  }

  useEffect(() => { // 初始 render
    getaccount();
  }, [web3, contract]);

  return (
    <>
      {/* <Header
        id="orderHeader"
        color="transparent"
        brand="Welcome to No-Covid"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      /> */}
    <div>
      <Parallax filter image={faker.image.imageUrl()}>
        <div className={classes2.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes2.title}>Get your dessert safely.</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
        <div className={classNames(classes2.main, classes2.mainRaised)}>
          <div className={classes2.container}>
            <div className={classes1.section}>
            <Drawer
              id="orderList"
              title="My Order"
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
            <h5>
              Destination
              <Input
                id="addressInput"
                onChange={(event) => {
                setAddress(event.target.value)
                console.log(event.target.value)
                }} placeholder="Address" />
            </h5>
            <h5>
              Your phone number
              <Input 
                id="phoneInput"
                onChange={(event) => {
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
            <Button 
            size="sm" 
            color="success" 
            // href="http://localhost:3000/confirmDelivery"
            onClick={() =>
            {
            setUpOrder(num_chocolate_cake, num_cupcake, num_ice_cream, num_donut, num_macaron, num_milkshake, address, phone, costs);
            resetOrder();
            }} disabled={!costs}> 
            <Link to="/confirmDelivery" style={{color:"white"}}>
            send my order
            </Link>
            </Button>
            <Button size="sm" color="rose" onClick={resetOrder}>reset</Button>
            <Button size="sm" onClick={onClose}>cancel</Button>
            </Drawer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes1.title}>Menu</h2>
                <h5 className={classes1.description}>
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
        </div>
      </div>
      {/* <Footer /> */}
    </div> 
    </>
  );
}

import {React, useState, useEffect} from "react";

import { Descriptions } from 'antd';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

// Connect to contract using web3
import getWeb3 from "utils/getWeb3";
import COVIDContract from "build/contracts/COVID.json"

const useStyles = makeStyles(styles);

export default function ConfirmDeliveryPage(props) {
  const classes = useStyles();
  const { contract, ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [FirstName, setFirstName] = useState("Wesly");
  const [LastName, setLastName] = useState("Hsieh");
  const [Email, setEmail] = useState("covid@gmail.com");
  const [Phone, setPhone] = useState("0912345678");
  const [TravelOrNot, setTravelOrNot] = useState("None");
  const [otherSymptom, setotherSymptom] = useState("None");
  const [Contact, setContact] = useState("None");
  const [Symptom, setSymptom] = useState("None");
  const [Score, setScore] = useState(0);


  const getDeliverDetail = () => {
    if(customerAddr !== ""){
        const result1 = contract.methods.GetOrderByAddress(customerAddr).send({from: '0x03787c28627DFE33BbC357029Ef9e28C9039e62A'});
        const result2 = contract.methods.GetProduct().send({from: '0x03787c28627DFE33BbC357029Ef9e28C9039e62A'});
        
        console.log(result1, result2);

        setOrderResult(result1[0].map( num =>  num.toNumber() ));
        setRealAddress(result[1]);
        setPhone(result1[2]);
        setTotal(result1[3]);
        setOrderName(result2[0].map(name => name.toString() ));
    }
};

  const setUpMatch = () => {
    contract.methods.MatchWithDeliver('0x03787c28627DFE33BbC357029Ef9e28C9039e62A').send({from: "0x33aAdA6626d9C3c3Ca6196E2F919Fbb67FCa93Aa"});
}

  return (
    <div>
      <Header
        color="transparent"
        brand="Welcome to No-Covid"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{FirstName}</h3>
                    <h6>Delivery ID: {}</h6>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
              </p>
            </div>
            <GridContainer justify="center">
            <Descriptions title="Info of your Delivery Man">
              <Descriptions.Item label="Name">{FirstName}, {LastName}</Descriptions.Item>
              <Descriptions.Item label="Phone">{Phone}</Descriptions.Item>
              <Descriptions.Item label="Email">{Email}</Descriptions.Item>
              <Descriptions.Item label="TravelOrNot">{TravelOrNot}</Descriptions.Item>
              <Descriptions.Item label="otherSymptom">{otherSymptom}</Descriptions.Item>
              <Descriptions.Item label="Contact">{Contact}</Descriptions.Item>
              <Descriptions.Item label="Symptom">{Symptom}</Descriptions.Item>
              <Descriptions.Item label="Score">{Score}</Descriptions.Item>
            </Descriptions>
            </GridContainer>
            <br></br>
            <GridContainer justify="center">
            <Button 
            size="sm" 
            color="success"
            href="http://localhost:3000/clientAction"
            onClick ={()=> {
              setUpMatch();
            }}
            > Confirm my order </Button>
            &nbsp; 
            <Button size="sm" color="rose"> Change another delivery man </Button>
            &nbsp;
            <Button 
            size="sm"
            href="http://localhost:3000/order"
            > Cancel my order </Button>
            </GridContainer>
            <br></br>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

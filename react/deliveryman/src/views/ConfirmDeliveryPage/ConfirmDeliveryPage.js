import {React, useState, useEffect} from "react";
import {Link} from "react-router-dom";
import loader from "../../api/map";
// Google Map Geolocation
import {geolocation} from 'api/geolocation';
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

const useStyles = makeStyles(styles);

export default function ConfirmDeliveryPage(props) {
  const classes = useStyles();
  const {web3, contract, ...rest} = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [clientAddr, setClientAddr] = useState("0x5d3FCad0098AAA8821E934479A8fCC056F32c8D5");
  const [deliveryAddr, setDeliveryAddr] = useState("0x97D40c60E86De40b75Dd703cD117eb92Fbc8536c");
  const [deliveryIndex, setDeliveryIndex] = useState(0);
  const [FirstName, setFirstName] = useState("Wesly");
  const [LastName, setLastName] = useState("Hsieh");
  const [Email, setEmail] = useState("covid@gmail.com");
  const [Phone, setPhone] = useState("0912345678");
  const [TravelOrNot, setTravelOrNot] = useState("None");
  const [otherSymptom, setotherSymptom] = useState("None");
  const [Contact, setContact] = useState("None");
  const [Symptom, setSymptom] = useState("None");
  const [Score, setScore] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState([]);
  const [clientLatitude, setLatitude] = useState(0);
  const [clientLongitude, setLongitude] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState([]);

  loader.load().then(() => {
    const latlng = { lat: 25.046891, lng: 121.516602 }; // 台北車站的經緯度

    const map = new google.maps.Map(document.getElementById("mapConfirmDelivery"), {
      center: { lat: clientLatitude, lng: clientLongitude },
      zoom: 12,
    });

    const marker = new google.maps.Marker({
      position: latlng,
      // animation: google.maps.Animation.BOUNCE,
      // label: 'restaurant',
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      map: map
  });
  });

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log("get position")
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      console.log( "Geolocation is not supported by this browser")
    }
  }

  const setPosition = (position) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    console.log("Latitude: " + clientLatitude)
    console.log("Longitude: " + clientLongitude)
  }

  const comfirmGeolocation = async() => {
    geolocation(realAdress, setConfirm);
}

  const getaccount = async () => {
    console.log(web3, contract)
    if(web3 !== null && contract !== null){
        const accountresult = await web3.eth.getAccounts(); // get accounts
        console.log("accountresult", accountresult);
        setClientAddr(accountresult[0]); // 第一個為 client
    }    
  }

  const getDelivery = async () => {
      if(web3 !== null && contract !== null){
        // get all delivery addres
        const deliveryList = await contract.methods.GetAllDeliver().call({from: clientAddr});
        console.log("deliveryList", deliveryList)
        const deliveryList_can_match = [];
        // find the deliveryMan isn't matched
        for (let i = 0; i < deliveryList.length; i++) {
          const deliveryMatch = await contract.methods.GetMatchedCustomer().call({from: deliveryList[i]})
          if ((deliveryMatch[0] === false)){
            deliveryList_can_match.push(deliveryList[i])
          }
        }
        setDeliveryInfo(deliveryList_can_match)
        console.log(deliveryList_can_match)
        // initial deliveryMan

        setDeliveryAddr(deliveryList_can_match[0])
        // test
        contract.methods.UploadHealthStatus("ethen", "tsao", "ss", "099", true, true, true, true).send({from: deliveryList[0]})
        contract.methods.UploadHealthStatus("ethe", "tso", "s", "99", true, true, true, true).send({from: deliveryList[1]})
        console.log("there are", deliveryList_can_match.length, "available delivery men")
      }else{
        console.log("web3 or contract is null");
      }

    }


  const setUpMatch = () => {
    contract.methods.MatchWithDeliver(deliveryAddr).send({from: clientAddr});
}

  const chooseNotDelivery = async () => {
    // deliveryIndex === 0 for initial
    console.log(deliveryIndex, "/", deliveryInfo.length)
    if(deliveryIndex < deliveryInfo.length) {
      // set delivery address
      setDeliveryAddr(deliveryInfo[deliveryIndex])
      console.log(deliveryAddr, "=", deliveryInfo[deliveryIndex])
      // get delivery health status
      const deliveryHealth = await contract.methods.GetHealthStatus(deliveryAddr).call({from: clientAddr})
      const deliveryHistory = await contract.methods.GetDeliverHistory(deliveryAddr).call({from: clientAddr})
      // console.log("deliveryHistory", deliveryHistory)
      var scores = []
      for(let i=0; i<deliveryHealth[8].length; i++){
        scores.push(parseInt(deliveryHealth[8][i]));
      }
      console.log(scores)
      console.log("deliveryHealth", deliveryHealth)
      // get delivery match status
      const deliveryMatch = await contract.methods.GetMatchedCustomer().call({from: deliveryAddr})
      console.log("deliveryMatch", deliveryMatch)
      setFirstName(deliveryHealth[0]);
      setLastName(deliveryHealth[1]);
      setEmail(deliveryHealth[2]);
      setPhone(deliveryHealth[3]);
      setTravelOrNot(deliveryHealth[4]);
      setotherSymptom(deliveryHealth[5]);
      setContact(deliveryHealth[6]);
      setSymptom(deliveryHealth[7]);
      setScore(deliveryHealth[8]);
    }
  }

  useEffect(() => { // 初始 render
    getLocation();
  }, [clientLatitude, clientLongitude]);

  useEffect(() => { // 初始 render
    getaccount();
  }, [web3, contract]);

  useEffect(() => { // 初始 render
    getDelivery();
    chooseNotDelivery();
    if (confirm === null ){
      comfirmGeolocation();
  }
  }, [web3, contract]);

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
            <div id="mapConfirmDelivery"></div>
            <br></br>
            <GridContainer justify="center">
            <Link to="/clientAction">
              <Button 
              size="sm" 
              color="success"
              // href="http://localhost:3000/clientAction"
              onClick ={()=> {
                setUpMatch();
              }}
              > Confirm my order </Button>
            </Link>
            &nbsp; 
            <Button 
            size="sm" 
            color="rose"
            onClick ={()=> {
              chooseNotDelivery();
              setDeliveryIndex(deliveryIndex + 1);
            }}
            > Change another delivery man </Button>
            &nbsp;
            <Link to="/order">
              <Button 
              size="sm"
              // href="http://localhost:3000/order"
              > Cancel my order </Button>
            </Link>
            </GridContainer>
            <br></br>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

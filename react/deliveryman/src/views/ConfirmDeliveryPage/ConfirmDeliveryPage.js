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
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(styles);

export default function ConfirmDeliveryPage(props) {
  const classes = useStyles();
  const {web3, contract, ...rest} = props;
  console.log(web3)
  console.log(contract)
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const [clientAddr, setClientAddr] = useState("0x5d3FCad0098AAA8821E934479A8fCC056F32c8D5");
  const [deliveryAddr, setDeliveryAddr] = useState("0x97D40c60E86De40b75Dd703cD117eb92Fbc8536c");
  const [FirstName, setFirstName] = useState("Wesly");
  const [LastName, setLastName] = useState("Hsieh");
  const [Email, setEmail] = useState("covid@gmail.com");
  const [Phone, setPhone] = useState("0912345678");
  const [TravelOrNot, setTravelOrNot] = useState("None");
  const [otherSymptom, setotherSymptom] = useState("None");
  const [Contact, setContact] = useState("None");
  const [Symptom, setSymptom] = useState("None");
  const [Score, setScore] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [clientLatitude, setLatitude] = useState(0);
  const [clientLongitude, setLongitude] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState([]);

//   useEffect(() => {
//     contract.methods.UploadOrder([1, 2, 3, 0, 1, 2], "No. 1, Sec. 4, Roosevelt Rd., Taipei", "0912345678", 120).send({from: clinet_test});
//     contract.methods.MatchWithDeliver(delivery_test).send({from: clinet_test});
// });

  loader.load().then(() => {
    const latlng = { lat: 25.046891, lng: 121.516602 }; // 台北車站的經緯度

    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: clientLatitude, lng: clientLongitude },
      zoom: 12,
    });

    const marker = new google.maps.Marker({
      position: latlng,
      // animation: google.maps.Animation.BOUNCE,
      // label: 'restaurant',
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      // http://maps.google.com/mapfiles/ms/icons/green-dot.png
      // http://maps.google.com/mapfiles/ms/icons/blue-dot.png
      // http://maps.google.com/mapfiles/ms/icons/red-dot.png
      // http://maps.google.com/mapfiles/ms/icons/yellow-dot.png
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

  const getDelivery = () => {
      let deleviryIndex = 0;
      while (deleviryIndex < deliveryInfo.length) {
        if ((deliveryInfo[deliveryIndex].matched == False)){
          // 判斷這個外送員沒有被 matched 且不在此顧客不願配對的名單內
          deliveryMan = deliveryInfo[deliveryIndex];
          setDeliveryAddr();
          setFirstName(deliveryMan.FirstName);
          setLastName(deliveryMan.LastName);
          setEmail(deliveryMan.Email);
          setPhone(deliveryMan.Phone);
          setTravelOrNot(deliveryMan.TravelOrNot);
          setotherSymptom(deliveryMan.otherSymptom);
          setContact(deliveryMan.Contact);
          setSymptom(deliveryMan.Symptom);
          setScore(deliveryMan.Score);
          break;
        }else{
          deleviryIndex += 1;
        }
      }
    }

  const getaccount = async () => {
      if(web3 !== null && contract !== null){
          const accountresult = await web3.eth.getAccounts(); // get accounts
          console.log(accountresult);
          setClientAddr(accountresult[0]);
          setDeliveryAddr(accountresult[1]);
          const deliveryList = await contract.methods.GetAllDeliver().call({from: clientAddr});
          setDeliveryInfo(deliveryList)
          console.log(deliveryInfo)
      }    
  }

  const setUpMatch = (deliveryAddr) => {
    contract.methods.MatchWithDeliver(deliveryAddr).send({from: clinetAddr});
}

  const chooseNotDelivery = (deliveryAddr) => {
    const deliveryList = deliveryInfo.filter(item => item !== deliveryAddr)
    setDeliveryInfo(deliveryList);
  }

  useEffect(() => { // 初始 render
    getLocation();
    getaccount();
    if (confirm === null ){
      comfirmGeolocation();
  }
  console.log(confirm);
  }, [clientLatitude, clientLongitude]);

  useEffect(() => {
    getDelivery();
  }, [chooseNotDelivery]);

  return (
    <div>
      {/* <div id="map"></div> */}
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
            <div id="map"></div>
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
              chooseNotDelivery.push(Phone);
              console.log(chooseNotDelivery);
              getDelivery();
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
          {/* <div id="map"></div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

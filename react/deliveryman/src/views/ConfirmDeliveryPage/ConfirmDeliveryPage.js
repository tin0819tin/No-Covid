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
  const [deliveryAddr, setDeliveryAddr] = useState("");
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

    var iconHome = {
      url: "https://imgur.com/Q2KsdLh.jpg", // url
      scaledSize: new google.maps.Size(30, 30), // size
  };

    var iconDanger = {
      url: 'https://imgur.com/CTZIgOo.jpg', // url
      scaledSize: new google.maps.Size(30, 30), // size
  };

    var iconSafe = {
      url: 'https://imgur.com/uRsoHo7.jpg',
      scaledSize: new google.maps.Size(30, 30), // size
  };

    var iconDelivery = {
      url: 'https://imgur.com/tYsXNec.jpg',
      scaledSize: new google.maps.Size(30, 30), // size
    };

    var iconRestaurant = {
      url: 'https://imgur.com/7Fjvw6D.jpg',
      scaledSize: new google.maps.Size(30, 30), // size
    };

    var marker = new google.maps.Marker({
      position: { lat: clientLatitude, lng: clientLongitude },
      icon: iconHome,
      map: map
  });

    var marker = new google.maps.Marker({
      position: latlng,
      icon: iconDanger,
      map: map
  });

  //   var marker = new google.maps.Marker({
  //     position: latlng,
  //     icon: iconSafe,
  //     map: map
  // });
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
        console.log("deliveryList_can_match", deliveryList_can_match)
        // test
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
      // console.log(deliveryAddr, "=", deliveryInfo[deliveryIndex])
      const deliveryAddrTemp = deliveryInfo[deliveryIndex]
      console.log("deliveryAddrTemp", deliveryAddrTemp)
      // // get delivery health status
      const deliveryHealth = await contract.methods.GetHealthStatus(deliveryAddrTemp).call({from: clientAddr})
      const deliveryHistory = await contract.methods.GetDeliverHistory(deliveryAddrTemp).call({from: clientAddr})
      var scores = []
      var scoresAvg = 0
      for(let i=0; i<deliveryHealth[8].length; i++){
        scores.push(parseInt(deliveryHealth[8][i]));
        scoresAvg += parseInt(deliveryHealth[8][i])
      }
      if(scores.length > 0){
        scoresAvg /= deliveryHealth[8].length
      }
      console.log("deliveryHealth", deliveryHealth)
      console.log("deliveryHistory", deliveryHistory)

      setDeliveryAddr(deliveryAddrTemp)
      setFirstName(deliveryHealth[0]);
      setLastName(deliveryHealth[1]);
      setEmail(deliveryHealth[2]);
      setPhone(deliveryHealth[3]);
      setTravelOrNot(deliveryHealth[4]);
      setotherSymptom(deliveryHealth[5]);
      setContact(deliveryHealth[6]);
      setSymptom(deliveryHealth[7]);
      setScore(scoresAvg);
      setDeliveryIndex(deliveryIndex + 1);
    }else{
      console.log(" no available delivery men")
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
    // chooseNotDelivery();
    if (confirm === null ){
      comfirmGeolocation();
  }
  }, [web3, contract]);

  useEffect(() => { // 初始 render
    if(deliveryInfo.length !== 0){
      // for the first delivery
      chooseNotDelivery();
    }
  }, [deliveryInfo]);

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
                    <img src={"https://img.88icon.com/download/jpg/20200902/7a76bdc81863c456fa4355fc9cd09b4f_512_512.jpg!88bg"} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{FirstName}</h3>
                    <h6>Delivery ID: {deliveryAddr}</h6>
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
            }}
            disabled={!(deliveryIndex < deliveryInfo.length)}
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
      <Button
      onClick={()=>{
        contract.methods.UploadHealthStatus("ethen", "tsao", "ss", "099", true, true, true, true).send({from: "0xC387D16bC14851DC14f707B08d567bFD633545B3"})
      }
      }></Button>
      {/* <Footer /> */}
    </div>
  );
}

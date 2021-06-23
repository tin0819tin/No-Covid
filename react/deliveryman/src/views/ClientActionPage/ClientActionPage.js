import React, {useState, useEffect, useRef, Component} from "react";
import '../view.css';
import 'ant-design-icons/dist/anticons.min.css'
import loader from "../../api/map";
import {Link} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import MyHeaderLinks from "components/Header/MyHeaderLink.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import {Form, Rate, Modal, Layout, Menu } from 'antd';

const {Content, Sider} = Layout;

import mapimage from "../../assets/img/map.jpg";
import styles from "assets/jss/material-kit-react/views/actionPage.js";

const useStyles = makeStyles(styles);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ActionPage(props) {
    const classes = useStyles();
    const {web3, contract, ...rest} = props;
    const [anchorElBottom, setAnchorElBottom] = useState(null);
    const [clientAddr, setClientAddr] = useState("");
    const [deliveryAddr, setDeliveryAddr] = useState("0x97D40c60E86De40b75Dd703cD117eb92Fbc8536c");
    const [orderName, setOrderName] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [realAddress, setRealAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);
    const [deliveryRate, setDeliveryRateRate] = useState(0);
    const [clientLatitude, setLatitude] = useState(0);
    const [clientLongitude, setLongitude] = useState(0);
    // const [deliveryLocation, setDeliveryLocation] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    loader.load().then(() => {
        const latlng = { lat: 25.046891, lng: 121.516602 }; // 台北車站的經緯度

        const map = new google.maps.Map(document.getElementById("mapClientAction"), {
          center: { lat: latlng.lat, lng: latlng.lng },
          zoom: 12,
        });

        var iconRestaurant = {
          url: "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/cafe-512.png", // url
          scaledSize: new google.maps.Size(30, 30), // size
      };
        var iconHome = {
          url: "https://i0.wp.com/cdn3.iconfinder.com/data/icons/pin-4/100/pin-512.png?resize=650,400", // url
          scaledSize: new google.maps.Size(40, 30), // size
      };
        var marker = new google.maps.Marker({
            position: latlng,
            icon: iconRestaurant,
            map: map
        });

        var marker = new google.maps.Marker({
            position: { lat: clientLatitude, lng: clientLongitude },
            icon: iconHome,
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
    
    const getCustomAddr = () => {
        const result = contract.methods.GetMatchedCutomer().send({from: '0x03787c28627DFE33BbC357029Ef9e28C9039e62A'})
        console.log(result);
    };

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

    const getDelivery = async () => {
      if(web3 !== null && contract !== null){
        // get all delivery addres
        const deliveryList = await contract.methods.GetAllDeliver().call({from: clientAddr});
        console.log("deliveryList", deliveryList)

        // find the deliveryMan isn't matched
        for (let i = 0; i < deliveryList.length; i++) {
          const deliveryMatch = await contract.methods.GetMatchedCustomer().call({from: deliveryList[i]})
          console.log(deliveryMatch)
          if ((deliveryMatch[1] === clientAddr)){
            setDeliveryAddr(deliveryMatch[1])
            break
          }
        }
      }else{
        console.log("web3 or contract is null");
      }
    }


    const sendDeliveryRate = () => {
      console.log(clientAddr, deliveryAddr, deliveryRate)
      contract.methods.OrderArrive().send({from: clientAddr})
      contract.methods.RateDeliver(deliveryAddr, deliveryRate).send({from: clientAddr})
      console.log(clientAddr, "send", deliveryAddr, deliveryRate, "stars")
    }

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      history.push("http://localhost:3000/order")
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    const formItemLayout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
      };

    const getaccount = async () => {
      console.log(web3, contract)
      if(web3 !== null && contract !== null){
          const accountresult = await web3.eth.getAccounts(); // get accounts
          console.log("accountresult", accountresult);
          
          setClientAddr(accountresult[0]); // 第一個為 client
          // console.log("deliveryAddr", deliveryAddr)
      }    
    }

    useEffect(() => { // 初始 render
      getaccount();
    }, );

    useEffect(() => { // 初始 render
      getDelivery();
    }, );

    useEffect(() => { // 初始 render
        getLocation();
      }, [clientLatitude, clientLongitude]);
    
    const orderlist = []
    const listOrder = orderlist.map((order) => {
        return (
            <div>
                <ListItem>
                    My order
                </ListItem>
                <ListItemText primary={order} />
            </div>
        );
    });

    return(
        <Layout>
        <br></br>
        <br></br>
        <Header
            absolute
            color= {anchorElBottom? "transparent" : "white"}
            brand="Your meal is coming..."
            fixed
            rightLinks={<MyHeaderLinks />}
            {...rest}
            />
        <Content style={{ margin: '0px 0px 0px' }}>
        <Button
            id="receiveMeal"
            onClick={() => {
                      showModal();
                  }}
                  color="info" 
                  size="sm"
                  >
                  Receive my meal
              </Button>
              <Modal 
              title="Rate the delivery man" 
              visible={isModalVisible} 
              onOk={handleOk} 
              onCancel={handleCancel}
              footer={[
                <Link to="/order">
                  <Button
                  // href="http://localhost:3000/order"
                  onClick={() => {
                    sendDeliveryRate()
                  }}
                  color="info" 
                  size="sm"
                  >
                  DONE
              </Button>
              </Link>
                ]}
              >
                  <Form
                      name="validate_other"
                      {...formItemLayout}
                      onFinish={onFinish}
                      initialValues={{
                      rate: 0,
                      }}
                  >
                  <Form.Item name="rate" label="Rate">
                      <Rate                                 
                      onChange={(value) => {
                        setDeliveryRateRate(value)
                          console.log(value)
                      }}/>
                  </Form.Item>
                  </Form>
              </Modal>
              <br></br>  
            <div id="mapClientAction"></div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}></Footer> */}
        </Layout>
    );
}
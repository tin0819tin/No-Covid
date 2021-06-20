import React, {useState, useEffect, useRef, Component} from "react";
import '../view.css';
import loader from "../../api/map";
import {Link} from "react-router-dom";
import faker from "faker";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Home from "@material-ui/icons/Home";
import Phone from "@material-ui/icons/Phone";
import Fastfood from "@material-ui/icons/Fastfood";
// core components
import Header from "components/Header/Header.js";
import MyHeaderLinks from "components/Header/MyHeaderLink.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import CustomRadio from "components/Radio/Radio";
import {Form, Rate, Modal, Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const {Content, Sider} = Layout;

import mapimage from "../../assets/img/map.jpg";
import styles from "assets/jss/material-kit-react/views/actionPage.js";

const useStyles = makeStyles(styles);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function ActionPage(props) {
    const classes = useStyles();
    const {contract, ...rest} = props;

    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [anchorElBottom, setAnchorElBottom] = useState(null);

    const [clientAddr, setClientAddr] = useState("0x5d3FCad0098AAA8821E934479A8fCC056F32c8D5");
    const [deliveryAddr, setDeliveryAddr] = useState("0x97D40c60E86De40b75Dd703cD117eb92Fbc8536c");
    const [customerAddr, setCustomerAddr] = useState("");
    const [orderName, setOrderName] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [realAddress, setRealAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);
    const [rate, setRate] = useState(0);
    const [clientLatitude, setLatitude] = useState(0);
    const [clientLongitude, setLongitude] = useState(0);
    const [deliveryLocation, setDeliveryLocation] = useState([]);

    loader.load().then(() => {
        const latlng = { lat: 25.046891, lng: 121.516602 }; // 台北車站的經緯度

        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: latlng.lat, lng: latlng.lng },
          zoom: 12,
        });

        var marker = new google.maps.Marker({
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

        var marker = new google.maps.Marker({
            position: { lat: clientLatitude, lng: clientLongitude },
            // animation: google.maps.Animation.BOUNCE,
            // label: 'restaurant',
            // icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            // http://maps.google.com/mapfiles/ms/icons/green-dot.png,
            // http://maps.google.com/mapfiles/ms/icons/blue-dot.png,
            // http://maps.google.com/mapfiles/ms/icons/red-dot.png,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
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

    const handleClose = (param) => {
        setAnchorEl(null);
        if (props && props.onClick) {
          props.onClick(param);
        }
      };

      const [isModalVisible, setIsModalVisible] = useState(false);

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

    setTimeout(function () {
        setCardAnimation("");
    }, 700);

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

    return(
        <Layout>
        <Sider
        breakpoint="lg"
        collapsedWidth="180"
        onBreakpoint={broken => {
            console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
        }}
        >   <div
                className={classes.pageHeader}
                style={{
                // backgroundImage: "url(" + mapimage + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                }}
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={8} md={4}>
                        <Button 
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
                                console.log()
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
                                'input-number': 3,
                                'checkbox-group': ['A', 'B'],
                                rate: 3.5,
                                }}
                            >
                            <Form.Item name="rate" label="Rate">
                                <Rate                                 
                                onChange={(value) => {
                                    setRate(value)
                                    console.log(value)
                                }}/>
                            </Form.Item>
                            </Form>
                        </Modal>                    
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        </Sider>
        <Layout>
        <br></br>
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
        <Content style={{ margin: '24px 16px 0' }}>
            <div id="map"></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
    </Layout>
    );
}
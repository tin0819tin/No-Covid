import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import faker from "faker";
import loader from 'api/map'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Popover from "@material-ui/core/Popover";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
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

import mapimage from "../../assets/img/map.jpg";
import styles from "assets/jss/material-kit-react/views/actionPage.js";
import { Keyboard } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function ActionPage(props) {
    const classes = useStyles();
    const {web3, contract, setrealAddress, ...rest} = props;

    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [anchorElBottom, setAnchorElBottom] = useState(null);
    const [account, setAccount] = useState("");

    const [customerAddr, setCustomerAddr] = useState("");
    const [orderName, setOrderName] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [realAddress, setRealAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);


    // customer side function
    const setUpMatch = () => {
        contract.methods.MatchWithDeliver('0xe4992dA2F485B5231961e5b687772534BE9b2b6D').send({from: account});
    }

    const setUpOrder = () => {
        contract.methods.UploadOrder([1, 2, 3, 0, 1, 2], "No. 1, Sec. 4, Roosevelt Rd., Taipei", "0912345678", 120).send({from: account});
    }

    useEffect(() => {
        getaccount();
        getCustomAddr();
        // loadmap();
        
    });

    const getaccount = async () => {
        if(web3 !== null){
            const accountresult = await web3.eth.getAccounts();
            console.log(accountresult);
            setAccount(accountresult[0]);
        }    
    }

    const loadmap = async() => {
        loader.load().then(() => {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: 25.0139736, lng: 121.5349967 },
                zoom: 18,
            });
        });
    };

    const getCustomAddr = async() => {
        if (contract !== null){
            const result = await contract.methods.GetMatchedCustomer().call({from: account});
        
            // console.log(result);
            if(result[0] === true){
                setCustomerAddr(result[1]);
                // console.log(result[1]);
            }
        }
        
    };

    const getDeliverDetail = async() => {
        if(customerAddr !== ""){
            const result1 = await contract.methods.GetOrderByAddress(customerAddr).call({from: account});
            const result2 = await contract.methods.GetProduct().call({from: account});
            
            // console.log(result1, result2);

            setOrderResult(result1[0].map( num =>  parseInt(num, 10) ));
            setRealAddress(result1[1]);
            setPhone(result1[2]);
            setTotal(result1[3]);
            setOrderName(Object.values(result2));

            // console.log(orderResult);
            // console.log(orderName);
            // console.log(realAddress, phone, total);
        }
    };

    // map instance
    


    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    

    const listOrder = orderName.map((order, key) => {
        if (orderResult[key] > 0){
            return ( 
                <ListItem key={key}>
                    <ListItemAvatar>
                    <Avatar>
                        {orderResult[key]}
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={order} />
                </ListItem>              
            );
        }
    });

    return(
        <div>
            <Header
                absolute
                color= {anchorElBottom? "transparent" : "white"}
                brand="Start delivery"
                rightLinks={<MyHeaderLinks />}
            {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                backgroundImage: "url(" + mapimage + ")",
                backgroundSize: "cover",
                backgroundPosition: "top center",
                }}
            >
            {/* <div id="map" style={{height:"100%", width:"100%"}}></div> */}
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={8} md={4}>
                        {/* <Button 
                            onClick={event => setUpMatch()}
                            color="primary" 
                            size="lg"
                            >
                            Match
                        </Button>  
                        <Button 
                            onClick={event => setUpOrder()}
                            color="primary" 
                            size="lg"
                            >
                            Order
                        </Button>  */}
                        <Button 
                            onClick={event => {setAnchorElBottom(event.currentTarget); getDeliverDetail();}}
                            color="info" 
                            size="lg"
                            >
                            Start Deliver
                        </Button>
                        <Popover
                            classes={{
                            paper: classes.popover
                            }}
                            open={Boolean(anchorElBottom)}
                            anchorEl={anchorElBottom}
                            onClose={() => setAnchorElBottom(null)}
                            anchorOrigin={{
                            vertical: "top",
                            horizontal: "left"
                            }}
                            transformOrigin={{
                            vertical: "top",
                            horizontal: "left"
                            }}
                        >
                            {/* <h3 className={classes.popoverHeader}>Popover on bottom</h3>
                            <div className={classes.popoverBody}>
                            Here will be some very useful information about his popover.
                            </div> */}
                            {/* <Card className={classes[cardAnimaton]} > */}
                                <CardBody className={classes.popoverHeader}>
                                    <ListSubheader>
                                    <h3>
                                        Delivery details
                                    </h3>
                                    </ListSubheader>
                                    <List className={classes.list}>
                                        <ListItem divider>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Person />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Customer" secondary="Mr. Ting" />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Home />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="address" secondary={realAddress} />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Phone />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="phone" secondary={phone} />
                                        </ListItem>
                                    </List>
                                </CardBody>
                                <CardBody className={classes.popoverHeader}>
                                    <ListSubheader>
                                    <h3>
                                        Order summary
                                    </h3>
                                    </ListSubheader>
                                    <List className={classes.list}>
                                        {/* <ListItem>
                                            <ListItemAvatar>
                                            <Avatar>
                                                {orderResult[0]}
                                                <Fastfood />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={orderName[0]} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Fastfood />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Smoothie" />
                                        </ListItem> */}
                                        {anchorElBottom? listOrder: null}
                                        {/* <Divider/> */}
                                        <ListItem>
                                            Total
                                            {/* <ListItemAvatar>
                                            <Avatar>
                                                <Fastfood />
                                            </Avatar>
                                            </ListItemAvatar> */}
                                            {/* <ListItemText primary="Total" /> */}
                                            <ListItemSecondaryAction>{total}TWD</ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Link to="/arrive">
                                        <Button 
                                        color="success" 
                                        size="lg"
                                        href="http://localhost:3000/arrive"
                                        onClick={() => {console.log(realAddress); setrealAddress(realAddress);}}
                                        >
                                        Delivered!
                                        </Button>
                                    </Link>
                                </CardFooter>
                            {/* </Card> */}
                        </Popover>
                        
                        </GridItem>
                    </GridContainer>
                </div>
            
            </div>

            
        </div>

    );
}
import React, {useState, useEffect, useRef} from "react";
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
import {Form, Rate, Modal} from 'antd';

import mapimage from "../../assets/img/map.jpg";
import styles from "assets/jss/material-kit-react/views/actionPage.js";

const useStyles = makeStyles(styles);

export default function ActionPage(props) {
    const classes = useStyles();
    const {contract, ...rest} = props;

    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [anchorElBottom, setAnchorElBottom] = useState(null);

    const [customerAddr, setCustomerAddr] = useState("");
    const [orderName, setOrderName] = useState([]);
    const [orderResult, setOrderResult] = useState([]);
    const [realAddress, setRealAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [total, setTotal] = useState(0);

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
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    
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
        <div>
            <Header
            absolute
            color= {anchorElBottom? "transparent" : "white"}
            brand="Your meal is coming..."
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
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={8} md={4}>
                        <Button 
                            onClick={() => {
                                showModal();
                            }}
                            color="info" 
                            size="lg"
                            >
                            Receive my meal
                        </Button>
                        <Modal title="Rate the delivery man" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
                                <Rate />
                            </Form.Item>
                            </Form>
                        </Modal>
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
                                    <h3>
                                        Delivery details
                                    </h3>
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
                                            <ListItemText primary="address" secondary="No. 1, Sec. 4, Roosevelt Rd., Taipei" />
                                        </ListItem>
                                        <ListItem divider>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Phone />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="phone" secondary="0987654321" />
                                        </ListItem>
                                    </List>
                                </CardBody>
                                <CardBody className={classes.popoverHeader}>
                                    <h3>
                                        Order summary
                                    </h3>
                                    <List className={classes.list}>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Fastfood />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Smoothie" />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                            <Avatar>
                                                <Fastfood />
                                            </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Smoothie" />
                                        </ListItem>
                                    </List>
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button 
                                    color="success" 
                                    size="lg"
                                    href="http://localhost:3000/arrive"
                                    onClick={() => console.log("Deliver!!")}
                                    >
                                    Delivered!
                                    </Button>
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
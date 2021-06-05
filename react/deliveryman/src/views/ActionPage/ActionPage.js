import React, {useState, useEffect, useRef} from "react";
import faker from "faker";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
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

const useStyles = makeStyles(styles);

export default function ActionPage(props) {
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    const [anchorElBottom, setAnchorElBottom] = useState(null);
    

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    
    const classes = useStyles();
    const {...rest} = props;

    return(
        <div>
            <Header
            absolute
            color="white"
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
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={8} md={4}>
                        <Button 
                            onClick={event => setAnchorElBottom(event.currentTarget)}
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
                            <h3 className={classes.popoverHeader}>Popover on bottom</h3>
                            <div className={classes.popoverBody}>
                            Here will be some very useful information about his popover.
                            </div>
                            {/* <Card className={classes[cardAnimaton]} > */}
                                <CardBody className={classes.popoverHeader}>
                                    <h3>
                                        Reserve for delivery Information Here!
                                    </h3>
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
                        
                        {/* <CustomDropdown
                            buttonText = "Gender"
                            buttonProps={{
                            color: "info"
                            }}
                            dropdownList={[
                            "Male",
                            "Female",
                            "Non-gender",
                            "Not willing to provide"
                            ]}
                      /> */}
                        
                        </GridItem>
                    </GridContainer>
                </div>
            </div>

            
        </div>

    );
}
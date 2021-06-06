import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import faker from "faker";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
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

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const radionref = useRef(null);


  //Form value
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [one, setOne] = useState(null)
  const [two, setTwo] = useState(null)
  const [three, setThree] = useState(null)
  const [four, setFour] = useState(null)


  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { contract, ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Health Check"
        rightLinks={<MyHeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + faker.image.imageUrl() + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]} >
                <form className={classes.form} >
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h3><strong>Register</strong></h3>
                    {/* <div className={classes.socialLine}>
                    </div> */}
                  </CardHeader>
                  <p className={classes.divider}>Keep yourself Safe</p>
                  <CardBody>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                      <CustomInput
                        labelText="First Name..."
                        id="first"
                        formControlProps={{
                          width: "40%",
                        }}
                        inputProps={{
                          type: "text",
                          required: true,
                          onChange: (event) => setFirstName(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Last Name..."
                        id="last"
                        formControlProps={{
                          width: "40%",
                        }}
                        inputProps={{
                          type: "text",
                          required: true,
                          onChange: (event) => setLastName(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    
                    {/* <div style={{display:"flex", justifyContent:"center"}}>
                      <CustomDropdown
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
                      />
                    </div> */}
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          width: "40%",
                        }}
                        inputProps={{
                          type: "email",
                          required: true,
                          onChange: (event) => setEmail(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Phone..."
                        id="phone"
                        formControlProps={{
                          width: "40%",
                        }}
                        inputProps={{
                          type: "phone",
                          required: true,
                          onChange: (event) => setPhone(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <h5>1. Do you travel to regions/countries affected by the outbreak of the novel coronavirus pneumonia (in the past 14 days)?</h5>
                    <CustomRadio 
                      // ref={radionref}
                      onChange={(newOne) => setOne(newOne)}
                    />
                    <h5>2. Do you receive people with fever or respiratory symptoms in the epidemic area (in the past 14 days)?</h5>
                    <CustomRadio 
                      onChange={(newTwo) => setTwo(newTwo)}
                    />
                    <h5>3. Have you been in contact with confirmed or suspected cases (in the past 14 days)?</h5>
                    <CustomRadio 
                      onChange={(newThree) => setThree(newThree)}
                    />
                    <h5>4. Do you have fever, cough, fatigue, difficulty breathing, vomiting, diarrhea and other symptoms?</h5>
                    <CustomRadio 
                      onChange={(newFour) => setFour(newFour)}
                    />
                    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to="/action">
                      <Button 
                        simple color="primary" 
                        size="lg"
                        // href="http://localhost:3000/action"
                        onClick={ () =>  contract.methods.UploadHealthStatus(firstName, lastName, email, phone, one, two, three, four).send({from: '0x33aAdA6626d9C3c3Ca6196E2F919Fbb67FCa93Aa'})}
                        // 
                        // console.log(contract)
                      >
                        Submit
                      </Button>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}

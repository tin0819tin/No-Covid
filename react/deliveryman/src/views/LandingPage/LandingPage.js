import faker from "faker";
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";



// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import MyHeaderLinks from "components/Header/MyHeaderLink.js";
import Parallax from "components/Parallax/Parallax.js";
import Info from "components/Typography/Info.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";
import SectionCarousel from "../Components/Sections/SectionCarousel"

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="white"
        routes={dashboardRoutes}
        brand="Welcome to No-Covid"
        rightLinks={<MyHeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 100,
          color: "transparent",
        }}
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
        <SectionCarousel/>
        {/* <Parallax filter image={faker.image.imageUrl()}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big bold
                  title, that{"'"}s why we added this text here. Add here all the
                  information that can make you or your product create the first
                  impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax> 
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            <WorkSection />
          </div>
        </div>*/}
        <div className={classes.section}> 
          <div className={classNames(classes.main, classes.mainRaised)}>
            <GridContainer className={classes.textCenter} justify="center">
              <GridItem xs={12} sm={12} md={8} style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <h2>Hi, we care about your delivery experience.</h2>
                <Info>
                  <h4><strong>
                    Please pick your identity
                  </strong></h4>
                </Info>
              </GridItem>
              <GridItem xs={12} sm={8} md={6} style={{display:"flex", justifyContent:"center"}}>
                <Button
                  color="primary"
                  size="lg"
                  href="http://localhost:3000/login"
                  // target="_blank"
                  round
                >
                  Delivery Man
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  href="https://www.creative-tim.com/product/material-kit?ref=mkr-download-section"
                  // target="_blank"
                  round
                >
                  Customer
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer style={{margintop:"30px"}} />
    </div>
  );
}

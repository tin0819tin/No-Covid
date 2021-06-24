import faker from "faker";
import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import {LocationOn, Favorite, InsertEmoticon, Grade} from "@material-ui/icons";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import safe from "assets/img/safe.jpg";
import care from "assets/img/care2.jpg";
import delicious from "assets/img/delicious.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={safe} alt="First slide" className="slick-image" height="520px" />
                  <div className="slick-caption">
                    <h3>
                      {/* <Favorite className="slick-icons" /> */}
                      Safe
                    </h3>
                  </div>
                </div>
                <div>
                  <img
                    src={care}
                    alt="Second slide"
                    className="slick-image"
                    height="520px"
                  />
                  <div className="slick-caption">
                    <h3>
                      {/* <Grade className="slick-icons" /> */}
                      Care
                    </h3>
                  </div>
                </div>
                <div>
                  <img src={delicious} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h3>
                      {/* <InsertEmoticon className="slick-icons" /> */}
                      Delicious
                    </h3>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

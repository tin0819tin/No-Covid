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

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";

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
                  <img src={faker.image.image()} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h3>
                      <Favorite className="slick-icons" />
                      Safe
                    </h3>
                  </div>
                </div>
                <div>
                  <img
                    src={faker.image.food()}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h3>
                      <InsertEmoticon className="slick-icons" />
                      Delicious
                    </h3>
                  </div>
                </div>
                <div>
                  <img src={faker.image.image()} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h3>
                      <Grade className="slick-icons" />
                      Secure
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

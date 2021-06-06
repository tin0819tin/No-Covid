import faker from "faker";
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import ImageUploading from 'react-images-uploading';
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
import FileUpload from "components/FileUpload/FileUpload"

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import SectionCarousel from "views/Components/Sections/SectionCarousel"

const dashboardRoutes = [];

const useStyles = makeStyles(styles);


export default function ArrivePage(props) {

    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const classes = useStyles();
    const { contract, ...rest } = props;
    return (
        <div>
            <Header
                color="white"
                routes={dashboardRoutes}
                brand="Complete the final step"
                rightLinks={<MyHeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 100,
                    color: "transparent",
                }}
                {...rest}
            />
            <div className={classes.section}>
                <FileUpload />
            </div>
            
            
            

            {/* <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    >
                    Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>Remove all images</button>
                    {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                        <img src={image['data_url']} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </ImageUploading> */}


        </div>
    );


}
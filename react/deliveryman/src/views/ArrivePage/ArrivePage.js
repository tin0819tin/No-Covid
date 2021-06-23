import faker from "faker";
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
import ImageUploading from 'react-images-uploading';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Google Map Geolocation
import {geolocation} from 'api/geolocation';

// IPFS Client
import {create} from 'ipfs-http-client';

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
const gridstyles = {
    grid: {
      position: "relative",
      width: "100%",
      minHeight: "1px",
      paddingRight: "0px",
      paddingLeft: "0px",
      flexBasis: "auto",
    },
  };

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(gridstyles);


export default function ArrivePage(props) {

    const [images, setImages] = useState([]);
    const [account, setAccount] = useState("");
    const maxNumber = 69;
    const [confirm, setConfirm] = useState(null);

    // const ipfsClient = require('ipfs-http-client');
    const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    
    // const onChange = (imageList, addUpdateIndex) => {
    //     // data for submit
    //     console.log(imageList, addUpdateIndex);
    //     setImages(imageList);
    // };

    useEffect(() => {
        getaccount();
        // if (confirm === null ){
        //     comfirmGeolocation();
        // }
        // console.log(confirm);
    });

    const getaccount = async () => {
        if(web3 !== null){
            const accountresult = await web3.eth.getAccounts();
            console.log(accountresult);
            setAccount(accountresult[0]);
        }    
    }

    const comfirmGeolocation = async() => {
        geolocation(realAdress, setConfirm);
    }

    const uploadDeliveryHistory = () => {
        // if(confirm === true){
        //     const result = await contract.methods.UploadDeliveryHistory(realAdress).send({from: account});
        // }
        contract.methods.UploadDeliveryHistory(realAdress).send({from: account});
    }

    const classes = useStyles();
    const classes_2 = useStyles2();
    const {web3, contract, realAdress, customerAddr, ...rest} = props;
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
                <FileUpload 
                    contract={contract} 
                    ipfs={ipfs}
                    account={account}
                    customerAddr={customerAddr}
                />
            </div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={1} className={classes_2.grid}>
                    <Button 
                        onClick={() => { console.log(realAdress); uploadDeliveryHistory();}}
                        color="success" 
                        size="lg"
                        >
                        Done
                    </Button>
                    <script></script>
                </GridItem>
                
            </GridContainer>
            
            
            
           

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
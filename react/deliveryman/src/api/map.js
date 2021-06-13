import axios from 'axios'
import { Loader } from "@googlemaps/js-api-loader"

require('dotenv').config({path: '/src'});

const loader = new Loader({
    apiKey: process.env.REACT_APP_API_KEY_1,
    version: "weekly"
});

export default loader;
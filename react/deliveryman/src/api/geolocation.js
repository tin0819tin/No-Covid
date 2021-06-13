import { Loader } from "@googlemaps/js-api-loader";
import {isPointWithinRadius} from 'geolib';
import loader from 'api/map'

const csv = require('jquery-csv');

export const geolocation = (address) => (loader.loadCallback(() => {

    const geocoder = new google.maps.Geocoder();
    // const data = csv.toObjects('/deliveryman/TaiwanCovid.csv');
    console.log(address);
    geocoder.geocode( {address: address}, (results, status) => {
        if (status === "OK"){
            console.log(results[0].geometry.location.lat());
            console.log(results[0].geometry.location.lng());
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            const result = isPointWithinRadius(
                { latitude: lat, longitude: lng },
                { latitude: 25.03634587, longitude: 121.4983155 },
                10000
            )
            console.log(result);
        }
        else{
            alert("Geocode was not successful for the following reason: " + status);
        }

    });

    })
)




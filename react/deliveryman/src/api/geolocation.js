import { Loader } from "@googlemaps/js-api-loader";
import {isPointWithinRadius} from 'geolib';
import loader from 'api/map';
import Papa from 'papaparse';


export const geolocation = (address, setConfirm) => (loader.loadCallback(() => {
    

    const geocoder = new google.maps.Geocoder();
    // const data = csv.toObjects('/deliveryman/TaiwanCovid.csv');
    console.log(address);
    geocoder.geocode( {address: address}, (results, status) => {
        if (status === "OK"){
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            console.log(lat, lng);
            
            const fetchcsv = () => {
                fetch("https://raw.githubusercontent.com/tin0819tin/No-Covid/master/Taiwan%20Covid.csv", {
                    mode: 'cors'
                }).then( response => response.text()
                ).then( csv => Papa.parse(csv, {
                    header: true,
                    complete: function(results){
                        // console.log("Parsing complete", results.data);
                        for (let data of results.data){
                            if (result(data["latitude"], data["longitude"])){
                                console.log(data["latitude"], data["longitude"]);
                                setConfirm(true);
                                break;
                            }
                        }
                    }
                }))
            }
            fetchcsv();

            const result = (loc_lat, loc_lng) => isPointWithinRadius(
                { latitude: lat, longitude: lng },
                { latitude: parseFloat(loc_lat), longitude: parseFloat(loc_lng) },
                10000
            )
            
        }
        else{
            alert("Geocode was not successful for the following reason: " + status);
        }

    });

    })
)
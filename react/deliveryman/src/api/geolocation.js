import { Loader } from "@googlemaps/js-api-loader";
import {isPointWithinRadius} from 'geolib';
import loader from 'api/map';
import Papa from 'papaparse';

export const geolocation = async (addressList, setConfirmList, setDeliveryLocationList) => (
    loader.loadCallback(() => {
    var deliveryLocationList = []
    var confirmList = []
    const geocoder = new google.maps.Geocoder();
    // const data = csv.toObjects('/deliveryman/TaiwanCovid.csv');
    if(addressList.length === 0){
        console.log("no location data")
        setDeliveryLocationList(deliveryLocationList)
        setConfirmList(confirmList)       
    }
    for(let i=0; i<addressList.length; i++){
        const address = addressList[i]
        console.log("delivery address", address);

        geocoder.geocode( {address: address}, (results, status) => {
            if (status === "OK"){
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                console.log("delivery location:", lat, lng);
                deliveryLocationList.push([lat, lng])
                const fetchcsv = () => {
                    fetch("https://raw.githubusercontent.com/tin0819tin/No-Covid/master/Taiwan%20Covid.csv", {
                        mode: 'cors'
                    }).then( response => response.text()
                    ).then( csv => Papa.parse(csv, {
                        header: true,
                        complete: async (results) => {
                            // console.log("Parsing complete", results.data);
                            var confirm = false
                            for (let data of results.data){
                                var confirmStatus = await result(data["latitude"], data["longitude"])
                                if (confirmStatus){
                                    console.log(data["latitude"], data["longitude"]);
                                    confirm = true;
                                    // return true
                                    break;
                                }
                            }
                            confirmList.push(confirm)
                            console.log("deliveryLocationList", deliveryLocationList, deliveryLocationList.length)
                            console.log("confirmList", confirmList, confirmList.length)
                            setDeliveryLocationList(deliveryLocationList)
                            setConfirmList(confirmList)
                        }
                    }))}

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
    })
    };
    })
)

export const geocode = (address, setLat, setLng) => (loader.loadCallback(() => {
    
    const geocoder = new google.maps.Geocoder();
    // const data = csv.toObjects('/deliveryman/TaiwanCovid.csv');
    console.log(address);
    geocoder.geocode( {address: address}, (results, status) => {
        if (status === "OK"){
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            console.log(lat, lng)
            setLat(lat);
            setLng(lng);
            }
        })
    })
)
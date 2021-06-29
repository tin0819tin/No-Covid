# Food No-Covid
<p align="center">
<img src="./react/deliveryman/src/assets/img/Food_NoCovid.JPG" width="400" />
<br>
<a target="_blank"><img href="https://www.trufflesuite.com/truffle" src="https://img.shields.io/badge/Truffle-%3E%3D5.1.10-brown.svg"></a>
<a target="_blank"><img href="https://www.trufflesuite.com/ganache" src="https://img.shields.io/badge/Ganache-download-yellow.svg"></a>
</p>

***
> :motor_scooter: An interesting decentralized app keeps track on deliveryman to keep customers safe from COVID-19.
***

## :checkered_flag: Getting start
**To learn more about this project please check this** [demo video](https://drive.google.com/drive/folders/1Fi8zdrgk-a7n5zhN43EWr_pR8y3mGjW0) and [slide](https://docs.google.com/presentation/d/1wc0fhlDLWS_E5UqvkS5xQBxlCQ4HZM_bQFfL4-1p2IY/edit#slide=id.p).

### Prerequisite
- Install [Ganache](https://www.trufflesuite.com/ganache) and [Truffle suite](https://www.trufflesuite.com/truffle) as local blockchain.
- Sign up in [Google Cloud](https://developers.google.com/maps/documentation/javascript/get-api-key) and get API key to enable Map Javascript API.
- Create an environment setting file `.env` under `react/deliveryman/src` and put the API key under it.
```shell
REACT_APP_API_KEY_1={Your_API_Key}
```

## :hammer_and_pick: Build from source 
First clone the project to local.
```shell
$ git clone https://github.com/tin0819tin/No-Covid.git
```

### Smart Contract

First open Ganache in your local or enable Ganache-cli.

Build the truffle contract.
```shell
$ truffle compile
```
Migrate the contract to Ganache.
```shell
$ truffle migrate
```

Then put the directory `build/contract` under `react/deliveryman/src`.

### Frontend Decentralized React App(Dapp)

Build the required package through npm
```shell
$ cd react/deliveryman
$ npm install
```

Start the Dapp
```shell
$ npm start
```

## :books: Usage
Pick your identity on the `Landing Page`.

**Delivery man**
1. Login and upload health status.
2. Wait for delivery match.
3. Start deliver!
4. Upload food image after delivered.

**Customer**
1. Start to order.
2. Confirm delivery man.
3. Wait for the meal.
4. Get the meal and rate the delivery man.


## :round_pushpin: Features
- [x] Store the health status of delivery man on Blockchain(Ganache).
- [x] Store the delivery details on Blockchain(Ganache).
- [x] Render the geolocation of delivery man, restaurant and customer using Google Map API.
- [x] Utilize IPFS to store images on IPFS node. 


 
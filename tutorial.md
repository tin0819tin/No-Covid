# ipfs 要在javascript上去呼叫，有以下幾個部分
## Code部分講解
基本流程為: deliver上傳image給ipfs，並將image hash上傳到blockchain，customer知道餐送到以後，利用自己的address上blockchain找到hash，並向ipfs拿取照片
1. Deliver
https://github.com/dappuniversity/decentragram/blob/master/src/components/App.js#L62
在該頁面的.js上面建立ipfs client
``` javascript
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // 連線到這個ipfs node
```
首先是對資料的處理
``` javascript
captureFile = event => {

    // 在這裡先將Page中上傳的資料(Image)利用FileReader()作處理
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    // 把file存到buffer當中
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }
```
接著是要把資料(image)上傳到ipfs，同時把image的hash值傳給blockchain
``` javascript
uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //我們利用ipfs.add把buffer中的資料上傳到ipfs
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      // 這裡到時候就呼叫contract中上傳image的function，result[0] 就是image，description是關於這張照片的論述，沒有的話就傳空字串
      this.state.Contract.methods.uploadImage(customer_addr, result[0].hash, description).send({ from: this.state.account })
      this.state.Contract.methods.FinishMatch(customer_addr, result[0].hash, description).send({ from: this.state.account })
    })
```
2. Customer
Customer需要 1. 利用GetImageHash()拿到 外送員傳上去的Hash 2.利用url取得照片
```javascript
if (the food has arrived){
    var Hash = web3.eth.Contract.method.GetImageHash().call()
}
```
``` HTML
<p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${hash就寫在這邊的啦}`} /></p>
// 注意看src當中的url形式
// 也可以用ipfs.get(hash)
```
## 實際使用部分
Reference: https://github.com/ipfs/js-ipfs/tree/master/packages/ipfs-http-client
1. 我們使用的ipfs是 ipfs http client，首先先下載
> npm install --save ipfs-http-client
2. 在javascript 創建一個 IPFS HTTP API Client
這個加在需要ipfs的page就好!
```javascript
// in your .js
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // Connect to this api address
```

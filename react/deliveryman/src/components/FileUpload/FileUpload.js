import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import Button from "components/CustomButtons/Button.js";

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [buffer, setBuffer] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");

  const {contract, ipfs, account, customerAddr} = props;

  const captureFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      console.log(Buffer(reader.result));
    }

  }

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("Submitting File to IPFS...");

    try {
      const postresponse =  await ipfs.add(buffer)
      console.log("postResponse", postresponse.path);
      setIpfsHash(postresponse.path);
      setUploadedFile({ fileName:filename });
      contract.methods.uploadImage(customerAddr, postresponse.path, filename).send({from: account});
    }
    catch(error){
      console.log(error);
      return;
    }

    // await ipfs.add(buffer, (error, result) => {
    //   if (error){
    //     console.log(error);
    //     return
    //   }
    //   console.log('IPFS result: ', result[0].hash);
    //   setIpfsHash(result[0].hash);
    //   setUploadedFile({ fileName:filename });
    // })

  }

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={uploadImage} style={{textAlign:"center"}}>
        <div className='custom-file mb-4' style={{width:"50%", marginTop:"10em"}}>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={captureFile}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress uploaded={uploadedFile.fileName} style={{}} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary mt-4'
          style={{width:"50%"}}
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;

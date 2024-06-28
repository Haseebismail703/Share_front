import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navi from '../compo/Navi';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

function Uploa() {
  const [lgShow, setLgShow] = useState(false);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState('');
  const [loader, setloader] = useState(false)
  const fileInputRef = useRef(null); // Ref for file input
  const [ip,setip] = useState('')
 

  const getFile = async() => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    setip(data.ip)
    setloader(true)
    fetch(`https://sharebackend-production.up.railway.app/api/file/${data.ip}`)
      .then((res) => res.json())
      .then((res) => setData(res.file))
      .catch((err) => console.log(err))
       setloader(false)
  };

  const fileUpload = async () => {
    setloader(true)
    if (!file) {
      alert('Please select a file to upload.');
      setloader(false)
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('ip', ip);

    try {
      const response = await fetch('https://sharebackend-production.up.railway.app/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      const responseData = await response.json();
      console.log('Upload successful:', responseData);
      getFile();
    } catch (error) {
      console.error('Error uploading file:', error);
    }


    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setloader(false)
  };

  const del = (item) => {
    try {
      setloader(true)
    fetch('https://sharebackend-production.up.railway.app/api/filedel', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(item)
    })
    getFile()
    setloader(false)
    } catch (error) {
      setloader(false)
      console.error('Error deleting file:', error.message)
    }
    
  }
 useEffect(() => {
    getFile()
  }, [del]);
  return (
    <div className='file'>
      <Navi />
      <center>
        <Form className='w-75 p-5'>
          <Button as={Link} to={'/'} variant="outline-success">Write Text</Button>
          <Button as={Link} to={'/upload'} variant="outline-primary" className='m-3'>Upload File</Button>
        </Form>

        <Form.Group controlId="formFile" className='w-75 p-5 mb-3 '>
          <Form.Label>select your file</Form.Label>
          <Form.Control type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={fileUpload} className='m-2' variant="primary">Save</Button>
        </Form.Group>
        {loader == true ? <div className='loader'></div> :
          <div className="row m-1">
            {data && data.map((item, index) => (
              <Card key={index} className="m-5 p-5" style={{ width: '20rem', height: 350 }}>
                {!item.url ?
                  <Card.Img variant="top" src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?cs=srgb&dl=pexels-mikebirdy-112460.jpg&fm=jpg" /> :
                  <Card.Img style={{ width: '15rem', height: 150 }} variant="top" src={item.url} />}
                <br />
                <Button onClick={() => {
                  setLgShow(true);
                  setImg(item.url);
                }} className='m-2' variant="outline-success">View</Button>
                <Button onClick={() => del(item)} className='m-2' variant="outline-danger">Delete</Button>
              </Card>
            ))}
          </div>
        }
      </center>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <Image style={{ width: 400, height: 'auto' }} src={img} fluid />
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Uploa;

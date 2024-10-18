import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navi from '../compo/Navi';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import url from '../api/api';
import ip from '../ip/ip.js';

function Uploa() {
  const [lgShow, setLgShow] = useState(false);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState('');
  const [loader, setloader] = useState(false);
  const fileInputRef = useRef(null); // Ref for file input
  const [ip, setip] = useState('');

  const getFile = async () => {
    setloader(true); // Start loader
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setip(data.ip);

      const fileResponse = await fetch(`${url}/api/file/${data.ip}`);
      const fileData = await fileResponse.json();
      setData(fileData.file);
    } catch (error) {
      console.error('Error fetching file:', error.message);
    } finally {
      setloader(false); // Stop loader
    }
  };

  const fileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('ip', ip);

    setloader(true); // Start loader
    try {
      const response = await fetch(`${url}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const responseData = await response.json();
      console.log('Upload successful:', responseData);
      getFile(); // Fetch updated file list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setloader(false); // Stop loader
    }
  };

  const del = async (item) => {
    setloader(true); // Start loader
    try {
      await fetch(`${url}/api/filedel`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(item),
      });

      getFile(); // Fetch updated file list after deletion
    } catch (error) {
      console.error('Error deleting file:', error.message);
    } finally {
      setloader(false); // Stop loader
    }
  };

  useEffect(() => {
    getFile(); // Fetch files when component mounts
  }, []);

  return (
    <div className="file">
      <Navi />

      <div className="container my-5">
        {/* Action Buttons */}
        <div className="text-center">
          <Form className="d-flex justify-content-center mb-4">
            <Button as={Link} to={'/'} variant="outline-success" className="me-3">
              Write Text
            </Button>
            <Button as={Link} to={'/upload'} variant="outline-primary">
              Upload File
            </Button>
          </Form>

          {/* File Upload Section */}
          <Form.Group controlId="formFile" className="w-50 mx-auto mb-4">
            <Form.Label className="fw-bold">Select Your File</Form.Label>
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-3"
            />
            <Button onClick={fileUpload} variant="primary">
              Save
            </Button>
          </Form.Group>
        </div>

        {/* Loader or Uploaded Data */}
        {loader ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            {data && data.map((item, index) => (
              <div key={index} className="col-md-4 col-lg-3 mb-4">
                <Card className="shadow-sm h-100 text-center">
                  <Card.Img
                    variant="top"
                    src={item.url || 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg'}
                    style={{ height: '150px', objectFit: 'cover' }}
                    className="rounded"
                  />
                  <Card.Body>
                    <Button
                      onClick={() => {
                        setLgShow(true);
                        setImg(item.url);
                      }}
                      variant="outline-success"
                      className="me-2"
                    >
                      View
                    </Button>
                    <Button onClick={() => del(item)} variant="outline-danger">
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Preview */}
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
              <Image style={{ width: '100%', maxWidth: 600, height: 'auto' }} src={img} fluid />
            </center>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Uploa;

import React, { useEffect, useState } from 'react';
import Navi from './compo/Navi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css';
import url from './api/api';
import { Post, edit } from '../post/post';
import axios from 'axios';

function App() {
  const [tex, settex] = useState('');
  const [ip, setip] = useState('');
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const [see, setsee] = useState('');
  const [hedit, sethedit] = useState('');
  const [edittex, setedittex] = useState('');
  const [loader, setloader] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setsee(item.text);
  };

  // Edit Modal State
  const [sho, setS] = useState(false);
  const handleC = () => setS(false);
  const handleS = (item) => {
    setS(true);
    sethedit(item);
  };

  async function fun() {
    setloader(true); // Start loader
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setip(data.ip);

      const res = await fetch(`${url}/api/usertext/${data.ip}`);
      const result = await res.json();
      setdata(result.text);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setloader(false); // Ensure loader stops
    }
  }

  const text = async () => {
    setloader(true); // Start loader
    try {
      await Post(`${url}/api/text`, { text: tex, ip: ip });
      settex('');
      await fun();
    } catch (error) {
      console.error('Error saving text:', error);
    } finally {
      setloader(false); // Ensure loader stops
    }
  };

  const edittext = async () => {
    setloader(true); // Start loader
    try {
      await edit(`${url}/api/uptext`, { id: hedit._id, text: edittex });
      await fun();
      setS(false);
    } catch (error) {
      console.error('Error editing text:', error);
    } finally {
      setloader(false); // Ensure loader stops
    }
  };

  const delet = async (item) => {
    setloader(true); 
    // console.log(item);
   
    try {
       let res = await axios.post(`${url}/api/usertext/del`,{
      _id: item
    })
    if(res.data) {
      // console.log(res.data);
      
      setloader(false); 
      await fun();
    }
      // await fetch(`${url}/api/usertext/del`, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   method: 'POST',
      //   body: JSON.stringify({ _id: item }),
      // });
      await fun();
    } catch (error) {
      console.error('Error deleting text:', error);
    } 
  };

  useEffect(() => {
    fun();
  }, []);

  return (
    <div>
      <Navi />
      <div className="container my-5">
        {/* Input Section */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Form className="border rounded p-4 shadow-sm bg-light">
              <div className="text-center mb-4">
                <Button variant="outline-success" className="me-3">Write Text</Button>
                <Button as={Link} to={'/upload'} variant="outline-primary">
                  Upload File
                </Button>
              </div>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="fw-bold">Type Something</Form.Label>
                <Form.Control
                  value={tex}
                  onChange={(e) => settex(e.target.value)}
                  as="textarea"
                  rows={6}
                  className="border-info"
                  placeholder="Write your text here..."
                />
              </Form.Group>
            </Form>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center my-4">
          <Button onClick={text} variant="primary" size="lg" className="px-5">
            Save
          </Button>
        </div>

        {/* Data Cards Section */}
        <div className="text-center">
          {loader ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="row justify-content-center">
              {data.length === 0 ? (
                <h3>No data available</h3>
              ) : (
                data.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <Card className="shadow-sm h-100">
                      <Card.Body>
                        <h6 className="text-muted">{index + 1}: {item.text?.slice(0, 8)} {'==>'}</h6>
                        <Button
                          variant="outline-success"
                          onClick={() => handleShow(item)}
                        >
                          View
                        </Button>
                        <div className="d-flex justify-content-between mt-4">
                          <Button
                            onClick={() => handleS(item)}
                            variant="info"
                            style={{ width: '45%' }}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => delet(item._id)}
                            variant="outline-danger"
                            style={{ width: '45%' }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Preview Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>{see}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={sho} onHide={handleC}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Your Text</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label className="fw-bold">Edit Textarea</Form.Label>
                <Form.Control
                  onChange={(e) => setedittex(e.target.value)}
                  as="textarea"
                  rows={6}
                  defaultValue={hedit.text}
                  className="border-info"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleC}>
              Close
            </Button>
            <Button variant="primary" onClick={edittext}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;

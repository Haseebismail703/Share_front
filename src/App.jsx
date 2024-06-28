import React from 'react'
import Navi from './compo/Navi'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post, edit } from '../post/post';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import '../style/style.css'
function App() {
  const [tex, settex] = useState('')
  const [ip, setip] = useState('');
  const [data, setdata] = useState([])
  const [show, setShow] = useState(false);
  const [see, setsee] = useState('')
  const [hedit, sethedit] = useState('')
  const [edittex, setedittex] = useState('')
  const [loader, setloader] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = (item) => {
    setShow(true)
    setsee(item.text)
  }
  // edit 
  const [sho, setS] = useState(false);
  const handleC = () => setS(false);
  const handleS = (item) => {
    
    setS(true)
    sethedit(item)
  }

 async function fun() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  setip(data.ip)
  setloader(true)

    fetch(`https://sharebackend-production.up.railway.app/api/usertext/${data.ip}`)
      .then((res) => res.json())
      .then((res) => setdata(res.text))
      .catch((err) => console.log(err))
      setloader(false) 
      
  }

 



  let text = async () => {
    setloader(true)
    Post('https://sharebackend-production.up.railway.app/api/text', { text : tex ,ip : ip})
    // console.log(tex, ip)
    fun()
    settex('')
    setloader(false)
    // console.log(tex)
  }
  
  let edittext = async () => {
    
    // console.log(edittex)
    setloader(true)
    edit('https://sharebackend-production.up.railway.app/api/uptext',{ id : hedit._id , text : edittex  } )
    fun()
    setS(false);
    setloader(false)
  }

  let delet = (item) => {
    setloader(true)
    fetch('https://sharebackend-production.up.railway.app/api/usertext/del',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ _id: item })
      })
    fun()
    setloader(false)
  }
  useEffect(() => {
    fun()
   
  }, [])

  return (
    <div >
      <Navi />
      <center>
        <Form className='w-75 p-5 mb-5 '>
          <Button variant="outline-success">Write Text</Button>
          <Button as={Link} to={'/upload'} variant="outline-primary" className='m-3'>Upload File</Button>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Type somthing</Form.Label>
            <Form.Control value={tex} onChange={(e) => { settex(e.target.value) }} as="textarea" rows={10} />
          </Form.Group>

        </Form>
        <div className="m-5">
          <Button onClick={text} variant="primary" size="lg">
            Save
          </Button>
        </div>
        <div>
        {loader == true ?<div className='loader'></div>:   
          <div className="row m-5">
            {data.length == 0 ? <h1>No data available</h1> : data.map((item, index) => (
              <Card key={index} className="m-4 p-4 appbody" style={{ width: '20rem', height: 200 }}>
                <h6>{item.text.slice(0, 8)} {'==>'}</h6>
                <Button variant="outline-success" onClick={() => handleShow(item)}>View</Button><br />

                <div className='row m-4 gap-2'  >
                  <Button onClick={() => handleS(item)} variant="info" style={{ width: 100, marginLeft: 10 }} >Edit</Button>
                  <Button onClick={() => delet(item._id)} variant="outline-danger" style={{ width: 100 }} >Delete</Button>
                </div>

              </Card>
            ))}

          </div>
           } 
        </div>


      </center>
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

      {/* edit  */}
      <Modal show={sho} onHide={handleC}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your'r text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Textarea</Form.Label>
              <Form.Control onChange={(e) => { setedittex(e.target.value) }} as="textarea" rows={10} defaultValue={hedit.text} />
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
  )
}

export default App
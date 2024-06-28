import React from 'react'
import Navi from '../compo/Navi'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
function Intro() {
  return (
    <div >
      <Navi />

      <div className="row m-1">
        <center>
          <h1 className=" m-3 " >How its work</h1><br />
          <p> ForShare  is easy solution to share files, text and links within the same Wi-Fi Network.</p>
        <hr />
        </center>


        <Card className="m-5 p-5" style={{ width: '20rem', height: 350 }}>
          <center>
            <Card.Img style={{ width: 200, height: 150 }} variant="top" src="https://img.freepik.com/premium-vector/wifi-router-network-concept-isometric-3d-wireless-connection-various-devices-phone-tablet-laptop-pc-smartwatch-vector-illustration_461812-1800.jpg" />
            <br />
            <br />
            <h4>Connect all your devices to the same Wi-Fi network</h4>
          </center>
        </Card>

        <Card className="m-5 p-5" style={{ width: '20rem', height: 350 }}>
          <center>
            <Card.Img style={{ width: '13rem', height: 140 }} variant="top" src="https://img.freepik.com/free-photo/white-cloud-with-download-icon-cloud-computing-technology-sign-symbol-3d-rendering_56104-1285.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1717891200&semt=ais_user" />
            <br />
            <br />
            <h4>Upload to ForShare anything you want</h4>
          </center>
        </Card>

        <Card className="m-5 p-5" style={{ width: '20rem', height: 350 }}>
          <center>
            <Card.Img style={{ width: '13rem', height: 140 }} variant="top" src="https://img.freepik.com/free-vector/flat-customer-service-week-illustration_23-2149670579.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=ais" />
            <br />
            <br />
            <h4>View and manage from any devices *</h4>
          </center>
        </Card>

       
        {/* <center><p>* your content is automatically deleted
          after 1 houre  since last access</p></center> */}
        <hr />
      </div>

    </div>
  )
}

export default Intro
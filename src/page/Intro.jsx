import React from 'react';
import Navi from '../compo/Navi';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

function Intro() {
  // Array of card content
  const cardData = [
    {
      imgSrc: "https://img.freepik.com/premium-vector/wifi-router-network-concept-isometric-3d-wireless-connection-various-devices-phone-tablet-laptop-pc-smartwatch-vector-illustration_461812-1800.jpg",
      title: "Connect all your devices to the same Wi-Fi network",
      imgWidth: '100%'
    },
    {
      imgSrc: "https://img.freepik.com/free-photo/white-cloud-with-download-icon-cloud-computing-technology-sign-symbol-3d-rendering_56104-1285.jpg?size=626&ext=jpg&ga=GA1.1.2116175301.1717891200&semt=ais_user",
      title: "Upload to Share for you anything you want",
      imgWidth: '100%'
    },
    {
      imgSrc: "https://img.freepik.com/free-vector/flat-customer-service-week-illustration_23-2149670579.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1711756800&semt=ais",
      title: "View and manage from any device",
      imgWidth: '100%'
    }
  ];

  return (
    <div>
      <Navi />

      <Container className="text-center mt-5">
        <h1 className="mb-4 display-5">How it Works</h1>
        <p className="lead mb-5">Share for you is an easy solution to share files, text, and links within the same Wi-Fi Network.</p>
        <hr />

        <Row className="g-4">
          {/* Mapping through cardData to generate cards */}
          {cardData.map((item, index) => (
            <Col key={index} xs={12} md={4}>
              <Card className="h-100 p-3 shadow-sm">
                <div className="d-flex justify-content-center">
                  {/* Center the image using Bootstrap's utility classes */}
                  <Card.Img variant="top" src={item.imgSrc} style={{ width: item.imgWidth, height: 200 }} className="img-fluid" />
                </div>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <hr className="my-5" />
        <p className="text-muted">* Your content is automatically deleted after 1 hour since last access.</p>
      </Container>
    </div>
  );
}

export default Intro;

import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-center mt-5'>
        <Col md={12} lg={10}>
          <Card style={{ height: "80vh" }}>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;

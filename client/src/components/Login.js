import React, { useState, useRef } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

import { v4 as uuidV4 } from "uuid";

const Login = (props) => {
  const idRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    props.onSubmit(idRef.current.value);
  };

  const newId = () => {
    props.onSubmit(uuidV4());
  };

  return (
    <>
      <h3 className='text-center mt-5'>Login</h3>
      <Row className='justify-content-center'>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='id' className='mb-3'>
                  <Form.Label>Enter id</Form.Label>
                  <Form.Control ref={idRef} type='text'></Form.Control>
                </Form.Group>
                <Button type='submit'>Login</Button>
                <Button onClick={newId} className='ms-2'>
                  Create new id
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;

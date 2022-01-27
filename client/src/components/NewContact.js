import React, { useRef } from "react";
import { useContacts } from "../context/ContactsProvider";

import { Button, Form, Modal } from "react-bootstrap";

const NewContact = ({ closeModal }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();

  const onSubmit = (e) => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header>Add new contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='id' className='mb-3'>
            <Form.Label>Id</Form.Label>
            <Form.Control ref={idRef} type='text' required />
          </Form.Group>
          <Form.Group controlId='name' className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type='text' required />
          </Form.Group>
          <Button variant='success' type='submit'>
            Add
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewContact;

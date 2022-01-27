import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConvos } from "../context/ConvoProvider";

const NewConversation = ({ closeModal }) => {
  const { contacts } = useContacts();
  const { createConvo } = useConvos();
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleChange = (id) => {
    setSelectedContacts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createConvo(selectedContacts);
    closeModal();
  };

  return (
    <>
      <Modal.Header>Add new contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((el) => (
            <Form.Group key={el.id} controlId='id' className='mb-2'>
              <Form.Check
                label={el.name}
                value={selectedContacts.includes(el.id)}
                type='checkbox'
                id={el.id}
                onChange={() => {
                  handleChange(el.id);
                }}
              />
            </Form.Group>
          ))}
          <Button type='submit' variant='info'>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversation;

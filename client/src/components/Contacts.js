import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <>
      <ListGroup variant='flush'>
        {contacts.map((el) => (
          <ListGroup.Item action key={el.id}>
            {el.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Contacts;

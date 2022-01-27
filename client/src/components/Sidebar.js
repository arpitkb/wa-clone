import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import NewConversation from "./NewConversation";
import NewContact from "./NewContact";

const CONVO_KEY = "convo";
const CONTACT_KEY = "contacts";

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVO_KEY);
  const [modalVisible, setModalVisible] = useState(false);
  const convoOpen = activeKey === CONVO_KEY;

  return (
    <>
      <div style={{ height: "72vh" }} className='d-flex flex-column'>
        <Tab.Container onSelect={setActiveKey} activeKey={activeKey}>
          <Nav variant='tabs'>
            <Nav.Item>
              <Nav.Link eventKey={CONVO_KEY}>Conversation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content className='overflow-auto border-end flex-grow-1'>
            <Tab.Pane eventKey={CONVO_KEY}>
              <Conversation />
            </Tab.Pane>
            <Tab.Pane eventKey={CONTACT_KEY}>
              <Contacts />
            </Tab.Pane>
          </Tab.Content>
          <Button onClick={() => setModalVisible(true)}>
            New {convoOpen ? "Conversation" : "Contact"}
          </Button>
        </Tab.Container>
      </div>

      <div className='text-info text-small mb-0 mt-2'>
        Id: <em className=''>{id}</em>
      </div>

      <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
        {convoOpen ? (
          <NewConversation closeModal={() => setModalVisible(false)} />
        ) : (
          <NewContact closeModal={() => setModalVisible(false)} />
        )}
      </Modal>
    </>
  );
};

export default Sidebar;

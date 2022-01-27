import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConvos } from "../context/ConvoProvider";

const Conversation = () => {
  const { convos, selectConvoIndex, selectedConvo } = useConvos();

  return (
    <>
      <ListGroup variant='flush'>
        {convos.map((el, idx) => (
          <ListGroup.Item
            action
            active={el.selected}
            onClick={() => {
              selectConvoIndex(idx);
            }}
            key={idx}
          >
            {el.recipients.map((el) => el.name).join(", ")}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Conversation;

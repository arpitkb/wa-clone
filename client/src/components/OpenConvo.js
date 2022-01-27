import React, { useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useConvos } from "../context/ConvoProvider";

const OpenConvo = () => {
  const [text, setText] = useState("");

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  });
  const { sendMessage, selectedConvo } = useConvos();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(text);

    sendMessage(
      selectedConvo.recipients.map((el) => el.id),
      text
    );

    setText("");
  };

  return (
    <div style={{ height: "72vh" }} className='d-flex flex-column flex-grow-1'>
      <div className='flex-grow-1 overflow-auto'>
        <div className='d-flex flex-column align-items-start justify-content-end'>
          {selectedConvo.messages.map((el, idx) => {
            const lastMessage = selectedConvo.messages.length - 1 === idx;
            return (
              <div
                key={idx}
                ref={lastMessage ? setRef : null}
                className={`d-flex me-2 mb-2 flex-column ${
                  el.fromMe ? "align-self-end" : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    el.fromMe ? "bg-info text-white" : "border"
                  }`}
                >
                  {el.text}
                </div>
                <div
                  className={`text-muted small ${el.fromMe ? "ms-auto" : ""}`}
                >
                  <em>{el.fromMe ? "You" : el.senderName}</em>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <Form.Control
            onChange={(e) => setText(e.target.value)}
            value={text}
            type='text'
          />
          <Button type='submit'>send</Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default OpenConvo;

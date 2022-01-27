import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConvosContext = React.createContext();

export const useConvos = () => {
  return useContext(ConvosContext);
};

export const ConvoProvider = ({ children, id }) => {
  const [convos, setConvos] = useLocalStorage("convos", []);
  const [selectedConvo, setSelectedConvo] = useState(-1);
  const { contacts } = useContacts();
  const socket = useSocket();

  const createConvo = (recipients) => {
    setConvos((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };

  const equalArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    arr1.sort();
    arr2.sort();
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const addMessageToRecipients = useCallback(
    ({ recipients, text, sender }) => {
      setConvos((prev) => {
        let present = false;
        const newMessage = { text, sender };

        const newConvos = prev.map((el) => {
          if (equalArray(el.recipients, recipients)) {
            present = true;
            return { ...el, messages: [...el.messages, newMessage] };
          } else {
            return el;
          }
        });

        if (present) {
          return newConvos;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConvos]
  );
  useEffect(() => {
    if (!socket) return;

    socket.on("recieve-message", addMessageToRecipients);

    return () => socket.off("recieve-message");
  }, [socket, addMessageToRecipients]);

  const sendMessage = (recipients, text) => {
    socket.emit("send-message", { recipients, text });
    addMessageToRecipients({ recipients, text, sender: id });
  };

  const formattedConvos = convos.map((convo, index) => {
    const recipients = convo.recipients.map((el) => {
      const contact = contacts.find((c) => c.id === el);
      const name = (contact && contact.name) || el;
      return { id: el, name };
    });

    const selected = index === selectedConvo;

    const messages = convo.messages.map((mssg) => {
      const contact = contacts.find((c) => c.id === mssg.sender);
      const name = (contact && contact.name) || mssg.sender;
      const fromMe = id === mssg.sender;
      return { ...mssg, senderName: name, fromMe };
    });

    return { ...convo, recipients, selected, messages };
  });

  const value = {
    convos: formattedConvos,
    createConvo,
    selectConvoIndex: setSelectedConvo,
    selectedConvo: formattedConvos[selectedConvo],
    sendMessage,
  };

  return (
    <ConvosContext.Provider value={value}>{children}</ConvosContext.Provider>
  );
};

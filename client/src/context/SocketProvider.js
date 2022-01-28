import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io("/", {
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

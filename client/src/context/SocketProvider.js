import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io(
      process.env.NODE_ENV === "production"
        ? window.location.href
        : "http://localhost:5000",
      {
        query: { id },
      }
    );

    setSocket(newSocket);

    // return () => newSocket.close();
  }, [id, setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

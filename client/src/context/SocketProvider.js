import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io(
      `https://${window.location.hostname}:${process.env.PORT || 5000}`,
      {
        query: { id },
      }
    );

    setSocket(newSocket);

    return () => newSocket.close();
  }, [id, setSocket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

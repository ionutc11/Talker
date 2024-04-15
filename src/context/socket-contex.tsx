import React, { createContext, PropsWithChildren } from "react";
import io from "socket.io-client";

const messageSocketHost = `http://localhost:4000`;

const messageSocket = io(messageSocketHost, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any>({
  messageSocket,
});

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <SocketContext.Provider value={{ messageSocket }}>
    {children}
  </SocketContext.Provider>
);

import { ReactNode, useContext } from "react";
import { UserDetailsContext } from "../context/user-context";
import { Navigate } from "react-router-dom";
import { SocketContext } from "../context/socket-contex";
import { MessageServerConstants } from "../constants";
import { MessagesProvider } from "../context/message-context";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useContext(UserDetailsContext);
  const { messageSocket } = useContext(SocketContext);

  if (!user?.username) {
    return <Navigate to={"/"} />;
  } else {
    if (!messageSocket.connected) {
      try {
        const res = messageSocket.connect();
        console.log("CONNECTING TO SOCKET", res);
      } catch (e) {
        console.log("ERROR CONNECTING");
      }
      messageSocket.emit(MessageServerConstants.IDENTIFY, {
        username: user.username,
      });
    }
  }

  return <MessagesProvider>{children}</MessagesProvider>;
};

export default ProtectedRoute;

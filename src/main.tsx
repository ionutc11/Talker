import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/index.tsx";
import { ThemeProvider } from "styled-components";
import { UserProvider } from "./context/user-context.tsx";
import { SocketProvider } from "./context/socket-contex.tsx";

const theme = {
  colors: {
    gray: "#E4E4E4",
    darkGray: "#C4C4C4",
    black: "#000000",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <RouterProvider router={routes} />
        </UserProvider>
      </ThemeProvider>
    </SocketProvider>
  </React.StrictMode>
);

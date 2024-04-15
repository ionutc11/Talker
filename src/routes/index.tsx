import { createBrowserRouter } from "react-router-dom";
import LogInPage from "../pages/LogInPage/LogInPage";
import Chat from "../pages/ChatPage/Chat";
import ProtectedRoute from "./ProtectedRoute";

const routes = createBrowserRouter([
  { path: "/", element: <LogInPage /> },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);

export default routes;

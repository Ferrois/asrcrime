import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./Layouts/AuthLayout";
import Root from "./Pages/Root/Root";
import Home from "./Pages/Root/Home";
import Score from "./Pages/Score";
import Admin from "./Pages/Admin";
import Interface from "./Pages/Interface";
import Clues from "./Pages/Clues";
import Fun from "./Pages/Fun";
import Info from "./Pages/Info";
import Chat from "./Pages/Chat";
import Venues from "./Pages/Venues";
import AdminView from "./Pages/AdminView";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Root /> },
      { path: "/home", element: <Home /> },
      { path: "/score", element: <Score /> },
      { path: "/clue", element: <Clues /> },
      { path: "/admin", element: <Admin /> },
      { path: "/interface", element: <Interface /> },
      { path: "/info", element: <Info /> },
      { path: "/fun", element: <Fun /> },
      { path: "/chat", element: <Chat /> },
      { path: "/venues", element: <Venues /> },
      { path: "/adminview", element: <AdminView /> },

    ],
  },
]);

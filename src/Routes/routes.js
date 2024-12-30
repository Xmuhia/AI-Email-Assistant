import React from "react";
import { Navigate } from "react-router-dom";

// Import E-mail
import Inbox from "../Pages/E-mail/Inbox";
import ReadEmail from "../Pages/E-mail/ReadEmail";
import EmailCompose from "../Pages/E-mail/EmailCompose";

// Authentication
import Login from "../Pages/Authentication/Login";
import Logout from "../Pages/Authentication/Logout";

const authProtectedRoutes = [
  // E-mail
  { path: "/inbox", component: <Inbox /> },
  { path: "/read-email", component: <ReadEmail /> },
  { path: "/compose-email", component: <EmailCompose /> },

  // Default route
  {
    path: "/",
    exact: true,
    component: <Navigate to="/inbox" />, // Changed default route to inbox
  },
];

const publicRoutes = [
  // Authentication
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
];

export { authProtectedRoutes, publicRoutes };
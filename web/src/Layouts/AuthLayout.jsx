import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";

function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export { AuthLayout };

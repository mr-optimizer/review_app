import React from "react";
import { AuthProvider } from "./AuthProvider";
import { NotificationProvider } from "./NotificationProvider";
import { ThemeProvider } from "./ThemeProvider";

export const ContextProvider = ({ children }) => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

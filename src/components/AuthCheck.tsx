import React from "react";
import { Route, Routes } from "react-router";
import { useAuthContext } from "../providers/useContexts";
import { Layout } from "../layout/Layout";
import { HomePage } from "../Pages/HomePage";
import { ProfilePage } from "../Pages/ProfilePage";
import { ProfileSettingsPage } from "../Pages/ProfileSettingsPage";
import { Login } from "@mui/icons-material";

export const AuthCheck: React.FC = () => {
  const { user } = useAuthContext();
  if (!user) {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/edit" element={<ProfileSettingsPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

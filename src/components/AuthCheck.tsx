import React from "react";
import { Route, Routes } from "react-router";
import { useAuthContext } from "../providers/useContexts";
import { Layout } from "../layout/Layout";
import { HomePage } from "../Pages/HomePage";
import { ProfilePage } from "../Pages/ProfilePage";
import { ProfileSettingsPage } from "../Pages/ProfileSettingsPage";
import { LoginPage } from "../Pages/LoginPage";
import { SignUpPage } from "../Pages/SignUpPage";

export const AuthCheck: React.FC = () => {
  const { user, isUserLoading } = useAuthContext();
  if (!isUserLoading && !user) {
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }
  if(!isUserLoading && user){
    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage uid={user.uid}/>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/edit" element={<ProfileSettingsPage />} />
          <Route path="/:username" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    );
  }

};

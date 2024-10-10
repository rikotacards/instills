import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

import { Layout } from "./layout/Layout";
import { ProfilePage } from "./Pages/ProfilePage";
import { ProfileSettingsPage } from "./Pages/ProfileSettingsPage";
import { HomePage } from "./Pages/HomePage";
function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      background: {
        // paper: "white",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {},
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/edit" element={<ProfileSettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

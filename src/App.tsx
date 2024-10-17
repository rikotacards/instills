import { BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/AuthProvider";
import { AuthCheck } from "./components/AuthCheck";
import { useDetectColorTheme } from "./hooks/useDetectColorTheme";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      // paper: "white",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "white",
        },
      },
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
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      // paper: "white",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#25292D",
        },
      },
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

function App() {
  const queryClient = new QueryClient();
  const {theme: detectedColor} = useDetectColorTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={detectedColor === 'dark' ? darkTheme : theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AuthCheck/>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

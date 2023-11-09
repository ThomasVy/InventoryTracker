import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ShoppingCartProvider } from "./context/ShoppingCartProvider.tsx";

const FIVE_MINUTES = 1000 * 60 * 5;
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: FIVE_MINUTES } },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <ShoppingCartProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ShoppingCartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

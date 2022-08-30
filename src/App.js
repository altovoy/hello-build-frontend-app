import { BrowserRouter } from "react-router-dom";

import "./styles/App.scss";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { ApolloProvider } from "@apollo/client";
import { githubClient } from "./api/github.api";

import { defaultTheme } from "./themes/default.theme";
import { Router } from "./routes/Router";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <ApolloProvider client={githubClient}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;

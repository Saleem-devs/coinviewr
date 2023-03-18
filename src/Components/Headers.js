import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/logo.png";
import { CoinState } from "../CoinContext";

function Headers() {
  const { currency, setCurrency } = CoinState();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Link to="/" className="flex-1">
              <img src={Logo} alt="logo" className="w-40 cursor-pointer " />
            </Link>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"NGN"}>NGN</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"GBP"}>GBP</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Headers;

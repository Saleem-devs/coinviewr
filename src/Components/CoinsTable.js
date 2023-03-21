import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { CoinList } from "../config";
import { CoinState } from "../CoinContext";
import { numberWithCommas } from "./Carousel";
import numeral from "numeral";
import {
  createTheme,
  ThemeProvider,
  Container,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#98D82C",
    },
  },
}));

function CoinsTable() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CoinState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    async function fetchCoins() {
      try {
        const response = await fetch(CoinList(currency));
        const data = await response.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCoins();
  }, [currency]);

  const tHead = ["Coin", "Price", "24h Change", "Market Cap"];

  function handleSearch() {
    const searchUpper = search.toUpperCase();
    return coins.filter(
      (coin) =>
        coin.name.toUpperCase().includes(searchUpper) ||
        coin.symbol.toUpperCase().includes(searchUpper)
    );
  }

  const navigate = useNavigate();

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container id="CoinsTable" className="text-center p-9">
        <Typography variant="h4" style={{ marginBottom: 18 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          className="w-full"
          style={{ marginBottom: 20 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#98D82C" }} />
          ) : (
            <Table
              style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
            >
              <TableHead className="bg-primary">
                <TableRow>
                  {tHead.map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                      style={{
                        fontWeight: 700,
                        color: "#14161a",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            alignItems: "center",
                          }}
                        >
                          <div className="w-9">
                            <img
                              src={row?.image}
                              alt={row.name}
                              className="w-full"
                            />{" "}
                          </div>

                          <div className="flex flex-col ">
                            <span className="uppercase text-lg">
                              {row.symbol}
                            </span>
                            <span className="text-whiteShade">{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit ? "rgb(14, 203, 129)" : "red",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          <span>
                            {symbol}
                            <span className="hidden md:inline">
                              {numberWithCommas(row.market_cap.toString())}
                            </span>
                            <span className="md:hidden">
                              {numeral(row.market_cap)
                                .format("0.00a")
                                .toUpperCase()}
                            </span>
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Link to="CoinsTable" smooth={true}>
          <Pagination
            classes={{ ul: classes.pagination }}
            style={{
              padding: 20,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              // scrollToTop();
            }}
          />
        </Link>
      </Container>
    </ThemeProvider>
  );
}
export default CoinsTable;

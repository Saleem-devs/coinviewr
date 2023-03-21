import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CoinState } from "../CoinContext";
import Headers from "../Components/Headers";
import { SingleCoin } from "../config";
import CoinInfo from "../Components/CoinInfo";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../Components/Carousel";
import numeral from "numeral";
import { LinearProgress } from "@material-ui/core";

function MarketData(props) {
  const { title, info } = props;
  return (
    <div className="flex gap-2">
      <h3 className="font-bold text-2xl tracking-wide">{title}:</h3>
      <p className="text-2xl">{info}</p>
    </div>
  );
}

function Coins() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CoinState();

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(SingleCoin(id));
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress style={{ backgroundColor: "#98D82C" }} />;
  return (
    <>
      <Headers />
      <div className="px-4 flex flex-col items-center gap-8 lg:flex-row lg:px-10">
        <div className="flex flex-col items-center mt-6 border-gray-500 w-full lg:w-1/3 lg:border-r-2">
          <div className="h-52 mb-5">
            <img src={coin?.image.large} alt={coin?.name} className="h-full" />
          </div>
          <h3 className="font-bold text-4xl tracking-wide mb-5">
            {coin?.name}
          </h3>
          <p className="pb-4 text-justify self-start md:text-center md:self-center lg:self-start lg:text-left lg:pr-6">
            {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
          </p>
          <div className="self-start md:flex md:flex-col md:items-center md:self-center lg:self-start lg:items-start">
            <MarketData title="Rank" info={coin?.market_cap_rank} />
            <MarketData
              title="Current Price"
              info={`${symbol} ${numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}`}
            />
            <MarketData
              title="Market Cap"
              info={
                <>
                  {symbol}{" "}
                  <span className="hidden md:inline lg:hidden">
                    {numberWithCommas(
                      coin?.market_data.market_cap[
                        currency.toLowerCase()
                      ].toString()
                    )}
                  </span>
                  <span className="md:hidden lg:inline">
                    {numeral(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                    )
                      .format("0.00a")
                      .toUpperCase()}
                  </span>
                </>
              }
            />
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </>
  );
}

export default Coins;

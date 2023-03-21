import React, { useState, useEffect } from "react";
import { TrendingCoins } from "../config";
import { CoinState } from "../CoinContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Carousel() {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CoinState();

  useEffect(() => {
    fetch(TrendingCoins(currency))
      .then((response) => response.json())
      .then((data) => {
        setTrending(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currency]);

  // console.log(trending);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        to={`coins/${coin.id}`}
        className="text-white flex flex-col items-center uppercase gap-3"
      >
        <img src={coin?.image} alt={coin?.symbol} className="mb-3 h-12" />
        <span>
          {coin?.symbol} &nbsp;
          <span className={profit ? "text-customGreen" : "text-red-600"}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span className="font-bold text-xl tracking-wider">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <>
      <main className="py-10 bg-bgColor">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          autoPlay
          items={items}
        />
      </main>
    </>
  );
}

export default Carousel;

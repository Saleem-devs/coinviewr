import React, { createContext, useContext, useState, useEffect } from "react";

const Coin = createContext();

function CoinContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "NGN") {
      setSymbol("₦");
    } else if (currency === "EUR") {
      setSymbol("€");
    } else if (currency === "GBP") {
      setSymbol("£");
    }
  }, [currency]);

  return (
    <Coin.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Coin.Provider>
  );
}

export default CoinContext;

export const CoinState = () => {
  return useContext(Coin);
};

// Stay Ahead of the Crypto Game with Real-Time Price Tracking - Never Miss a Cryptocurrency Price Change Again

// Stay ahead of the competition with our real-time cryptocurrency price tracker. Get accurate information on thousands of cryptocurrencies, so you can make informed investment decisions. Perfect for traders of all levels.

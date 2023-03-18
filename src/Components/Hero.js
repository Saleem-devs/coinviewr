import React from "react";
import { Link } from "react-scroll";

function Hero() {
  return (
    <>
      <section className="py-14">
        <div className="container md:w-2/3">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-center font-bold text-3xl md:text-4xl">
              Stay Ahead of the Crypto Game with{" "}
              <span className="text-primary">Real-Time Price Tracking</span> -{" "}
              <br /> Never Miss a Cryptocurrency Price Change Again
            </h1>
            <p className="text-center text-lg text-whiteShade">
              Get accurate information on thousands of cryptocurrencies, so you
              can make informed investment decisions. Perfect for traders of all
              levels.
            </p>
            <Link to="CoinsTable" smooth={true}>
              <button className="py-2 px-5 rounded-3xl bg-primary text-darkerBgColor font-bold">
                Explore now
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

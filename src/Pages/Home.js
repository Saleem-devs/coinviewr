import React from "react";
import Hero from "../Components/Hero";
import Headers from "../Components/Headers";
import Carousel from "../Components/Carousel";
import CoinsTable from "../Components/CoinsTable";

function Home() {
  return (
    <>
      <Headers />
      <Hero />
      <Carousel />
      <CoinsTable />
    </>
  );
}

export default Home;

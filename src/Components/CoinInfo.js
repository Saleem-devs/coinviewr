import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJs,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CoinState } from "../CoinContext";
import { HistoricalChart, chartDays } from "../config";
import SelectBtn from "./SelectBtn";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CoinInfo({ coin }) {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CoinState();

  useEffect(() => {
    async function fetchChart() {
      try {
        const res = await fetch(HistoricalChart(coin.id, days, currency));
        const data = await res.json();
        console.log(data.prices);
        setHistoricalData(data.prices);
      } catch (error) {
        console.log(error);
      }
    }
    fetchChart();
  }, [coin, days, currency]);

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
      <div className="w-full flex flex-col items-center justify-center mt-6 p-4 lg:p-10 lg:w-2/3">
        {!historicalData ? (
          <CircularProgress
            style={{ color: "#98D82C" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderWidth: 2,
                    borderColor: "#98D82C",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 0.2,
                  },
                },
              }}
            />

            <div className="flex justify-around gap-5 w-full mt-5">
              {chartDays.map((day) => (
                <SelectBtn
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectBtn>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CoinInfo;

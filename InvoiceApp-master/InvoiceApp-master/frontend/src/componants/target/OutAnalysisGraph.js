import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LineChart } from "@mui/x-charts/LineChart";

export const OutAnalysisGraph = () => {
  const [targetSheets, setTargetSheets] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchTargets();
  }, []);

  const fetchTargets = async () => {
    try {
      console.log("Fetching targets...");
      const response = await axios.get(`http://localhost:8070/target/getAll`);

      console.log(response.data);
      setTargetSheets(response.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  useEffect(() => {
    function calculateTotalIOuts(data) {
      return data.map((order) => {
        const totalIOuts = order.Targets.reduce((sum, target) => {
          const iOutsSum = (target.IOuts || [])
            .filter((val) => val != null)
            .reduce((a, b) => a + b, 0);
          return sum + iOutsSum;
        }, 0);

        return {
          SheetNo: order.SheetNo,
          totalIOuts,
        };
      });
    }
    setChartData(calculateTotalIOuts(targetSheets));
  }, [targetSheets]);

  return (
    <LineChart
      xAxis={[
        { data: chartData.map((item) => item.SheetNo), scaleType: "band" },
      ]}
      series={[
        {
          data: chartData.map((item) => item.totalIOuts),
          label: "Total IOuts",
        },
      ]}
      width={425}
      height={300}
    />
  );
};

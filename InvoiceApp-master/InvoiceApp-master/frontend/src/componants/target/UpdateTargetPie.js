import React, { useEffect, useState, useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import axios from "axios";

export const UpdateTargetPie = (props) => {
  const { refresh, setRefresh, totalIots } = useContext(UpdateTargetContex);
  const SheetNo = props.sheetNum;
  const jobcardId = SheetNo.replaceAll("T", "");
  const [targets, setTargets] = useState([]);
  const [order, setOrder] = useState();
  const [totalOperationPg, settotalOperationPg] = useState();
  const [totalQty, settotalQty] = useState();
  const [totalOperationsOrder, settotalOperationsOrder] = useState();

  useEffect(() => {
    fetchTargets();
    fetchOrder();
  }, [refresh]);

  useEffect(() => {
    console.log("Total target iouts", totalIots, totalOperationsOrder);
  }, [totalIots]);

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets for pie...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );
      console.log("targets", response.data);
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      console.log("Fetching order details for ...", jobcardId);
      const response = await axios.get(
        `http://localhost:8070/order/getOrder?jobcardId=${jobcardId}`
      );
      console.log("jobcardId");
      console.log("order", response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    let total = 0;

    targets.map((target) => {
      total += target.OperationPg;
    });

    settotalOperationPg(total);
  }, [targets]);

  useEffect(() => {
    let total;
    if (order) {
      total = Object.values(order.sizeDistribution).reduce(
        (acc, val) => acc + val,
        0
      );
    }

    settotalQty(total);
    calculateProgress();
  }, [targets]);

  const calculateProgress = () => {
    const total = totalOperationPg * totalQty;
    settotalOperationsOrder(total);
  };

  return (
    <div className="my-3">
      <PieChart
        series={[
          {
            innerRadius: 12,
            cornerRadius: 5,
            data: [
              { id: 1, value: totalIots, label: "Out" },
              { id: 0, value: totalOperationsOrder - totalIots, label: "Left" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

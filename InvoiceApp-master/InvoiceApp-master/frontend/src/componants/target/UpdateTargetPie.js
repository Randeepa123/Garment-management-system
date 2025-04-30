import React, { useEffect, useState, useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import axios from "axios";

export const UpdateTargetPie = ({ sheetNum }) => {
  const { refresh, totalIots } = useContext(UpdateTargetContex);
  const jobcardId = sheetNum.replaceAll("T", "");

  const [targets, setTargets] = useState([]);
  const [target, setTarget] = useState();
  const [order, setOrder] = useState(null);
  const [totalOperationPg, setTotalOperationPg] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [totalOperationsOrder, setTotalOperationsOrder] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchTargets(), fetchOrder(), fetchTargetSheet()]);
    };
    fetchData();
  }, [refresh, jobcardId]);

  const fetchTargets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${sheetNum}`
      );
      setTargets(res.data || []);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const fetchTargetSheet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8070/target/getTarget?SheetNo=${sheetNum}`
      );
      console.log(res.data.DailyTarget);
      setTarget(res.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8070/getOrder?jobcardId=${jobcardId}`
      );
      if (res.data) {
        setOrder(res.data);
      } else {
        console.warn("Order not found for jobcardId:", jobcardId);
        setOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    const total = targets.reduce((sum, t) => sum + (t.OperationPg || 0), 0);
    setTotalOperationPg(total);
  }, [targets]);

  useEffect(() => {
    if (!order || !order.sizeDistribution) return;

    // const qty = Object.values(order.sizeDistribution).reduce(
    //   (acc, val) => acc + (val || 0),
    //   0
    // );

    let qty = 0;
    if (target != null) {
      qty = target.DailyTarget;
      console.log("Daily targets is", target.DailyTarget);
    }
    setTotalQty(qty);

    const totalOps = totalOperationPg * qty;
    setTotalOperationsOrder(totalOps);
  }, [order, totalOperationPg]);

  return (
    <div className="my-3">
      <PieChart
        series={[
          {
            innerRadius: 12,
            cornerRadius: 5,
            data: [
              { id: 1, value: totalIots || 0, label: "Out" },
              {
                id: 0,
                value: Math.max(
                  (totalOperationsOrder || 0) - (totalIots || 0),
                  0
                ),
                label: "Left",
              },
            ],
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
};

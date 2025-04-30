import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

export const LineTargetEstimation = ({ sheetNum }) => {
  const hoursPerDay = 6;
  const [targets, setTargets] = useState([]);
  const [order, setOrder] = useState(null);
  const [timePerPG, setTimePerPG] = useState(null);
  const [estimatedDelivery, setEstimatedDelivery] = useState("-");
  const [daysToFinish, setDaysToFinish] = useState("-");
  const [dailyTarget, setDailyTarget] = useState("-");

  useEffect(() => {
    fetchTargets();
    fetchOrder();
  }, []);

  useEffect(() => {
    if (targets.length === 0) return;

    const totalTime = targets.reduce((sum, t) => {
      const pg = Number(t.OperationPg) || 0;
      const it = Number(t.ITarget) || 0;
      if (it === 0) return sum; // avoid division by zero
      return sum + (60 / it) * pg;
    }, 0);

    if (totalTime > 0) {
      setTimePerPG(totalTime);
    } else {
      setTimePerPG(null);
    }
  }, [targets]);

  useEffect(() => {
    if (!timePerPG || !order?.sizeDistribution) return;

    const totalQty = Object.values(order.sizeDistribution).reduce(
      (sum, val) => sum + (Number(val) || 0),
      0
    );

    const daily = (hoursPerDay * 60) / timePerPG;
    const days = Math.ceil(totalQty / daily);

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + days);

    setDailyTarget(daily.toFixed(2));
    setDaysToFinish(days);
    setEstimatedDelivery(estimatedDate.toLocaleDateString());
  }, [timePerPG, order]);

  const fetchTargets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${sheetNum}`
      );
      setTargets(res.data);
    } catch (err) {
      console.error("Error fetching targets:", err);
    }
  };

  const fetchOrder = async () => {
    try {
      const jobcardId = parseInt(sheetNum.slice(1));
      const res = await axios.get(
        `http://localhost:8070/getOrder?jobcardId=${jobcardId}`
      );
      setOrder(res.data || null);
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };

  const handleSetDaily = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8070/target/setDaily?SheetNo=${sheetNum}`,
        { DailyTarget: parseFloat(dailyTarget) },
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Daily target updated successfully.");
    } catch (error) {
      console.error("Error updating daily target:", error);
      alert("Failed to update target.");
    }
  };

  return (
    <div className="d-flex justify-content-between p-5 rounded shadow displaylinetarget">
      <button
        type="button"
        className="btn btn-md btn-primary"
        onClick={handleSetDaily}
      >
        <ArrowOutwardOutlinedIcon />
        Set Target
      </button>

      <div className="d-flex align-items-center gap-3">
        <span className="align-middle fs-3 fw-semibold">Line Target: </span>
        <span>{dailyTarget} pcs/day</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <span className="align-middle fs-3 fw-semibold">
          Estimated Delivery:
        </span>
        <span>
          {daysToFinish} Days - Date: {estimatedDelivery}
        </span>
      </div>
    </div>
  );
};

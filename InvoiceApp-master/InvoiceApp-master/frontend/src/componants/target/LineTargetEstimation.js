import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

export const LineTargetEstimation = (props) => {
  const SheetNo = props.sheetNum;
  const hoursPerDay = 6;
  const [targets, setTargets] = useState([]);
  const [order, setOrder] = useState([]);
  const [timePerPG, setTimePerPG] = useState(0);
  const [estiDelivary, setEstiDelivary] = useState();
  const [daysToFinish, setDaysToFinish] = useState();

  useEffect(() => {
    fetchTargets();
    fetchOrder();
  }, []);

  useEffect(() => {
    if (!order || !order.sizeDistribution) return;

    const qty = Object.values(order.sizeDistribution).reduce(
      (acc, val) => acc + (val || 0),
      0
    );

    const DaysTake = Math.ceil(qty / ((hoursPerDay * 60) / timePerPG));
    setDaysToFinish(DaysTake);
    console.log("Days to finish", DaysTake);
    let today = new Date();
    today.setDate(today.getDate() + DaysTake);
    setEstiDelivary(today.toLocaleDateString());
  }, [order]);

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );
      console.log(response.data);
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8070/getOrder?jobcardId=${parseInt(SheetNo.slice(1))}`
      );
      if (res.data) {
        setOrder(res.data);
      } else {
        console.warn(
          "Order not found for jobcardId:",
          parseInt(SheetNo.slice(1))
        );
        setOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    const total = targets.reduce(
      (sum, t) => sum + ((60 / t.ITarget) * t.OperationPg || 0),
      0
    );
    setTimePerPG(total);
  }, [targets]);

  return (
    <div className="d-flex justify-content-between p-5 rounded shadow displaylinetarget">
      <button type="button" className="btn btn-md btn-primary">
        <ArrowOutwardOutlinedIcon />
        Set Target
      </button>
      <div className="d-flex align-items-center gap-3">
        <span className="align-middle fs-3 fw-semibold">Line Target: </span>
        <span>{(hoursPerDay * 60) / timePerPG}pcs/Day</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <span className="align-middle fs-3 fw-semibold">
          Estimamet Delivary:
        </span>
        <span>
          {daysToFinish} Days - Date : {estiDelivary}
        </span>
      </div>
    </div>
  );
};

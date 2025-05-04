import React, { useEffect, useState } from "react";
import axios from "axios";
import CachedIcon from "@mui/icons-material/Cached";
import { Riple } from "react-loading-indicators";

// Updated imports

export const ProcessSchedule = () => {
  const [orders, setOrders] = useState([]);
  const [targets, setTargetSheets] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchTargets();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.get(`http://localhost:8070/orders`);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchTargets = async () => {
    try {
      console.log("Fetching targets...");
      const response = await axios.get(`http://localhost:8070/target/getAll`);

      setTargetSheets(response.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  useEffect(() => {
    console.log("Orders:", orders);
    const result = orders
      .map((order) => {
        console.log("Order:", order);
        const matchingTarget = targets.find(
          (target) => String(target.jobcardId) === String(order.jobcardId)
        );

        // Skip if no matching target found or if DailyTarget is null/0
        if (!matchingTarget || !matchingTarget.DailyTarget) return null;

        const totalQty = Object.values(order.sizeDistribution).reduce(
          (sum, val) => sum + (Number(val) || 0),
          0
        );

        let formattedstartDate = null;
        if (order?.productionTracking?.sewing?.startDate) {
          const startDate = new Date(order.productionTracking.sewing.startDate);
          if (!isNaN(startDate)) {
            formattedstartDate = startDate.toISOString().slice(0, 10);
          }
        }

        let formatteddueDate = null;
        if (order?.deliveryDate) {
          const dueDate = new Date(order.deliveryDate);
          if (!isNaN(dueDate)) {
            formatteddueDate = dueDate.toISOString().slice(0, 10);
          }
        }

        // Skip if either start date or due date is null
        if (!formattedstartDate || !formatteddueDate) return null;

        return {
          jobcardID: order.jobcardId,
          start_date: formattedstartDate,
          duration: Math.ceil(totalQty / matchingTarget.DailyTarget),
          due_date: formatteddueDate,
        };
      })
      .filter((item) => item !== null); // Filter out null entries
    console.log("result:", result);
    setJobData(result);
  }, [orders, targets]);

  // useEffect(() => {
  //   if (!jobData || jobData.length === 0) return;

  //   async function sendJobData() {
  //     const data = {
  //       orders: jobData,
  //     };
  //     console.log("Sending job data:", data);
  //     const response = await fetch("http://127.0.0.1:5000/schedule", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     console.log(result);
  //     setScheduledJobs(result.scheduled_jobs);
  //   }

  //   sendJobData();
  // }, [jobData]);

  const generateSchedule = async () => {
    if (!jobData || jobData.length === 0) return;

    setLoading(true);

    async function sendJobData() {
      const data = {
        orders: jobData,
      };
      console.log("Sending job data:", data);

      try {
        console.log("Sending to schedule");

        const response = await axios.post(
          `http://localhost:8070/target/schedule`, // URL with query parameter
          data, // Request body
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        setScheduledJobs(response.data.scheduled_jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error adding Invoice:", error);
        alert("Error adding Invoice");
      }
    }

    sendJobData();
  };

  return (
    <div>
      <div class="row text-center justify-content-center mb-5">
        <div class="col-xl-6 col-lg-8 w-100 d-flex justify-content-between">
          <h2 class="font-weight-bold">Schedule</h2>
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={generateSchedule}
          >
            <CachedIcon />
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="timeline-steps aos-init aos-animate" data-aos="fade-up">
            {scheduledJobs && scheduledJobs.length > 0 ? (
              scheduledJobs.map((job, index) => (
                <div class="timeline-step">
                  <div
                    class="timeline-content"
                    data-toggle="popover"
                    data-trigger="hover"
                    data-placement="top"
                    title=""
                    data-content="And here's some amazing content. It's very engaging. Right?"
                    data-original-title="2003"
                  >
                    <div class="inner-circle"></div>
                    <p class="h6 mt-3 mb-1">{job.jobcardID}</p>
                    <p class="h6 text-muted mb-0 mb-lg-0">{job.start_date}</p>
                  </div>
                </div>
              ))
            ) : loading ? (
              <Riple color="#007ea4" size="medium" text="" textColor="" />
            ) : (
              <p>Click to generate schedule</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

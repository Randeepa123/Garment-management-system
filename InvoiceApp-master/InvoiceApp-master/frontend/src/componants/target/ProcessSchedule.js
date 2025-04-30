import React, { useEffect } from "react";

export const ProcessSchedule = () => {
  useEffect(() => {
    async function sendJobData() {
      const jobData = {
        orders: [
          {
            jobcardID: 18,
            start_date: "2023-04-30",
            duration: 5,
            due_date: "2023-05-04",
          },
          {
            jobcardID: 19,
            start_date: "2023-05-05",
            duration: 5,
            due_date: "2023-05-10",
          },
        ],
      };

      const response = await fetch("http://127.0.0.1:5000/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      console.log(result);
      // Use the result to display scheduled jobs on the frontend
    }

    sendJobData();
  }, []);

  return (
    <div>
      <div>Schedule</div>
    </div>
  );
};

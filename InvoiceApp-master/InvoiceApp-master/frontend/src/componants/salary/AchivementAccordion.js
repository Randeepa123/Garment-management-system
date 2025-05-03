import React, { useState, useEffect } from "react";
import axios from "axios";

export const AchivementAccordion = ({ onSelectAchiver }) => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8070/target/getAchivements"
        );
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  const handleViewDetails = (employee) => {
    onSelectAchiver(employee);
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {achievements.map((target, index) => (
          <div className="accordion-item" key={target._id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded={index === 0}
                aria-controls={`collapse${index}`}
              >
                Target Sheet: {target.targetSheetNo}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className={`accordion-collapse collapse ${
                index === 0 ? "show" : ""
              }`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul className="list-group">
                  {target.achievements.map((achievement) => (
                    <li
                      key={achievement._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {achievement.employeeId.name}
                      <span className="badge text-bg-primary rounded-pill">
                        {achievement.count}
                      </span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleViewDetails(target.targetSheetNo)}
                      >
                        V
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

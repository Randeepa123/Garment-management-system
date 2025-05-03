import React, { useState } from "react";
import { TopicBar } from "../../componants/TopicBar";
import { SalaryTable } from "../../componants/salary/SalaryTable";
import { SalaryIncrementForm } from "../../componants/salary/SalaryIncrementForm";
import { AchivementAccordion } from "../../componants/salary/AchivementAccordion";

export const Employee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAchiver, setSelectedAchiver] = useState(null);

  return (
    <div>
      <TopicBar text="Employee Managment" userName="Adithya Hulangamuwa" />
      <div className="row">
        <div className="col-8">
          <SalaryTable onSelectEmployee={setSelectedEmployee} />
        </div>
        <div className="col-4">
          <AchivementAccordion onSelectAchiver={setSelectedAchiver} />
        </div>
      </div>
      <div className="row mt-3 d-flex justify-content-center">
        <div className="col-8">
          <SalaryIncrementForm
            selectedEmployee={selectedEmployee}
            selectedAchiver={selectedAchiver}
          />
        </div>
      </div>
    </div>
  );
};

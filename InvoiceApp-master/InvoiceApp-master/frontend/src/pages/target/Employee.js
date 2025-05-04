import React, { useState } from "react";
import { TopicBar } from "../../componants/TopicBar";
import { SalaryTable } from "../../componants/salary/SalaryTable";
import { SalaryIncrementForm } from "../../componants/salary/SalaryIncrementForm";
import { AchivementAccordion } from "../../componants/salary/AchivementAccordion";
import { SalarySheet } from "../../componants/salary/SalarySheet";
import { SalaryContex } from "../../contex/SalaryContex";

export const Employee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAchiver, setSelectedAchiver] = useState(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <TopicBar text="Employee Managment" userName="Adithya Hulangamuwa" />
      <SalaryContex.Provider value={{ refresh, setRefresh }}>
        <div className="row">
          <div className="col-8">
            <SalaryTable onSelectEmployee={setSelectedEmployee} />
          </div>
          <div className="col-4">
            <AchivementAccordion onSelectAchiver={setSelectedAchiver} />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-8">
            <SalaryIncrementForm
              selectedEmployee={selectedEmployee}
              selectedAchiver={selectedAchiver}
            />
            {selectedEmployee && <SalarySheet employee={selectedEmployee} />}
          </div>
        </div>
      </SalaryContex.Provider>
    </div>
  );
};

import React from "react";
import Employee from "./Employee";

const EmployeeList = ({ employees, removeEmployee, editEmployee }) => {
  return (
    <section className="employee__carts">
      {employees.map((employee) => {
        return (
          <Employee
            key={employee.id}
            {...employee}
            removeEmployee={removeEmployee}
            editEmployee={editEmployee}
          />
        );
      })}
    </section>
  );
};

export default EmployeeList;

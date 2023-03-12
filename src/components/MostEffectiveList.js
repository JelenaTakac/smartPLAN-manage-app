import React from "react";
import MostEffectiveCart from "./MostEffectiveCart";

const MostEffectiveList = ({ topEffective, employees }) => {
  return (
    <section className="employee__carts">
      {topEffective.map((effectiveEmployee) => {
        return (
          <MostEffectiveCart
            {...employees.find(
              (employee) => employee.id === effectiveEmployee.employeeID
            )}
            numberOfTasks={effectiveEmployee.numberOfTasks}
          />
        );
      })}
    </section>
  );
};

export default MostEffectiveList;

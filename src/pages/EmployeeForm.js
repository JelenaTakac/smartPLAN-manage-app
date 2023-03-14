import React from "react";
import { useGlobalContext } from "../context";
import EmployeeList from "../components/EmployeeList";

export default function EmployeeForm() {
  const {
    employeeInfo,
    employees,
    removeEmployee,
    editEmployee,
    handleChange,
    formErrorsEmployee,
    handleSubmitEmployee,
    isUpdateEmployee,
  } = useGlobalContext();

  return (
    <main>
      <section className="employee__section">
        <form className="employee__form">
          <h2 className="text-align">Employee Form</h2>
          <div className="form__field">
            <label htmlFor="fullName">Full Name : </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Your full name..."
              required="required"
              value={employeeInfo.fullName}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsEmployee.fullName}</p>
          <div className="form__field">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address..."
              required="required"
              value={employeeInfo.email}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsEmployee.email}</p>
          <div className="form__field">
            <label htmlFor="phone">Phone number : </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Your phone number..."
              value={employeeInfo.phone}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsEmployee.phone}</p>
          <div className="form__field">
            <label htmlFor="birthDate">Date Of Birth : </label>
            <input
              type="date"
              name="birthDate"
              id="birthDate"
              value={employeeInfo.birthDate}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsEmployee.birthDate}</p>
          <div className="form__field">
            <label htmlFor="salary">Monthly Salary : </label>
            <input
              type="text"
              name="salary"
              id="salary"
              placeholder="Your monthly salary..."
              value={employeeInfo.salary}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsEmployee.salary}</p>

          <button
            className="btn btn-add"
            type="submit"
            onClick={handleSubmitEmployee}
          >
            {isUpdateEmployee ? "Save Changes" : "Add Employee"}
          </button>
        </form>
      </section>

      {employees.length > 0 && (
        <>
          <article className="container p-y2">
            <h3 className="text-align ">Employee List</h3>
            <EmployeeList
              employees={employees}
              removeEmployee={removeEmployee}
              editEmployee={editEmployee}
            />
          </article>
        </>
      )}
    </main>
  );
}

import React from "react";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Employee = ({
  id,
  fullName,
  email,
  phone,
  dateOfBirth,
  salary,
  removeEmployee,
  editEmployee,
}) => {
  return (
    <article className="single__employee">
      <FaUser className=" avatar" />
      <div>
        <h4>{fullName}</h4>
        <p>{dateOfBirth}</p>
        <div className="fa__container">
          <FaRegEnvelope />
          <p>{email}</p>
        </div>
        <div className="fa__container">
          <FaPhone />
          <p>{phone}</p>
        </div>
        <p className="salary">${salary}</p>
      </div>
      <div className="btn-container">
        <button className="btn-edit" onClick={() => editEmployee(id)}>
          <FaEdit className="icon__edit" />
        </button>
        <button className="btn-delete" onClick={() => removeEmployee(id)}>
          <FaTrash className="icon__delete" />
        </button>
      </div>
    </article>
  );
};

export default Employee;

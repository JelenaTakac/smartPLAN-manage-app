import React from "react";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

const MostEffectiveCart = ({
  id,
  fullName,
  email,
  phone,
  dateOfBirth,
  numberOfTasks,
}) => {
  return (
    <article className="single__employee">
      <FaUser className=" avatar" />
      <div>
        <h4>{fullName}</h4>
        <p>{dateOfBirth}</p>
        <div className="fa__container small-font">
          <FaRegEnvelope />
          <p>{email}</p>
        </div>
        <div className="fa__container small-font">
          <FaPhone />
          <p>{phone}</p>
        </div>
        <p className="small-font">
          Number of tasks : <strong>{numberOfTasks}</strong>
        </p>
      </div>
    </article>
  );
};

export default MostEffectiveCart;

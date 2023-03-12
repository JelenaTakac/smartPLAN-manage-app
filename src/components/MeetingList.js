import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const MeetingList = ({ meetings, removeMeeting, editMeeting }) => {
  return (
    <table className="table__content">
      <tbody>
        <tr>
          <th>Topic</th>
          <th>Description</th>
          <th>When</th>
          <th>Guests</th>
          <th>Update / Delete</th>
        </tr>
        {meetings.map((meeting) => {
          const { id, topic, describeMeeting, when, guests } = meeting;
          return (
            <tr key={id}>
              <td>{topic}</td>
              <td>{describeMeeting}</td>
              <td>{when}</td>
              <td>
                {guests.map((guest) => {
                  return (
                    <ul>
                      <li>{guest.label}</li>
                    </ul>
                  );
                })}
              </td>
              <td>
                <div className="btn-container p-x1">
                  <button className="btn-edit " onClick={() => editMeeting(id)}>
                    <FaEdit className="icon__edit" />
                  </button>
                  <button
                    className=" btn-delete "
                    onClick={() => removeMeeting(id)}
                  >
                    <FaTrash className="icon__delete" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MeetingList;

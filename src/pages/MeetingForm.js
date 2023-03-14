import React from "react";
import { useGlobalContext } from "../context";
import Select from "react-select";
import MeetingList from "../components/MeetingList";

export default function MeetingForm() {
  const {
    meetingInfo,
    meetings,
    removeMeeting,
    editMeeting,
    handleChange,
    formErrorsMeeting,
    employees,
    selectedOptions,
    handleSelect,
    handleSubmitMeeting,
    isUpdateMeeting,
  } = useGlobalContext();

  return (
    <main>
      <section className="meeting__section">
        <form className="meeting__form">
          <h2 className="text-align">Organize Meeting</h2>
          <div className="form__field">
            <label htmlFor="topic">Topic : </label>
            <input
              type="text"
              name="topic"
              id="topic"
              placeholder="Please enter the topic..."
              required="required"
              value={meetingInfo.topic}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsMeeting.topic}</p>
          <div className="form__field">
            <label className="not-required" htmlFor="describeMeeting">
              Description :
            </label>
            <textarea
              name="describeMeeting"
              id="describeMeeting"
              placeholder="Describe topic..."
              value={meetingInfo.describeMeeting}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form__field">
            <label htmlFor="when">When : </label>
            <input
              type="datetime-local"
              name="when"
              id="when"
              value={meetingInfo.when}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsMeeting.when}</p>
          <div className="form__field">
            <label className="not-required" htmlFor="guests">
              Guests :
            </label>
            <Select
              className="select-component"
              options={employees.map((employee) => ({
                value: employee.id,
                label: employee.fullName,
              }))}
              placeholder="Select guests"
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
            />
          </div>
          <button
            className="btn btn-add"
            type="submit"
            onClick={handleSubmitMeeting}
          >
            {isUpdateMeeting ? "Save Changes" : " Add Meeting"}
          </button>
        </form>
      </section>

      {meetings.length > 0 && (
        <>
          <article className="container p-y2">
            <h3 className="text-align ">Table Of Meetings</h3>
            <MeetingList
              meetings={meetings}
              removeMeeting={removeMeeting}
              editMeeting={editMeeting}
            />
          </article>
        </>
      )}
    </main>
  );
}

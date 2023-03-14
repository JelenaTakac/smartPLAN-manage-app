import React from "react";
import { useGlobalContext } from "../context";
import TaskList from "../components/TaskList";

export default function TaskForm() {
  const {
    taskInfo,
    tasks,
    removeTask,
    editTask,
    averageTaskPoint,
    handleChange,
    formErrorsTask,
    employees,
    points,
    handleSubmitTask,
    isUpdateTask,
  } = useGlobalContext();

  return (
    <main>
      <section className="task__section">
        <form className="task__form">
          <h2 className="text-align">Task Form</h2>
          <div className="form__field">
            <label htmlFor="title">Title : </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Please enter the title..."
              required="required"
              value={taskInfo.title}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsTask.title}</p>
          <div className="form__field">
            <label className="not-required" htmlFor="assignee">
              Assigned To :
            </label>
            <select
              name="assignee"
              id="assignee"
              value={taskInfo.assignee}
              onChange={handleChange}
            >
              <option value="select assignee" selected>
                Please select an assignee
              </option>
              {employees.map((employee, id) => {
                return (
                  <option key={id} value={employee.id}>
                    {employee.fullName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form__field">
            <label htmlFor="point">Point : </label>
            <select
              name="point"
              id="point"
              value={taskInfo.point}
              onChange={handleChange}
            >
              <option value="select assignee" selected>
                Please add point
              </option>
              {points.map((point, index) => {
                return (
                  <option key={index} value={point}>
                    {point}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form__error">{formErrorsTask.point}</p>
          <div className="form__field">
            <label htmlFor="dueDate">Due Date : </label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              value={taskInfo.dueDate}
              onChange={handleChange}
            />
          </div>
          <p className="form__error">{formErrorsTask.dueDate}</p>
          <div className="form__field">
            <label className="not-required" htmlFor="description">
              Description :
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Describe task..."
              value={taskInfo.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="btn btn-add"
            type="submit"
            onClick={handleSubmitTask}
          >
            {isUpdateTask ? "Save Changes" : " Add Task"}
          </button>
        </form>
      </section>

      {tasks.length > 0 && (
        <>
          <article className="container p-y2">
            <h3 className="text-align ">Table Of Tasks</h3>
            <TaskList
              employees={employees}
              tasks={tasks}
              removeTask={removeTask}
              editTask={editTask}
            />
          </article>
        </>
      )}

      {tasks.length > 0 && (
        <div className="note">
          <h4>
            Average Point Per Task :{" "}
            <span className="text-primary">{averageTaskPoint}</span>
          </h4>
        </div>
      )}
    </main>
  );
}

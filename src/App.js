import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import TaskList from "./components/TaskList";
import MostEffectiveList from "./components/MostEffectiveList";

const getLocalStorageEmployee = () => {
  let employees = localStorage.getItem("employees");
  if (employees) {
    return (employees = JSON.parse(localStorage.getItem("employees")));
  } else {
    return [];
  }
};

const getLocalStorageTask = () => {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    return (tasks = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

function App() {
  const [employeeInfo, setEmployeeInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    salary: "",
  });
  const [formErrorsEmployee, setFormErrorsEmployee] = useState({});
  const [employees, setEmployees] = useState(getLocalStorageEmployee());
  const [isUpdateEmployee, setIsUpdateEmployee] = useState(false);
  const [editID, setEditID] = useState(null);

  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    point: null,
  });
  const [formErrorsTask, setFormErrorsTask] = useState({});
  const [tasks, setTasks] = useState(getLocalStorageTask());
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const [editTaskID, setEditTaskID] = useState(null);

  const [points, setPoints] = useState([1, 2, 3, 5, 8, 13, 21]);
  const [averageTaskPoint, setAverageTaskPoint] = useState(null);

  const [topEffective, setTopEffective] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployeeInfo({ ...employeeInfo, [name]: value });
    setTaskInfo({ ...taskInfo, [name]: value });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validateEmployee = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "Phone is required!";
    }
    if (!values.birthDate) {
      errors.birthDate = "Date of birth is required!";
    }
    if (!values.salary) {
      errors.salary = "Salary is required!";
    }
    return errors;
  };

  const validateTask = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.point) {
      errors.point = "Point is required!";
    }
    if (!values.dueDate) {
      errors.dueDate = "Due Date is required!";
    }
    return errors;
  };

  const handleSubmitEmployee = (e) => {
    e.preventDefault();
    setFormErrorsEmployee(validateEmployee(employeeInfo));

    if (
      employeeInfo.fullName &&
      employeeInfo.phone &&
      employeeInfo.email &&
      emailRegex.test(employeeInfo.email) &&
      employeeInfo.birthDate &&
      employeeInfo.salary
    ) {
      const newEmployee = {
        ...employeeInfo,
        id: new Date().getTime().toString(),
      };
      setEmployees([...employees, newEmployee]);
      setEmployeeInfo({
        fullName: "",
        phone: "",
        email: "",
        birthDate: "",
        salary: "",
      });
    }
    if (isUpdateEmployee) {
      setEmployees(
        employees.map((employee) => {
          if (employee.id === editID) {
            return {
              ...employee,
              fullName: employeeInfo.fullName,
              phone: employeeInfo.phone,
              email: employeeInfo.email,
              birthDate: employeeInfo.birthDate,
              salary: employeeInfo.salary,
            };
          }
          return employee;
        })
      );
      setEmployeeInfo({
        fullName: "",
        phone: "",
        email: "",
        birthDate: "",
        salary: "",
      });
      setEditID(null);
      setIsUpdateEmployee(false);
    }
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    const validationErrors = validateTask(taskInfo);
    setFormErrorsTask(validateTask(taskInfo));
    if (Object.keys(validationErrors).length === 0) {
      const newTask = {
        ...taskInfo,
        id: new Date().getTime().toString(),
      };
      setTasks([...tasks, newTask]);
      setTaskInfo({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        point: "",
      });

      if (isUpdateTask) {
        setTasks(
          tasks.map((task) => {
            if (task.id === editTaskID) {
              return {
                ...task,
                title: taskInfo.title,
                description: taskInfo.description,
                assignee: taskInfo.assignee,
                dueDate: taskInfo.dueDate,
                point: taskInfo.point,
              };
            }
            return task;
          })
        );
        setTaskInfo({
          title: "",
          description: "",
          assignee: "",
          dueDate: "",
          point: "null",
        });
        setEditTaskID(null);
        setIsUpdateTask(false);
      }
    }
  };

  const removeEmployee = (id) => {
    setTasks(
      tasks.map((task) =>
        task.assignee === id ? { ...task, assignee: "" } : task
      )
    );
    return setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const removeTask = (id) => {
    return setTasks(tasks.filter((task) => task.id !== id));
  };

  const editEmployee = (id) => {
    const specificEmployee = employees.find((employee) => employee.id === id);
    setIsUpdateEmployee(true);
    setEditID(id);
    setEmployeeInfo(specificEmployee);
  };

  const editTask = (id) => {
    const specificTask = tasks.find((task) => task.id === id);
    setIsUpdateTask(true);
    setEditTaskID(id);
    setTaskInfo(specificTask);
  };

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTasksFromLastMonth = () => {
    const currentDate = new Date();
    const lastMonth = currentDate.getMonth() - 1;
    const tasksFromLastMonth = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      const taskMonth = taskDate.getMonth();

      return lastMonth == taskMonth;
    });
    return tasksFromLastMonth;
  };

  const getMostEffectiveEmployees = () => {
    const lastMonthTasks = getTasksFromLastMonth();
    let countMostEffectiveEmployees = lastMonthTasks.reduce((total, item) => {
      const { assignee } = item;
      if (assignee) {
        if (total[assignee]) {
          total[assignee] = total[assignee] + 1;
        } else {
          total[assignee] = 1;
        }
      }
      return total;
    }, {});

    const mostEfectiveEmployeesArray = [];

    for (const [key, value] of Object.entries(countMostEffectiveEmployees)) {
      const employeeStatistic = {
        employeeID: key,
        numberOfTasks: value,
      };

      mostEfectiveEmployeesArray.push(employeeStatistic);
    }

    const sortedEmployee = mostEfectiveEmployeesArray.sort(
      (a, b) => b.numberOfTasks - a.numberOfTasks
    );
    return sortedEmployee.slice(0, 5);
  };

  useEffect(() => {
    const results = getMostEffectiveEmployees();
    setTopEffective(results);
  }, [employees, tasks]);

  const getAveragePoint = () => {
    if (tasks.length > 0) {
      const averagePoint = tasks.reduce((total, task) => {
        if (task.point) {
          total += parseInt(task.point);
        }
        return total;
      }, 0);
      const dispylayedPoint = (averagePoint / tasks.length).toFixed(2);
      return dispylayedPoint;
    }
  };

  useEffect(() => {
    const showAveragePoints = getAveragePoint();
    setAverageTaskPoint(showAveragePoints);
  }, [tasks]);

  console.log(getAveragePoint());

  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  return (
    <>
      {topEffective.length > 0 && (
        <header>
          <h2 className="text-align p-top2">
            The most effective{" "}
            {topEffective.length === 1 ? "employee" : "employees"} from last
            month
          </h2>
          <div className="most__effective container">
            <MostEffectiveList
              topEffective={topEffective}
              employees={employees}
            />
          </div>
        </header>
      )}
      <hr />
      <main className="main__section">
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
                onKeyDown={(e) =>
                  exceptThisSymbols.includes(e.key) && e.preventDefault()
                }
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

        <hr />

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
                Assigned To :{" "}
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
                Description :{" "}
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Describe task..."
                required="required"
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
      </main>

      {employees.length > 0 && (
        <>
          <hr />
          <article className="container p-y2">
            <h3 className="text-align ">Currently created employees</h3>
            <EmployeeList
              employees={employees}
              removeEmployee={removeEmployee}
              editEmployee={editEmployee}
            />
          </article>
        </>
      )}

      {tasks.length > 0 && (
        <article className="container p-y2">
          <h3 className="text-align ">Currently created tasks</h3>
          <TaskList
            employees={employees}
            tasks={tasks}
            removeTask={removeTask}
            editTask={editTask}
          />
        </article>
      )}

      <div>
        {tasks.length > 0 && (
          <h4 className="text-align">
            Average Points Per Task : {averageTaskPoint}
          </h4>
        )}
      </div>
    </>
  );
}

export default App;

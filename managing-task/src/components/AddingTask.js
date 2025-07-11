import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import USERNavbar from "./USERNavbar";

const AddingTask = () => {
  const email = localStorage.getItem("email"); // get user email from localStorage
  const [tasks, setTasks] = useState([]);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "LOW",
    status: "PENDING",
    email: email, // associate task with user email
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks");
      const userTasks = res.data.filter((task) => task.email === email);
      setTasks(userTasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axiosInstance.put(`/api/tasks/${editId}`, inputs);
        setEditMode(false);
        setEditId(null);
      } else {
        await axiosInstance.post("/api/tasks", inputs);
      }
      setInputs({
        title: "",
        description: "",
        dueDate: "",
        priority: "LOW",
        status: "PENDING",
        email: email,
      });
      fetchTasks();
    } catch (err) {
      alert("Error saving task");
    }
  };

  const handleEdit = (task) => {
    setInputs(task);
    setEditMode(true);
    setEditId(task.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await axiosInstance.delete(`/api/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <>
      <USERNavbar /> 
      <div className="container-fluid">
        <div className="row g-4 p-4">
          {/* Form Section */}
          <div className="col-sm-4">
            <div className="form-section">
              <h3>{editMode ? "Edit Task" : "Add / Update Task"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Task Title"
                    value={inputs.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={inputs.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    name="dueDate"
                    value={inputs.dueDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    name="priority"
                    value={inputs.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    className="form-select"
                    name="status"
                    value={inputs.status}
                    onChange={handleChange}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setEditMode(false);
                      setInputs({
                        title: "",
                        description: "",
                        dueDate: "",
                        priority: "LOW",
                        status: "PENDING",
                        email: email,
                      });
                      setEditId(null);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="col-sm-8">
            <div className="table-section">
              <h3>Your Task List</h3>
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.dueDate}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => handleEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {tasks.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No tasks found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Styling */}
      <style>{`
        body {
          background: linear-gradient(-45deg, #74ebd5, #ACB6E5, #d4a5f9, #fbc2eb);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .form-section, .table-section {
          background-color: rgba(255,255,255,0.95);
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease-in-out;
        }
        .form-section:hover, .table-section:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default AddingTask;

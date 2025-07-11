import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // ✅ with JWT token
import AdminNavbar from "./AdminNavbar";

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axiosInstance.delete(`/api/tasks/${id}`);
        fetchTasks(); // refresh list
      } catch (err) {
        console.error("Error deleting task:", err);
        alert("Failed to delete task.");
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-purple">All Task Details</h2>

        {tasks.length === 0 ? (
          <div className="alert alert-info text-center">No tasks found.</div>
        ) : (
          <div className="row">
            {tasks.map((task) => (
              <div key={task.id} className="col-md-4 mb-4">
                <div className="card shadow task-card">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{task.title}</h5>
                    <p className="card-text">
                      <strong>Description:</strong> {task.description}
                    </p>
                    <p className="card-text">
                      <strong>Due Date:</strong> {task.dueDate}
                    </p>
                    <p className="card-text">
                      <strong>Priority:</strong>{" "}
                      <span className={`badge bg-${getBadgeColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong>{" "}
                      <span className={`badge bg-${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Assigned To:</strong> {task.email}
                    </p>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .task-card {
          border-radius: 15px;
          background-color: #ffffffee;
          transition: transform 0.2s ease-in-out;
        }

        .task-card:hover {
          transform: translateY(-5px);
        }

        .text-purple {
          color: #6a1b9a;
        }

        body {
          background: linear-gradient(135deg, #fbc2eb, #a6c1ee, #e0c3fc);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
};

// Helpers for badge colors
const getBadgeColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "danger";
    case "MEDIUM":
      return "warning";
    case "LOW":
      return "success";
    default:
      return "secondary";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "IN_PROGRESS":
      return "info";
    case "COMPLETED":
      return "success";
    default:
      return "dark";
  }
};

export default ManageTasks;

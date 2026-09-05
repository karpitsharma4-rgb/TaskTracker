import { useState, useEffect, useCallback } from "react";
import * as taskApi from "./api/api";
import SearchFilter from "./components/SearchFilter";
import TaskCard from "./components/TaskCard";
import TaskModal from "./components/TaskModal";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      const res = await taskApi.fetchTasks(params);
      setTasks(res.data.data);
    } catch (err) {
      setError("Could not load tasks. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  // Debounce search input so we don't hit the API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 300);
    return () => clearTimeout(timer);
  }, [loadTasks]);

  const handleAddClick = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        const res = await taskApi.updateTask(editingTask._id, formData);
        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? res.data.data : t))
        );
      } else {
        const res = await taskApi.createTask(formData);
        setTasks((prev) => [res.data.data, ...prev]);
      }
      handleModalClose();
    } catch (err) {
      alert("Failed to save task. Please check the required fields.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  const handleStatusToggle = async (task, newStatus) => {
    try {
      const res = await taskApi.updateTask(task._id, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data.data : t))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Project / Task Tracker
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage tasks across Design, Engineering, and Ops.
        </p>
      </header>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAddClick={handleAddClick}
      />

      {loading && <p className="text-slate-500">Loading tasks...</p>}
      {error && <p className="text-rose-600">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-slate-500">No tasks found. Add your first task above.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            onStatusToggle={handleStatusToggle}
          />
        ))}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </div>
  );
}

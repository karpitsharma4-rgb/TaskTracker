const priorityColor = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

const statusColor = {
  Pending: "bg-slate-100 text-slate-700",
  "In-Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

export default function TaskCard({ task, onEdit, onDelete, onStatusToggle }) {
  const nextStatus = {
    Pending: "In-Progress",
    "In-Progress": "Completed",
    Completed: "Pending",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-3 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-800 break-words">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${priorityColor[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">{task.category}</span>
        <button
          onClick={() => onStatusToggle(task, nextStatus[task.status])}
          className={`px-2 py-1 rounded-full ${statusColor[task.status]} hover:opacity-80 transition`}
          title="Click to advance status"
        >
          {task.status}
        </button>
        {task.dueDate && (
          <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-1 justify-end">
        <button
          onClick={() => onEdit(task)}
          className="text-sm px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-sm px-3 py-1 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

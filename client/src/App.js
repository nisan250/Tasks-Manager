import { useEffect, useMemo, useState } from "react";
import Table from "components/table/Table";
import TableHead from "components/table/TableHead";
import TableRow from "components/table/TableRow";
import TableHeader from "components/table/TableHeader";
import TableBody from "components/table/TableBody";
import TableData from "components/table/TableData";
import TasksStatus from "./components/TasksStatus";
import Button from "components/button/Button";
import TaskAddForm from "components/forms/TaskAddForm";
import TaskFilterForm from "components/forms/TaskFilterForm";
import TaskEditForm from "components/forms/TaskEditForm";
import LoadingSpinner from "components/loader/LoadingSpinner";
import Toast from "components/toast/Toast";
import { TOAST_PROPERTIES } from "./components/toast/ToastProperties";
import { getTasks, updateTask, createTask, deleteTask } from "api/api";
import {
  compareAsc,
  compareDesc,
  differenceInDays,
  format,
  startOfDay,
} from "date-fns";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState({ by: "", dir: "" });
  const [filter, setFilter] = useState({
    status: "",
    fromDate: "",
    toDate: "",
  });

  const showToast = (type, message) => {
    const toastProperties = TOAST_PROPERTIES.find(
      (toast) => toast.title.toLowerCase() === type
    );

    toastProperties.description = message;
    setList([...list, toastProperties]);
  };

  const tasksAmount = useMemo(() => tasks.length, [tasks]);

  const tasksCompleted = useMemo(
    () => tasks.filter((task) => task.isCompleted).length,
    [tasks]
  );

  const tasksRemaining = useMemo(
    () => tasks.filter((task) => !task.isCompleted).length,
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    let tasksClone = [...tasks];

    if (filter.status) {
      const iscompleted = filter.status === "completed" ? 1 : 0;
      tasksClone = tasksClone.filter(
        (task) => task.isCompleted === iscompleted
      );
    }

    if (filter.toDate) {
      const toDateObject = new Date(filter.toDate);
      tasksClone = tasksClone.filter(
        (task) => compareAsc(toDateObject, task.datetime) >= 0
      );
    }

    if (filter.fromDate) {
      const fromDateObject = new Date(filter.fromDate);
      tasksClone = tasksClone.filter(
        (task) => compareAsc(task.datetime, fromDateObject) >= 0
      );
    }

    if (sort.by) {
      tasksClone = tasksClone.sort((a, b) => {
        if (sort.by === "date") {
          return sort.dir === "asc"
            ? compareAsc(a.datetime, b.datetime)
            : compareDesc(a.datetime, b.datetime);
        }

        if (sort.by === "name") {
          return sort.dir === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }

        if (sort.by === "status") {
          return sort.dir === "asc"
            ? Number(b.isCompleted) - Number(a.isCompleted)
            : Number(a.isCompleted) - Number(b.isCompleted);
        }

        return 0;
      });
    }

    return tasksClone;
  }, [tasks, filter, sort]);

  const toggleShowAddForm = () => {
    setShowAddForm((showAddForm) => {
      if (!showAddForm) setShowEditForm(false);
      return !showAddForm;
    });
  };

  const toggleShowEditForm = (task) => {
    setShowEditForm((showEditForm) => {
      if (!showEditForm) setShowAddForm(false);
      return !showEditForm;
    });
    setSelectedTask(task);
  };

  const onCreate = ({ name, datetime }) => {
    setIsLoading(true);

    const newTask = {
      isCompleted: 0,
      name: name,
      datetime: format(new Date(datetime), "yyyy-MM-dd HH:mm:ss"),
    };

    createTask(newTask)
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
        setShowAddForm(false);
        showToast("success", "Task added successfully");
      })
      .catch(() => showToast("danger", "Task Failed to add"))
      .finally(() => setIsLoading(false));
  };

  const onEdit = (editedTask) => {
    setIsLoading(true);

    updateTask(editedTask)
      .then((data) => {
        setTasks((prevTasks) => {
          const tasksClone = [...prevTasks];
          const editedItemIndex = tasksClone.findIndex(
            (task) => task.id === data.id
          );

          tasksClone[editedItemIndex] = data;

          return tasksClone;
        });
        setShowEditForm(false);
        showToast("success", "Task updated successfully");
      })
      .catch(() => showToast("danger", "Task Failed to update"))
      .finally(() => setIsLoading(false));
  };

  const onDelete = (taskId) => {
    setIsLoading(true);
    const task = tasks.find((task) => task.id === taskId);

    if (
      differenceInDays(startOfDay(task.datetime), startOfDay(new Date())) <= 6
    ) {
      showToast("danger", "You can't delete task");
      setIsLoading(false);
      return;
    }

    deleteTask(taskId)
      .then(() => {
        setTasks((prevTasks) => {
          const newTasks = prevTasks.filter((task) => task.id !== taskId);

          return newTasks;
        });
        showToast("success", "Task deleted successfully");
      })
      .catch((err) => showToast("danger", err.message))
      .finally(() => setIsLoading(false));
  };

  const onEditClose = () => {
    setShowEditForm((showEditForm) => !showEditForm);
  };

  const onAddClose = () => {
    setShowAddForm((showEditForm) => !showEditForm);
  };

  useEffect(() => {
    setIsLoading(true);
    getTasks()
      .then((data) => {
        setTasks(data);
        showToast("success", "Tasks fetched successfully");
      })
      .catch((err) => showToast("danger", err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <header>
        <TasksStatus color="#8c8cd9" amount={tasksAmount}>
          Total Tasks
        </TasksStatus>
        <TasksStatus color="#70bb70" amount={tasksCompleted}>
          Tasks Completed
        </TasksStatus>
        <TasksStatus color="#e89e9e" amount={tasksRemaining}>
          Tasks Remaining
        </TasksStatus>
      </header>
      <section>
        <TaskFilterForm filter={filter} setFilter={setFilter} />
        {showEditForm && (
          <TaskEditForm
            onSave={onEdit}
            selectedTask={selectedTask}
            onClose={onEditClose}
          />
        )}
        {showAddForm && <TaskAddForm onSave={onCreate} onClose={onAddClose} />}
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader sort={sort} sortName="name" onSortChange={setSort}>
                Task Name
              </TableHeader>
              <TableHeader sort={sort} sortName="date" onSortChange={setSort}>
                Date
              </TableHeader>
              <TableHeader sort={sort} sortName="status" onSortChange={setSort}>
                Status
              </TableHeader>
              <TableHeader>
                <Button onClick={toggleShowAddForm}>Add New Task</Button>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableData>{task.id}</TableData>
                <TableData>{task.name}</TableData>
                <TableData>
                  {format(task.datetime, "yyyy-MM-dd HH:mm:ss")}
                </TableData>
                <TableData>
                  {task.isCompleted ? "Completed" : "Not Completed"}
                </TableData>
                <TableData>
                  <Button onClick={() => toggleShowEditForm(task)}>Edit</Button>
                  <Button onClick={() => onDelete(task.id)}>Delete</Button>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <Toast
        toastList={list}
        position="bottom-right"
        autoDelete={true}
        autoDeleteTime={3000}
      />
    </div>
  );
}

export default App;

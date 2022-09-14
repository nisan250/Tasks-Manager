import Button from "components/button/Button";
import Modal from "components/modal/Modal";
import { format } from "date-fns";
import { useState } from "react";
import classes from "./Form.module.css";

const TaskEditForm = (props) => {
  const [name, setName] = useState(props.selectedTask.name);
  const [status, setStatus] = useState(props.selectedTask.isCompleted);
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = (e) => {
    setName(e.target.value);
  };

  const statusInputChangeHandler = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    const values = {
      ...props.selectedTask,
      isCompleted: "completed" === status ? true : false,
      name: name,
      datetime: format(props.selectedTask.datetime, "yyyy-MM-dd HH:mm:ss"),
    };

    props.onSave(values);
  };

  const handleCloseForm = () => {
    setName("");
    setStatus("");
    props.onClose();
  };

  return (
    <Modal>
      <form
        className={`${classes["form-wrapper"]} ${classes["form-modal"]}`}
        onSubmit={handleSubmit}
        onReset={handleCloseForm}
      >
        <h1>Edit Task</h1>
        <div className={classes["fields-wrapper"]}>
          <div className={classes["form-field-wrapper"]}>
            <label htmlFor="name">Task Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={nameInputChangeHandler}
            />
          </div>
          {!enteredNameIsValid && (
            <p className={classes["validation-feedback"]}>
              Name must not be empty
            </p>
          )}

          <div className={classes["form-field-wrapper"]}>
            <label htmlFor="status">Task Status</label>
            <select
              id="status"
              onChange={statusInputChangeHandler}
              defaultValue={status ? "completed" : "not-completed"}
            >
              <option value="completed">Completed</option>
              <option value="not-completed">Not Completed</option>
            </select>
          </div>
        </div>

        <div className={classes["buttons-wrapper"]}>
          <Button type="submit">Edit Task</Button>
          <Button type="reset">Close</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskEditForm;

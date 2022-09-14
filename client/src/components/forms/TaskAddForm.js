import Button from "components/button/Button";
import Modal from "components/modal/Modal";
import { useState } from "react";
import classes from "./Form.module.css";

const TaskAddForm = (props) => {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredDateIsValid, setEnteredDateIsValid] = useState(true);

  const nameInputChangeHandler = (e) => {
    setName(e.target.value);
  };

  const dateInputChangeHandler = (e) => {
    setDatetime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {
      setEnteredNameIsValid(true);
    }
    name.trim() !== ""
      ? setEnteredNameIsValid(true)
      : setEnteredNameIsValid(false);

    datetime.trim() !== ""
      ? setEnteredDateIsValid(true)
      : setEnteredDateIsValid(false);

    if (name.trim() === "" || datetime.trim() === "") {
      return;
    }

    const values = {
      datetime: datetime,
      name: name,
    };

    props.onSave(values);
  };

  const handleCloseForm = () => {
    setName("");
    setDatetime("");
    props.onClose();
  };

  return (
    <Modal>
      <form
        className={`${classes["form-wrapper"]} ${classes["form-modal"]}`}
        onSubmit={handleSubmit}
        onReset={handleCloseForm}
      >
        <h1>Add Task</h1>
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
            <label htmlFor="date">Task Date</label>
            <input
              id="date"
              type="datetime-local"
              value={datetime}
              onChange={dateInputChangeHandler}
            />
          </div>
          {!enteredDateIsValid && (
            <p className={classes["validation-feedback"]}>
              Date must not be empty
            </p>
          )}
        </div>
        <div className={classes["buttons-wrapper"]}>
          <Button type="submit">Add Task</Button>
          <Button type="reset">Close</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskAddForm;

import classes from "./TasksStatus.module.css";

const TasksStatus = (props) => {
  return (
    <div className={classes["tasks-status-wrapper"]}>
      <div className={classes["tasks-status-text"]}>{props.children}</div>
      <div
        className={classes["tasks-status-amount"]}
        style={{ color: props.color }}
      >
        {props.amount}
      </div>
    </div>
  );
};

export default TasksStatus;

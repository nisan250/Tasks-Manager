import classes from "./TableRow.module.css";

const TableRow = (props) => {
  return <tr className={classes["table-row"]}>{props.children}</tr>;
};

export default TableRow;

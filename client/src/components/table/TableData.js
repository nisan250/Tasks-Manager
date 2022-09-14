import classes from "./TableData.module.css";

const TableData = (props) => {
  return <td className={classes["table-data"]}>{props.children}</td>;
};

export default TableData;

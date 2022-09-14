import classes from "./Table.module.css";

const Table = (props) => {
  return <table className={classes.table}>{props.children}</table>;
};

export default Table;

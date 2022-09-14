import classes from "./TableHeader.module.css";

const TableHeader = (props) => {
  return (
    <th
      className={
        props.sort
          ? `${classes["table-header"]} ${classes["table-header-clickable"]}`
          : `${classes["table-header"]}`
      }
      onClick={
        props.onSortChange
          ? () =>
              props.onSortChange((current) => ({
                by: props.sortName,
                dir:
                  current.by === props.sortName && current.dir === "asc"
                    ? "desc"
                    : "asc",
              }))
          : undefined
      }
    >
      {props.sort?.by === props.sortName && props.sort?.dir === "asc" && (
        <span>▲</span>
      )}
      {props.sort?.by === props.sortName && props.sort?.dir === "desc" && (
        <span>▼</span>
      )}
      {props.children}
    </th>
  );
};

export default TableHeader;

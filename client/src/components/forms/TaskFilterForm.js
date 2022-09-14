import Button from "components/button/Button";
import classes from "./Form.module.css";

const TaskFilterForm = (props) => {
  const { filter, setFilter } = props;

  const clearForm = () => {
    setFilter({
      status: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <form className={classes["form-wrapper"]} onReset={clearForm}>
      <div className={classes["fields-wrapper"]}>
        <div className={classes["form-field-wrapper"]}>
          <label htmlFor="status">Filter By Status</label>
          <select
            id="status"
            value={filter.status}
            onChange={(e) =>
              setFilter((currentFilter) => ({
                ...currentFilter,
                status: e.target.value,
              }))
            }
          >
            <option value=""></option>
            <option value="completed">Completed</option>
            <option value="not-completed">Not Completed</option>
          </select>
        </div>

        <div className={classes["form-field-wrapper"]}>
          <label htmlFor="fromdate">From Date</label>
          <input
            id="fromdate"
            type="datetime-local"
            value={filter.fromDate}
            onChange={(e) =>
              setFilter((currentFilter) => ({
                ...currentFilter,
                fromDate: e.target.value,
              }))
            }
          />
        </div>

        <div className={classes["form-field-wrapper"]}>
          <label htmlFor="todate">To Date</label>
          <input
            id="todate"
            type="datetime-local"
            value={filter.toDate}
            onChange={(e) =>
              setFilter((currentFilter) => ({
                ...currentFilter,
                toDate: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className={classes["buttons-wrapper"]}>
        <Button type="reset">Clear</Button>
      </div>
    </form>
  );
};

export default TaskFilterForm;

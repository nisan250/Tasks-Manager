import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div>
      <div className={classes["loading-spinner"]}></div>
    </div>
  );
};

export default LoadingSpinner;

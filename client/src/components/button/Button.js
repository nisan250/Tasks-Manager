import classes from "./Button.module.css";

const Button = (props) => {
  const buttonType = props.type ? props.type : "button";

  return (
    <button
      type={buttonType}
      onClick={props.onClick}
      className={classes.button}
    >
      {props.children}
    </button>
  );
};

export default Button;

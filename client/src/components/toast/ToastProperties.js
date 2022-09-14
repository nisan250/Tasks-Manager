import checkIcon from "../../assets/check.svg";
import errorIcon from "../../assets/error.svg";
import infoIcon from "../../assets/info.svg";
import warningIcon from "../../assets/warning.svg";

export const TOAST_PROPERTIES = [
  {
    id: Math.floor(Math.random() * 101 + 1),
    title: "Success",
    description: "This is a success toast component",
    backgroundColor: "#5cb85c",
    icon: checkIcon,
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    title: "Danger",
    description: "This is an error toast component",
    backgroundColor: "#d9534f",
    icon: errorIcon,
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    title: "Info",
    description: "This is an info toast component",
    backgroundColor: "#5bc0de",
    icon: infoIcon,
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    title: "Warning",
    description: "This is a warning toast component",
    backgroundColor: "#f0ad4e",
    icon: warningIcon,
  },
];

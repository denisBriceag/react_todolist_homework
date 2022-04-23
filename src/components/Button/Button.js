import { React } from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const { type, style, onClick, children } = props;
  return (
    <button type={type} className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

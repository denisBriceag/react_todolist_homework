import { React } from "react";
import Button from "../../../Button/Button";
import styles from "./Todoitem.module.css";

const Todoitem = (props) => {
  const deleteHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className={styles["post-item"]}>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      <Button type="button" style={styles.delete} onClick={deleteHandler}>
        Delete item
      </Button>
    </li>
  );
};

export default Todoitem;

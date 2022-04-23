import { React } from "react";
import Todoitem from "./Todoitem/Todoitem";
import styles from "./Todolist.module.css";

const Todolist = (props) => {
  return (
    <ul className={styles.posts}>
      {props.todos.map((todo) => (
        <Todoitem
          key={todo.key}
          id={todo.id}
          title={todo.title}
          body={todo.body}
          onDelete={props.onDeleteItem}
        ></Todoitem>
      ))}
    </ul>
  );
};

export default Todolist;

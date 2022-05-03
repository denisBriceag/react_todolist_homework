import React, { useContext } from "react";
import Todoitem from "./Todoitem/Todoitem";
import styles from "./Todolist.module.css";
import Context from "../contexts/todo-context";

const Todolist = () => {
  const { todoList } = useContext(Context);

  return (
    // <Context.Consumer>
    //   {({ todoList }) => {
    //     return (
    <section>
      <ul className={styles.posts}>
        {todoList?.map((todo) => {
          return (
            <Todoitem
              key={`${Math.random() * 3.14 - 5.11}`}
              id={todo.id}
              title={todo.title}
              body={todo.body}
              time={todo.time}
              completed={todo.completed}
            />
          );
        })}
      </ul>
    </section>
  );
  //     }}
  //   </Context.Consumer>
  // );
};

export default Todolist;

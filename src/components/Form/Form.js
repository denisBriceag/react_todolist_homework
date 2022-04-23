import { React, useState } from "react";
import Button from "../Button/Button";
import styles from "./Form.module.css";
import Todolist from "./TodoList/Todolist";

const Form = () => {
  const [todoList, setTodoList] = useState([]);
  const [enteredTitle, setEnteredValue] = useState("");
  const [enteredBody, setEnteredBody] = useState("");
  const [isValid, setIsValid] = useState(true);

  const titleChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const bodyChangeHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredBody(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.trim().length === 0 || enteredBody.trim().length === 0) {
      setIsValid(false);
      return;
    }

    addTodoHandler(enteredTitle, enteredBody);
    setEnteredValue("");
    setEnteredBody("");
  };

  function addTodoHandler(enteredTitle, enteredBody) {
    setTodoList((prevTodo) => {
      const updatedTodo = [...prevTodo];
      let id = Math.random().toString();
      updatedTodo.unshift({
        key: id,
        id: id,
        title: enteredTitle,
        body: enteredBody,
      });
      return updatedTodo;
    });
    console.log(todoList);
  }

  const deleteTodoHandler = (todoId) => {
    setTodoList((prevTodo) => {
      const updatedTodo = prevTodo.filter((todo) => todo.id !== todoId);
      return updatedTodo;
    });
  };

  const clearTodoHandler = () => {
    let emptyTodo = [...todoList];
    emptyTodo.splice(0, emptyTodo.length);
    setTodoList(emptyTodo);
  };

  let content = <p style={{ textAlign: "center" }}>No tasks added</p>;

  if (todoList.length) {
    content = <Todolist todos={todoList} onDeleteItem={deleteTodoHandler} />;
  }

  return (
    <section id="new-post">
      <form onSubmit={formSubmitHandler}>
        <div
          className={`${styles.formcontrol} ${!isValid ? styles.invalid : ""}`}
        >
          <label>
            <strong>Task title</strong>
          </label>
          <input
            type="text"
            id="title"
            onChange={titleChangeHandler}
            value={enteredTitle}
          />
        </div>
        <div
          className={`${styles.formcontrol} ${!isValid ? styles.invalid : ""}`}
        >
          <label>
            <strong>Description</strong>
          </label>
          <textarea
            rows="3"
            id="content"
            onChange={bodyChangeHandler}
            value={enteredBody}
          ></textarea>
        </div>
        <Button type="submit" style={styles.buttonadd}>
          Add Task
        </Button>
        <Button
          type="button"
          style={styles.buttonclear}
          onClick={clearTodoHandler}
        >
          Clear
        </Button>
      </form>
      <br></br>
      <br></br>
      {content}
    </section>
  );
};

export default Form;

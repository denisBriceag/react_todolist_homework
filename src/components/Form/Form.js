import { React, useContext, useReducer, useEffect, useId } from "react";
import Button from "../Button/Button";
import styles from "./Form.module.css";
import { titleReducer, bodyReducer } from "./reducers/form-reducer";
import Context from "./contexts/todo-context";

const Form = () => {
  const [todoTitleState, dispatchTitle] = useReducer(titleReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });
  const [todoBodyState, dispatchBody] = useReducer(bodyReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });

  useEffect(() => {
    if (todoTitleState.value.length === 0) {
      return;
    }
    let timeOut = setTimeout(() => {
      return localStorage.setItem(
        Math.random().toFixed(2),
        todoTitleState.value
      );
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [todoTitleState.value]);

  const title = useId();
  const body = useId();

  const { addTodoHandler, clearTodoHandler, sectionStyle } =
    useContext(Context);

  const titleChangeHandler = (event) => {
    dispatchTitle({ type: "NEW_TITLE", value: event.target.value.trim() });
  };

  const bodyChangeHandler = (event) => {
    dispatchBody({ type: "NEW_BODY", value: event.target.value.trim() });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submit");
    addTodoHandler(todoTitleState.value, todoBodyState.value);
    dispatchTitle({ type: "AFTER_SUBMIT" });
    dispatchBody({ type: "AFTER_SUBMIT" });
  };

  return (
    // <Context.Consumer>
    //   {({ addTodoHandler, clearTodoHandler }) => {
    //     return (
    <section className={sectionStyle}>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor={title}>
            <strong>Task title</strong>
          </label>
          <input
            type="text"
            id={title}
            onChange={titleChangeHandler}
            onBlur={titleChangeHandler}
            value={todoTitleState.value}
            className={`${styles.formcontrol} ${
              !todoTitleState.isValid && todoTitleState.isTouched
                ? styles.invalidinput
                : ""
            }`}
          />
        </div>

        <div>
          <label htmlFor={body}>
            <strong>Description</strong>
          </label>
          <textarea
            rows="3"
            id={body}
            onChange={bodyChangeHandler}
            onBlur={bodyChangeHandler}
            value={todoBodyState.value}
            className={`${styles.formcontrol} ${
              !todoBodyState.isValid && todoBodyState.isTouched
                ? styles.invalidtextarea
                : ""
            }`}
          ></textarea>
        </div>
        <Button type="submit" style={styles.buttonadd}>
          Add Task
        </Button>
        <Button
          type="button"
          style={styles.buttonclear}
          onClick={clearTodoHandler}
          disabled={false}
        >
          Clear
        </Button>
      </form>
    </section>
  );
  //     }}
  //   </Context.Consumer>
  // );
};

export default Form;

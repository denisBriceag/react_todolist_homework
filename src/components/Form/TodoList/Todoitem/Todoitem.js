import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Button from "../../../Button/Button";
import styles from "./Todoitem.module.css";
import Context from "../../contexts/todo-context";
import moment from "moment";

const Todoitem = (props) => {
  const { id, title, body, time, completed } = props;
  const [editMode, setEditMode] = useState(false);
  const [titleVal, setTitleVal] = useState(title);
  const { deleteTodoHandler, completeTodoHandler, editTask } =
    useContext(Context);
  const editInputRef = useRef();

  const editableFormSubmission = (event) => {
    submitEditedTitle(event);
    setEditMode(false);
  };

  const submitEditedTitle = useCallback(
    (event) => {
      event.preventDefault();
      setTitleVal(event.target.value);
      editTask(id, titleVal);
      setEditMode(false);
    },
    [editTask, titleVal, id]
  );

  const inputEdit = useMemo(
    () =>
      editMode ? (
        <form
          onSubmit={submitEditedTitle}
          id={id}
          className={styles.editableForm}
        >
          <input
            className={styles.editInput}
            type="text"
            value={titleVal}
            onChange={(event) => setTitleVal(event.target.value)}
            onBlur={editableFormSubmission}
            ref={editInputRef}
          />
        </form>
      ) : (
        <h2>{title}</h2>
      ),
    [submitEditedTitle, id, titleVal, editInputRef, title, editMode]
  );

  return (
    // <Context.Consumer>
    //   {({ deleteTodoHandler, completeTodoHandler }) => {
    //     return (
    <li
      className={`
        ${completed ? styles.completed : styles.postitem}
      `}
    >
      <div className={styles.titleContainer}>
        {inputEdit}
        <p style={{ textDecoration: "none" }}>
          {!completed
            ? "Created on " + time
            : "Done on " + moment().format("MMMM Do, h:mm a")}
        </p>
      </div>
      <p>{body}</p>
      <div className={styles.buttonGroup}>
        <Button
          type="button"
          style={styles.delete}
          onClick={() => deleteTodoHandler(id)}
        >
          Delete item
        </Button>
        <Button
          type="button"
          style={styles.complete}
          onClick={() => completeTodoHandler(id)}
        >
          Mark as done
        </Button>

        {!editMode ? (
          <Button
            type="button"
            style={styles.edit}
            onClick={() => {
              setEditMode((prevState) => !prevState);
            }}
          >
            Edit Title
          </Button>
        ) : (
          <Button
            type="button"
            style={styles.confirm}
            onClick={() => {
              setEditMode((prevState) => !prevState);
              editInputRef.current.focus();
            }}
            event
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                setEditMode((prevState) => !prevState);
              } else return;
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </li>
  );
  // }}
  // </Context.Consumer>
  // );
};

export default Todoitem;

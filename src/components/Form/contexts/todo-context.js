import React, { useReducer, useMemo, useCallback } from "react";
import reducer from "../reducers/todo-reducer";

const Context = React.createContext({
  todoList: [],
  addTodoHandler: () => {},
  deleteTodoHandler: (todoId) => {},
  clearTodoHandler: () => {},
  completeTodoHandler: (todoId) => {},
  editTask: (todoId, titleValue) => {},
});

export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    todoList: [],
  });

  const sectionStyle = useMemo(() => {
    return {
      section: {
        width: "40rem",
        maxWidth: "90%",
        margin: "2rem auto",
        border: "1px solid #0096c7",
        borderRadius: "10px",
        padding: "1.5rem",
        backgroundColor: "#0096c7",
        boxShadow: "5px 10px 80px",
      },
    };
  }, []);

  const todoActions = {
    todoList: state.todoList,
    addTodoHandler: useCallback(
      (enteredTitle, enteredBody) => {
        dispatch({ type: "ADD_TODO", enteredTitle, enteredBody });
      },
      [dispatch]
    ),
    deleteTodoHandler: useCallback(
      (todoId) => {
        dispatch({ type: "DELETE_TODO", todoId });
      },
      [dispatch]
    ),
    clearTodoHandler: () => {
      dispatch({ type: "CLEAR_TODO" });
    },
    completeTodoHandler: (todoId) => {
      dispatch({ type: "COMPLETE_TODO", todoId });
    },

    editTask: (todoId, titleValue) => {
      dispatch({ type: "EDIT_TITLE", todoId, titleValue });
    },
    sectionStyle: sectionStyle,
  };

  return (
    <Context.Provider
      value={{
        todoList: todoActions.todoList,
        addTodoHandler: todoActions.addTodoHandler,
        deleteTodoHandler: todoActions.deleteTodoHandler,
        clearTodoHandler: todoActions.clearTodoHandler,
        completeTodoHandler: todoActions.completeTodoHandler,
        editTask: todoActions.editTask,
        sectionStyle: todoActions.sectionStyle,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;

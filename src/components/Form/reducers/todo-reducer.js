import moment from "moment";

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_TODO": {
      if (state?.todoList) {
        return {
          todoList: [
            ...state.todoList,
            {
              id: moment(),
              title: action.enteredTitle,
              body: action.enteredBody,
              time: moment().format("MMMM Do, h:mm a"),
              completed: false,
            },
          ],
        };
      }
      return {
        todoList: [
          {
            id: moment(),
            title: action.enteredTitle,
            body: action.enteredBody,
            time: moment().format("MMMM Do, h:mm a"),
            completed: false,
          },
        ],
      };
    }
    case "DELETE_TODO": {
      const updatedTodo = state.todoList?.filter(
        (todo) => todo.id !== action.todoId
      );
      return { todoList: updatedTodo };
    }
    case "COMPLETE_TODO": {
      const todolist = state.todoList?.map((todo) => {
        if (todo.id === action.todoId) {
          return {
            id: todo.id,
            title: todo.title,
            body: todo.body,
            time: todo.time,
            completed: !todo.completed,
          };
        } else return todo;
      });
      console.log(todolist);
      return { todoList: todolist };
    }
    case "CLEAR_TODO": {
      console.log("clear");
      return { todoList: [] };
    }

    case "EDIT_TITLE": {
      const todolist = state.todoList?.map((todo) => {
        if (todo.id === action.todoId) {
          return {
            id: todo.id,
            title: action.titleValue,
            body: todo.body,
            time: todo.time,
            completed: todo.completed,
          };
        } else return todo;
      });
      return { todoList: todolist };
    }

    default:
      return state;
  }
};

export default reducer;

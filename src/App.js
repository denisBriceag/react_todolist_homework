import "./App.css";
import Form from "./components/Form/Form";
import Context from "./components/Form/contexts/todo-context";
import Todolist from "./components/Form/TodoList/Todolist";
import { useContext, useMemo } from "react";

function App() {
  const { todoList } = useContext(Context);

  return (
    <div className="App">
      <Form />
      {!!todoList.length && <Todolist />}
    </div>
  );
}

export default App;

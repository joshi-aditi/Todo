import { useState } from "react";
import "./App.css";

//type of todo define.
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [input, setInput] = useState<string>(""); //usestate values type defined.
  const [todos, setTodos] = useState<Todo[]>([]); //usestate values type defined.

  const addTodo = () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      setInput("");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(), //using length as id may cause issues.
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const toggleCompleted = (id: number) => {
    //parameters type defined.
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    //parameters type defined.
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="title">Todo App</h1>

      <div className="input-section">
        <input
          placeholder="Enter a Todo"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-input"
        />

        <button onClick={addTodo} className="add-btn">
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <label className="todo-left">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
              />
              <span className={todo.completed ? "strike" : ""}>
                {todo.text}
              </span>
            </label>

            <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

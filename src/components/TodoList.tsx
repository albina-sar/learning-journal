import { useState } from "react";
import type { Todo } from "./type";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Купить хлеб", isDone: false },
    { id: 2, text: "Позвонить маме", isDone: false },
    { id: 3, text: "Сделать зарядку", isDone: false },
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.isDone;
    if (filter === "done") return todo.isDone;
    return true;
  });

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAdd = () => {
    if (text.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text,
      isDone: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      }),
    );
  };

  return (
    <div>
      <button onClick={() => setFilter("all")}>Все</button>
      <button onClick={() => setFilter("active")}>Активные</button>
      <button onClick={() => setFilter("done")}>Выполненные</button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.text}
            {/* Передаем todo.id */}
            <button onClick={() => handleDelete(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onChange={handleChange}
        value={text}
        placeholder="Введите текст"
      />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}

export default TodoList;

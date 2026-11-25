import { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    "Купить хлеб",
    "Позвонить маме",
    "Сделать зарядку",
  ]);

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  return (
    <div>
      <ul>
        {todos.map((t, index) => (
          <li key={t}>
            {t}
            <button onClick={() => handleDelete(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

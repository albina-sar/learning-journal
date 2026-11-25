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

  const handleAdd = () => {
    setTodos([...todos, "Новая задача"]);
  };
  return (
    <div>
      <button onClick={handleAdd}>Добавить</button>
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

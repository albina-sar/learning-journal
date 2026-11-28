import { useState } from "react";
import styles from "./TodoList.module.css";
import { type Task } from "./type";

function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Купить хлеб", done: false, priority: "low" },
    { id: 2, title: "Позвонить маме", done: false, priority: "high" },
    { id: 3, title: "Помыть машину", done: false, priority: "medium" },
  ]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("low");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.currentTarget.value as Task["priority"]);
  };
  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      }),
    );
  };

  const handleAdd = () => {
    if (text.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: text,
      done: false,
      priority,
    };
    setTasks((prev) => [...prev, newTask]);
    setText("");
  };

  const handleReset = () => {
    setTasks((prev) => prev.filter((task) => task.done === false));
  };

  return (
    <div className={styles.container}>
      <h2>Список дел 📜</h2>
      {tasks.length === 0 ? (
        <p>"Нет задач. Добавьте первую! 🎯"</p>
      ) : (
        tasks.map((t) => (
          <li
            key={t.id}
            className={styles.li}
            style={{
              textDecoration: t.done ? "line-through" : "",
              color:
                t.priority === "low"
                  ? "blue"
                  : t.priority === "medium"
                    ? "orange"
                    : "red",
            }}
          >
            <input type="checkbox" onChange={() => handleToggle(t.id)} />
            {t.title} {t.priority}
            <button
              className={styles.liButton}
              onClick={() => handleDelete(t.id)}
            >
              ❌
            </button>
          </li>
        ))
      )}
      <button className={styles.resetButton} onClick={handleReset}>
        Очистить выполненные
      </button>
      <p>Выполнено задач: ? из {tasks.length}</p>
      <div className={styles.addButton}>
        <input
          type="text"
          value={text}
          placeholder="Введите текст"
          onChange={handleChangeInput}
          className={styles.input}
        />
        <select
          name="Приоритет"
          id=""
          value={priority}
          onChange={handleChangeSelect}
          className={styles.select}
        >
          <option style={{ color: "blue" }} value="low">
            Низкий
          </option>
          <option style={{ color: "orange" }} value="medium">
            Средний
          </option>
          <option style={{ color: "red" }} value="high">
            Высокий
          </option>
        </select>
        <button className={styles.button} onClick={handleAdd}>
          Добавить
        </button>
      </div>
    </div>
  );
}

export default TodoList;

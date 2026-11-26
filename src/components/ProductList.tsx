import { useState } from "react";
import { type Product } from "./type";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Хлеб", price: 50 },
    { id: 2, name: "Молоко", price: 80 },
    { id: 3, name: "Сыр", price: 300 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    const priceNum = Number(price)
    if (name.trim() === "" || price.trim() === "" || Number.isNaN(priceNum)) return;
    const newProduct = {
      id: Date.now(),
      name,
      price: priceNum,
    };
    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setPrice("");
  };

  const allProductsPrice = products.reduce(
    (acc, currentValue) => acc + currentValue.price,
    0,
  );
  return (
    <div>
      <h2>Список покупок 🗑️</h2>
      <button onClick={() => setProducts([])}>Очистить все</button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} {p.price} р.{" "}
            <button onClick={() => handleDelete(p.id)}>❌</button>
          </li>
        ))}
      </ul>
      <p>Всего на сумму: {allProductsPrice}</p>
      <h4>Добавить продукт</h4>
      <div>
        <input
          type="text"
          value={name}
          placeholder="Введите название"
          onChange={handleChangeName}
        />
        <input
          type="number"
          value={price}
          placeholder="Введите цену"
          onChange={handleChangePrice}
        />
        <button onClick={handleAdd}>✅ Добавить</button>
      </div>
    </div>
  );
}

export default ProductList;

import { useState } from "react";
import "./index.css";

const initialItems = [
  { id: 1, description: "apples", quantity: 2, bought: false },
  { id: 2, description: "chicken", quantity: 3, bought: true },
  { id: 3, description: "spinach", quantity: 1, bought: false },
  { id: 4, description: "yogurt", quantity: 10, bought: false },
  { id: 5, description: "protein bars", quantity: 5, bought: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <GroceryList />
      <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>Grocery List 🛒</h1>
    </div>
  );
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = { description, quantity, bought: false, id: Date.now() };

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>What do you need from the store?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="select"
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="text"
        placeholder="add item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button className="btn">ADD</button>
    </form>
  );
}

function GroceryList() {
  return (
    <div>
      <ul>
        {initialItems.map((i) => (
          <Item i={i} key={i.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ i }) {
  return (
    <li className="items">
      <span style={i.bought ? { textDecoration: "line-through" } : {}}>
        {i.description} {i.quantity}
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="footer">
      {initialItems.length >= 5 ? (
        <message>{`You have ${initialItems.length} items on your list. Time to go shopping!`}</message>
      ) : (
        <message>{`You have ${initialItems.length} items on your list.`}</message>
      )}
    </footer>
  );
}

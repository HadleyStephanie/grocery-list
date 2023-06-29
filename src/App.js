import { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "apples", quantity: 2, bought: false },
//   { id: 2, description: "chicken", quantity: 3, bought: true },
//   { id: 3, description: "spinach", quantity: 1, bought: false },
//   { id: 4, description: "yogurt", quantity: 10, bought: false },
//   { id: 5, description: "protein bars", quantity: 5, bought: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to clear your entire list?"
    );

    if (confirmed) {
      setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <GroceryList
        items={items}
        onDeleteItems={handleDelete}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>The Grocery List 🛒</h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      return;
    }

    const newItem = { description, quantity, bought: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

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

function GroceryList({ items, onDeleteItems, onToggleItem, onClearList }) {
  return (
    <div className="grocery-list">
      <ul>
        {items.map((i) => (
          <Item
            i={i}
            key={i.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <button className="btn2" onClick={onClearList}>
        Clear List
      </button>
    </div>
  );
}

function Item({ i, onDeleteItems, onToggleItem }) {
  return (
    <li className="items">
      <input
        type="checkbox"
        value={i.bought}
        onChange={() => onToggleItem(i.id)}
      />
      <span style={i.bought ? { textDecoration: "line-through" } : {}}>
        {i.description}({i.quantity})
      </span>
      <button className="button" onClick={() => onDeleteItems(i.id)}>
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="footer">
        <em>Start adding groceries to your list!</em>
      </p>
    );
  }
  const numItems = items.length;
  const numBought = items.filter((item) => item.bought).length;
  const numToBuy = numItems - numBought;

  return (
    <footer className="footer">
      {numToBuy >= 5 ? (
        <em>{`You have ${numToBuy} items on your list. Time to go shopping!`}</em>
      ) : (
        <em>{`You have ${numToBuy} items on your list!`}</em>
      )}
    </footer>
  );
}
//OLD FOOTER MESSAGE

// {items.length >= 5 ? (
//   <em>{`You have ${items.length} items on your list. Time to go shopping!`}</em>
// ) : (
//   <em>{`You have ${items.length} items on your list.`}</em>
// )}

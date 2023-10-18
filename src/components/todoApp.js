import React, { useState } from "react";
import "./TodoApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function TodoApp() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleInputChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim() !== "") {
      setItems([...items, { name: newItem, quantity: 1 }]);
      setNewItem("");
    }
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity++;
    setItems(updatedItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 0) {
      updatedItems[index].quantity--;
  
      if (updatedItems[index].quantity === 0) {
        // Si la cantidad llega a 0, elimina el artículo
        updatedItems.splice(index, 1);
      }
  
      setItems(updatedItems);
    }
  };
  

  const handleClearCart = () => {
    setItems([]);
  };
  
  

  return (
    <div className="containerTodo">
      <div className="background-image"></div>
      <div className="shopping-list">
        <h1>Lista de la compra</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Agregar un artículo a la lista"
            value={newItem}
            onChange={handleInputChange}
          />
          <button type="submit" className="add-button">
            Agregar
          </button>
        </form>
        <ul>
  {items.map((item, index) => (
    <li key={index} className="list-item">
      <div className="item-info">
        <div className="item-name">{item.name}</div>
        <span className="quantity">
          <button className="adjust-button" onClick={() => handleDecreaseQuantity(index)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          {item.quantity}
          <button className="adjust-button" onClick={() => handleIncreaseQuantity(index)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </span>
      </div>
      <button className="delete-button" onClick={() => handleDelete(index)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </li>
  ))}
</ul>

        {items.length > 0 && (
          <a className="clear-cart-button custom-link" onClick={handleClearCart}>
            Vaciar cesta
          </a>
        )}
      </div>
    </div>
  );
}

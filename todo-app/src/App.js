import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function Banner() {
  return (
    <h1>Todo Example with React</h1>
  )
}
function ToDoFormAndList() {
  const [itemText, setItemText] = useState(""); 
  const [items, setItems] = useState([]); 
  const handleSubmit = (event) => {
    // prevent normal submit event
    event.preventDefault();
    // add item to items, Math.random() is used to generate "unique" ID...
    setItems([...items, {id: Math.random(), text: itemText}])
    // modify newItem text to ""
    setItemText("")
  }
  const removeItem = (id) => {
    // filter/remove item with id
    const newItems = items.filter(item => item.id !== id);
    // set new items
    setItems(newItems);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Write a new todo here" value={itemText}
        onChange={event => setItemText(event.target.value)} />
        <input type='submit' value='Add'/>
      </form>
      <ul>
  {items.map(item => (
    <li key={item.id}>
      {item.text+" "} <span onClick={() => removeItem(item.id)}> x </span>
    </li>
  ))}
</ul> 
    </div>
  )  
}
function App() {
  return (
    <div>
      <p>Hello React!</p>
      <Banner/>
      <ToDoFormAndList/>
    </div>
  );
}

export default App;

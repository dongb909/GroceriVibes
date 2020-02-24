import React from 'react';


const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty, }) => (
  <div id="BrowseContainer">
    {/* still need to build these handlers and place in props */}
    {/* <span><button onClick={refreshButtonHandler}>All items</button><span>
    <span>
      <form onSubmit={categorySubmitHandler}>
      <select value={category} onChange={categoryChangeHandler}>
          <option value="drinks">drinks</option>
          <option value="fruits">fruits</option>
          <option value="bakery">bakery</option>
          <option value="produce">produce</option>
        </select>
        <input type="submit" value="Submit"/>
      </form>
    </span> */}
    {list.map(item => (
      <Item {...item}  itemQtyChangeHandler={itemQtyChangeHandler} addToCartHandler={addToCartHandler} qty={qty}/>
    ))}
  </div>
)

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <div className="item" key={id}> 
    <span name="item"> {item}</span>
    <span name="category"> {category}</span>
    <span name="quantity"> {quantity}</span>
    <span name="price"> {price}</span>
    <form onSubmit={(e) => {
      e.preventDefault();
      addToCartHandler(id);
      }}>
      <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
      <button name="addToCart">Add to cart</button>
    </form>
  </div>
)

 
export default Browse;
import React from 'react';


const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <div id="BrowseContainer">
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
      e.preventDefault()
      addToCartHandler(id)
      }}>
      <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
      <button name="addToCart">Add to cart</button>
    </form>
  </div>
)

 
export default Browse;
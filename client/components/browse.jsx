import React from 'react';


const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty, checkoutHandler}) => (
  <div id="BrowseContainer">
    {list.map(item => (
      <Item {...item}  itemQtyChangeHandler={itemQtyChangeHandler} addToCartHandler={addToCartHandler} qty={qty}/>
      ))}
    <button id="checkoutButton" onClick={checkoutHandler}>Checkout</button>
  </div>
)

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <div className="item" key={id}> 
    <span name="item" className="col-8"> {item}</span>
    <span name="category" className="col-4"> {category}</span>
    <span name="quantity" className="col-4"> {quantity}</span>
    <span name="price" className="col-4"> {price}</span>
    <span className="col-4">  
      <form onSubmit={(e) => {
        e.preventDefault();
        addToCartHandler(id);
        }}>
        <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
        <button name="addToCart">Add to cart</button>
      </form>
    </span>
  </div>
)

 
export default Browse;
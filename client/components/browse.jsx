import React from 'react';
import styled from 'styled-components';

const Banner = styled.h2 `
  line-height:100px;
  text-align:center;
`
const Container = styled.div `
  margin-left:200px;
  margin-right:200px;
`


const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty, checkoutHandler}) => (
  <div id="BrowseContainer">
    <Banner>Start adding items to your cart</Banner>
    <Container>
      {list.map(item => (
        <Item {...item}  itemQtyChangeHandler={itemQtyChangeHandler} addToCartHandler={addToCartHandler} qty={qty}/>
        ))}
      <button id="checkoutButton" onClick={checkoutHandler}>Checkout</button>
    </Container>
  </div>
)

const EachItem = styled.div`
  border: 2px solid black;
`

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <EachItem className="item" key={id}> 
    <span name="item" className="col-8"> {item}</span>
    <span name="category" className="col-4"> {category}</span>
    <span name="quantity" className="col-4"> {quantity}</span>
    <span name="price" className="col-4"> {price}</span> 
      <form onSubmit={(e) => {
        e.preventDefault();
        addToCartHandler(id);
        }}>
        <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
        <button name="addToCart">Add to cart</button>
      </form>
  </EachItem>
)

 
export default Browse;
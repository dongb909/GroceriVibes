import React from 'react';
import styled from 'styled-components';
import Search from './search'

const Banner = styled.h2 `
  line-height:100px;
  text-align:center;
  background-color: rgba(255,255,255,0.85);
  color: black;
  background-position: center;
`

const MainContainer = styled.div `
  margin-left:20%;
  margin-right:20%;
  background-color: rgba(255,255,255,0.85);
  color: black;
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-rows: 100px;
`
const ItemContainer = styled.div `
  border: black 1px solid;
  text-align: center;
`
const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty, checkoutHandler}) => (
  <div id="BrowseContainer">
    <Banner>Start adding items to your cart</Banner>
    <Search />
    <MainContainer>
      {list.map(item => (
        <Item {...item}  itemQtyChangeHandler={itemQtyChangeHandler} addToCartHandler={addToCartHandler} qty={qty}/>
        ))}
      <button id="checkoutButton" onClick={checkoutHandler}>Checkout</button>
    </MainContainer>
  </div>
)

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <ItemContainer> 
    <p name="item" > Item: {item}</p>
    <p name="category" > Category: {category}</p>
    <p name="quantity" >Quantity: {quantity}</p>
    <p name="price">Price: ${price}</p> 
    <form onSubmit={(e) => {
      e.preventDefault();
      addToCartHandler(id);
      }}>
      <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
      <button name="addToCart">Add to cart</button>
    </form>
  </ItemContainer>
)

 
export default Browse;
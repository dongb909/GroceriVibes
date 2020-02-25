import React from 'react';
import styled from 'styled-components';
import Search from './search'
import Img from './images'


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
  color: black;
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-rows: auto;
`
const ItemContainer = styled.div `
  border: black 1px solid;
  background-color: rgba(255,255,255,0.85);
  text-align: center;
  padding: 20px;

`
const CellItem = styled.h5 `
  line-height: 1;
`
const CellContent = styled.p `
  line-height: 0.5;

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
    <Img id={id}/>
    <CellItem name="item" > {item}</CellItem>
    <CellContent name="category" > Category: {category}</CellContent>
    <CellContent name="quantity" >Quantity: {quantity ? quantity : 'SOLD OUT'}</CellContent>
    <CellContent name="price">Price: ${price}</CellContent> 
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

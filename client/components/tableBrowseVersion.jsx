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
`
const ItemContainer = styled.div `
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;

`
const Column = styled.span `
  flex:1;
  text-align: center;
`
const Cell = styled.span `
  flex:1;
  border: black 1px solid;
  margin-top: -1px;
  margin-left: -1px;
  text-align: center;
  line-height:1;
`
const Browse = ({list, itemQtyChangeHandler, addToCartHandler, qty, checkoutHandler}) => (
  <div id="BrowseContainer">
    <Banner>Start adding items to your cart</Banner>
    <MainContainer>
      <Search />
      <ItemContainer>
        <Column>Item</Column>
        <Column>Category</Column>
        <Column>Quanity Available</Column>
        <Column>Price</Column>
        <Column>Units</Column>
      </ItemContainer>
      {list.map(item => (
        <Item {...item}  itemQtyChangeHandler={itemQtyChangeHandler} addToCartHandler={addToCartHandler} qty={qty}/>
        ))}
      <button id="checkoutButton" onClick={checkoutHandler}>Checkout</button>
    </MainContainer>
  </div>
)

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <ItemContainer> 
    <Cell name="item" > {item}</Cell>
    <Cell name="category" >{category}</Cell>
    <Cell name="quantity" >{quantity}</Cell>
    <Cell name="price">{price}</Cell> 
    <Cell>  
      <form onSubmit={(e) => {
        e.preventDefault();
        addToCartHandler(id);
        }}>
        <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]}/>
        <button name="addToCart">Add to cart</button>
      </form>
    </Cell>
  </ItemContainer>
)

 
export default Browse;
import React, {Component} from 'react';
import styled from 'styled-components';
import Img from './images';
import PageNav from './pagination';
import Category from './category';
import {setPageCookie} from '../utilities';

const Banner = styled.h2`
  line-height:100px;
  text-align:center;
  background-color: rgba(255,255,255,0.85);
  color: black;
  background-position: center;
`;

const MainContainer = styled.div`
  margin-left:20%;
  margin-right:20%;
  color: black;
  display:grid;
  grid-template-columns: repeat(3,1fr);
  grid-auto-rows: auto;
`;
const ItemContainer = styled.div`
  border: black 1px solid;
  background-color: rgba(255,255,255,0.85);
  text-align: center;
  padding: 20px;

`;
const CellItem = styled.h5`
  line-height: 1;
`;
const CellContent = styled.p`
  line-height: 0.5;

`;
class Browse extends Component {
  componentDidMount(){
    console.log("this is browse component")
    setPageCookie('browse');
  }
  render() {
    const {list, itemQtyChangeHandler, addToCartHandler, qty, checkoutHandler, pageChangeHandler, pageNumber, categoryHandler, category} = this.props

    //Category filtering
    const displayList = (category !== "all items") ?
      list.filter(item => item.category === category):
      list

      
      const pagesNeeded = Math.ceil(displayList.length/6) + 1;
      const pages = [];
      for (let i = 1; i < pagesNeeded; i++){
        pages.push(i);
      };
      const indexStart = (pageNumber - 1) * 6;
      const indexEnd = pageNumber * 6;
      // console.log(`pages `, pages)
      const miniList = displayList.slice(indexStart, indexEnd);

    return (
      <div id="BrowseContainer">
        <Banner>Start adding items to your cart</Banner>
        <Category categoryHandler={categoryHandler} category={category}/>
        <MainContainer>
          {miniList.map((item) => {
            return <Item
              {...item}
              itemQtyChangeHandler={itemQtyChangeHandler}
              addToCartHandler={addToCartHandler}
              qty={qty}
              key={item.id}
            />
          })}
          <button type="submit" id="checkoutButton" onClick={checkoutHandler}>Checkout</button>
        </MainContainer>
        <PageNav pageChangeHandler={pageChangeHandler} pages={pages}/>
      </div>
    );
}
}

const Item = ({id, item, category, quantity, price, itemQtyChangeHandler, addToCartHandler, qty}) => (
  <ItemContainer> 
    <Img id={id}/>
    <CellItem name="item">
      {item}
    </CellItem>
    <CellContent name="category">
      Category:
      {category}
    </CellContent>
    <CellContent name="quantity">
      Quantity:
      {quantity ? quantity : 'SOLD OUT'}
    </CellContent>
    <CellContent name="price">
      Price: $
      {price}
    </CellContent>
    <form onSubmit={(e) => {
      e.preventDefault();
      addToCartHandler(id);
    }}
    >
      <input type="number" name="qty" id={id} min="1" max={quantity} onChange={itemQtyChangeHandler} value={qty[id]} />
      <button type="submit" name="addToCart">
        Add to cart
      </button>
    </form>
  </ItemContainer>
);

export default Browse;

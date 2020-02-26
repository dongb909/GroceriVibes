import React from 'react';
import styled from 'styled-components';

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
  background-color: rgba(255,255,255,0.85);
  color: black;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
`;

const Column = styled.span`
  flex:1;
  text-align: center;
`;

const Cell = styled.span `
  flex:1;
  border: black 1px solid;
  margin-top: -1px;
  margin-left: -1px;
  text-align: center;
`;

const CheckoutTotal = styled.span`
flex:3;
border: black 1px solid;
margin-top: -1px;
margin-left: -1px;
text-align: center;
`;

const Cart = ({checkout, backToBrowseHandler}) => {
  let checkoutTotal = 0;
  const accumulatedItems = checkout.reduce((acc, currItem) => {
    const { quantity: totalItemQty, item, price: unitPrice } = currItem;
    // saving each item as {item: [unitPrice, totalItemQty, totalItemCost]}
    const totalItemCost = totalItemQty * unitPrice;
    if (acc[item]) {
      acc[item][1] += totalItemQty;
      acc[item][2] += totalItemCost;
    } else {
      acc[item] = [unitPrice, totalItemQty, totalItemCost];
    }
    checkoutTotal += totalItemCost;
    return acc;
  }, {});

  return (
    <div id="cart"> 
      <Banner>Your cart</Banner>
      <button type="button" onClick={backToBrowseHandler}>Back</button>
      <MainContainer>
        <ItemContainer>
          <Column>Item</Column>
          <Column>Unit Price</Column>
          <Column>Total Units</Column>
          <Column>Item Total</Column>
        </ItemContainer>
        {Object.entries(accumulatedItems).map(
          (entry) => {
            const [item, [unitPrice, totalItemQty, totalItemCost]] = entry;
            return (
              <ItemContainer>
                <Cell name="item">
                  {item}
                </Cell>
                <Cell name="category">
                  $
                  {unitPrice}
                </Cell>
                <Cell name="quantity">
                  {totalItemQty}
                </Cell>
                <Cell name="price">
                  $
                  {totalItemCost.toFixed(2)}
                </Cell>
              </ItemContainer>
            );
          },
        )}
        <ItemContainer>
          <CheckoutTotal>Checkout Total</CheckoutTotal>
          <Cell>
            $
            {checkoutTotal.toFixed(2)}
          </Cell>
        </ItemContainer>
      </MainContainer>
    </div>
  );
};

export default Cart;

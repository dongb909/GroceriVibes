const React = require("react")

const Cart = ({checkout}) =>  {
  const accumulatedItems = checkout.reduce((acc, currItem) => {
    const {quantity, item, unitPrice} = currItem
    // saving each item as {item: [0:total qty, 1:total price, 2:unit price]}
    const currTotal = quantity * unitPrice
    if (acc[item]) {
      currTotal = 
      acc[item][0] = acc[item][0] + quantity;
      acc[item][1] = acc[item][1] + currTotal;
    } else {
      acc[item] = [totalItemQty, totalItemCost, unitPrice]
    }
  },{})
  console.log("accumulated Items from cart"), accumulatedItems)
  
  return (
    <div id="cart"> 
      <table>
        <thead>
          <tr>
            <th scope="col">ITEM</th>
            <th scope="col">UNIT PRICE</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(accumulatedItems).map(
            entry => {
              const [item, prices] = entry
              const [totalItemQty, totalItemCost, unitPrice] = prices
              return (
                <tr>
                  <td>{item}</td>
                  <td>{unitPrice}</td>
                  <td>{totalItemQty}</td>
                  <td>{totalItemCost}</td>
                </tr>
              )
            })
            
          }
        </tbody>
      </table>
    </div>
  )
}


 
export default Cart;

//go through items and reduce to 1 line and then return new arr to display but not updating 
//display new arr wty, item, total item price, at bottom total price. checkout button

const  = () => {
  return (  );
}
 
export default ;
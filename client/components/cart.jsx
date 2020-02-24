const React = require("react")

const Cart = ({checkout}) =>  {
  const accumulatedItems = checkout.reduce((acc, currItem) => {
    const {quantity:totalItemQty, item, price:unitPrice} = currItem
    // saving each item as {item: [unitPrice, totalItemQty, totalItemCost]}
    console.log("currentItem from cart", currItem);
    const totalItemCost = totalItemQty * unitPrice
    // console.log("accumulator", acc)
    if (acc.item) {
      acc.item[1] = acc.item[1] + totalItemQty;
      acc.item[2] = acc.item[2] + totalItemCost;
    } else {
      acc[item] = [unitPrice, totalItemQty, totalItemCost]
      console.log("updated accumulartor", acc)
    }
    return acc
  },{})
  console.log("accumulated Items from cart", accumulatedItems)
  
  return (
    <div id="cart"> 
      <table>
        <thead>
          <tr>
            <th scope="col">ITEM</th>
            <th scope="col">UNIT PRICE</th>
            <th scope="col">TOTAL UNITS</th>
            <th scope="col">ITEM TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(accumulatedItems).map(
            entry => {
              const [item, [unitPrice, totalItemQty, totalItemCost]] = entry
              return (
                <tr>
                  <td>{item}</td>
                  <td>${unitPrice}</td>
                  <td>{totalItemQty}</td>
                  <td>${totalItemCost}</td>
                </tr>
              )
            })
          }
          <tr>
          </tr>
          <tr>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>Final total</td>
            <td>$</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


 
export default Cart;

//go through items and reduce to 1 line and then return new arr to display but not updating 
//display new arr wty, item, total item price, at bottom total price. checkout button


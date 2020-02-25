import React from 'react';
const base = "https://grocerivibes.s3-us-west-1.amazonaws.com/"

const images = {
  1: base + "apple.jpg",
  2: base + "avocado.jpg",
  3: base + "brownie.jpg",
  4: base + "bread.jpg",
  5: base + "oatmilk.jpg",
  6: base + "butterlettuce.jpg",
  7: base + "tea.jpg",
  8: base + "chicken.jpg",
  9: base + "steak.jpg",
  10: base + "broccoli.jpg",
  11: base + "tomato.jpg",
  12: base + "watermelon.jpg"
}


const Image = ({id}) => (
    <img src={images[id]} alt="Logo" />
)
 
export default Image;
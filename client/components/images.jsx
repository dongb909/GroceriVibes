import React from 'react';

const images = {
  1: 'https://grocerivibes.s3-us-west-1.amazonaws.com/apple.jpg',
  2: 'https://grocerivibes.s3-us-west-1.amazonaws.com/avocado.jpg',
  3: 'https://grocerivibes.s3-us-west-1.amazonaws.com/brownie.jpg',
  4: 'https://grocerivibes.s3-us-west-1.amazonaws.com/bread.jpg',
  5: 'https://grocerivibes.s3-us-west-1.amazonaws.com/oatmilk.jpg',
  6: 'https://grocerivibes.s3-us-west-1.amazonaws.com/butterlettuce.jpg',
  7: 'https://grocerivibes.s3-us-west-1.amazonaws.com/tea.jpg',
  8: 'https://grocerivibes.s3-us-west-1.amazonaws.com/chicken.jpg',
  9: 'https://grocerivibes.s3-us-west-1.amazonaws.com/steak.jpg',
  10: 'https://grocerivibes.s3-us-west-1.amazonaws.com/broccoli.jpg',
  11: 'https://grocerivibes.s3-us-west-1.amazonaws.com/tomato.jpg',
  12: 'https://grocerivibes.s3-us-west-1.amazonaws.com/watermelon.jpg',
};


const Image = ({ id }) => (
  <img src={images[id]} alt="Item" />
);

export default Image;

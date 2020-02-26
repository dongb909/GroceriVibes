import React from 'react';
import styled from 'styled-components';

const DisplayChoice = styled.div`
  display: flex;
`;
const Button = styled.button`
  flex:1;
`;
const Form = styled.form`
  flex:1;
`;

const Search = ({category, displayAllHandler, selectHandler}) => (
  <DisplayChoice>
    <Button onClick={displayAllHandler}>Display all items</Button>
    <Form>
      <select value={category} onChange={selectHandler}>
        <option name="option" value="selectCategory">--Select category--</option>
        <option name="option" value="fruits">Fruits</option>
        <option name="option" value="bakery">Bakery</option>
        <option name="option" value="drinks">Drinks</option>
        <option name="option" value="produce">Produce</option>
        <option name="option" value="meat">Meat</option>
      </select>
    </Form>
  </DisplayChoice>
);


export default Search;

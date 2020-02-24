import React from 'react';
import styled, {keyframes} from 'styled-components';


// const Slider = styled.div`
//   background-repeat: no-repeat;
//   background-size:cover;
//   background-position: center;
//   width:100%;
//   height: 100%;
  /* animation: ${keyFrame} 40s infinite; */

const Wrapper = styled.div `
  left: 50%;
  top:50%;
  transform: translate(-50%, -50%);
  position: absolute;
  letter-spacing: 5px;
  text-align:center;
  background-color: rgba(255,255,255,0.5);
  color: black;
`

const Login = (props) => (
  <Wrapper>
    <h1>WELCOME TO GROCERIVIBES!</h1>
    <form onSubmit={props.loginSubmitHandler}>  
      <input type="text" name="username" placeholder="Enter full name to start shopping!" onChange={props.loginChangeHandler} value={props.username}/>
      <input type="submit" value="submit"/>
    </form>
  </Wrapper>
)
 
export default Login;
//form on submit
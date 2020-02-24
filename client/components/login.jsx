import React from 'react';


const Login = (props) => (
  <form onSubmit={props.loginSubmitHandler}> 
    <label> Name 
    <input type="text" name="username" placeholder="Enter full name" onChange={props.loginChangeHandler} value={props.username}/>
    </label>
    <input type="submit" value="submit"/>
  </form>
)
 
export default Login;
//form on submit
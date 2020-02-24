import React, {Component} from 'react';
import axios from 'axios';
import Login from './login';
import Browse from './browse';
import Cart from './cart';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
// import {connect} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      list: [],
      username: "",
      qty:{
      },
      checkout:[],
      loggedIn: false,
      checkoutTotal:0
    }
    this.loginSubmitHandler= this.loginSubmitHandler.bind(this);
    this.loginChangeHandler= this.loginChangeHandler.bind(this);
    this.addToCartHandler= this.addToCartHandler.bind(this);
    this.itemQtyChangeHandler= this.itemQtyChangeHandler.bind(this);
  }


  componentDidMount () {
    const cookies = getCookies()
    if(cookies.userid) {
      this.setState({loggedIn: true})
    }
    axios.get("/all-items")
      .then((res) => {
          // console.log("response data Axios",res.data );
          this.setState({list:res.data})
      })
      .catch(err => console.log('ERROR from CLENT getAllItems', err ))

    axios.get("/cartItems")
      .then(res => this.setState({checkout:res.data}))
        .catch(err => console.log('ERROR from CLENT getCartItems', err ))
  }

  loginSubmitHandler (e){
    e.preventDefault();
    axios.post('/addUser', {username: this.state.username})
      .then(res => {
        // console.log("response form submitHandler", res.data)
        this.setState({loggedIn: true})
      })
        .catch(err => console.log(err))
  }
  loginChangeHandler(e) {
    e.preventDefault();
    const {name, value} = e.target 
    this.setState({
      [name]: value
    })
  }
  itemQtyChangeHandler (e) {
    e.preventDefault();
    const {value, id} = e.target
    this.setState({
      qty: {...this.state.qty, [id]:value}
    })
    console.log('state qty', this.state.qty)
  }

  addToCartHandler(id){
    console.log("itemId for addToCartHandler", id)
    console.log("State of application after adding to cart", this.state)
    axios.post('/addItem', {itemid: id, qty: this.state.qty[id]})
      .then(res => {
        console.log(res.data);
        this.setState({list: res.data})
        axios.get("/cartItems")
          .then(res => this.setState({checkout:res.data}))
        .catch(err => console.log('ERROR from CLENT AXIOS REQ', err ))
    }).catch(err => console.log(err))
  }

  render() {

    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Homepage Login</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
          {this.state.loggedIn ? "You are already signed in. Please go to browsing page to start shopping!" : <Login loginSubmitHandler={this.loginSubmitHandler} loginChangeHandler={this.loginChangeHandler} username={this.state.username}/>}
          </Route>
          <Route path="/browse">
          <Browse list={this.state.list} itemQtyChangeHandler={this.itemQtyChangeHandler} addToCartHandler={this.addToCartHandler} qty={this.state.qty} /> 
          </Route>
          <Route path="/cart">
          <Cart checkout={this.state.checkout} checkoutTotal={this.state.checkoutTotal} checkoutTotalHandler={this.checkoutTotalHandler}/>
          </Route>
        </Switch>
      </div>
    </Router>
      // <div>
      //   <h1>React is WORKING</h1>
      //   {this.state.loggedIn ? <Browse list={this.state.list} itemQtyChangeHandler={this.itemQtyChangeHandler} addToCartHandler={this.addToCartHandler} qty={this.state.qty} /> : 
      //   <Login loginSubmitHandler={this.loginSubmitHandler} loginChangeHandler={this.loginChangeHandler} username={this.state.username}/>}
      //   <Cart checkout={this.state.checkout} checkoutTotal={this.state.checkoutTotal} checkoutTotalHandler={this.checkoutTotalHandler}/>
      // </div>
    )
  }
}

const getCookies = function(){
  const pairs = document.cookie.split(";");
  const cookies = {};
  for (var i=0; i<pairs.length; i++){
    const pair = pairs[i].split("=");
    cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
  }
  console.log(`cookies `, cookies)
  return cookies;
}

// const getStateFromStore = (state) => {
//   return {
//     movies: state.movies
//   }
// }

//taking the state from store and applying a property to store the data locally from the redux store
//aka grabing the current state of something

// export default connect(getStateFromStore)(App)
export default App;

//returns a higher order component that will wrap this component so it can connect to the redux store
//react-boostrap 
//--save react-router-dom
//const styles = styled.div`
// .navbar {}
//.navvar-brand {}
//  &:hover {  }`
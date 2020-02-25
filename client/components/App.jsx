import React, {Component} from 'react';
import axios from 'axios';
import Login from './login';
import Browse from './browse';
import Cart from './cart';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      list: [],
      username: "",
      qty:{
      },
      checkout:[],
      showCart: false,
      loggedIn: false,
      checkoutTotal:0,
      category:""
    }
    this.loginSubmitHandler= this.loginSubmitHandler.bind(this);
    this.loginChangeHandler= this.loginChangeHandler.bind(this);
    this.addToCartHandler= this.addToCartHandler.bind(this);
    this.itemQtyChangeHandler= this.itemQtyChangeHandler.bind(this);
    this.checkoutHandler= this.checkoutHandler.bind(this);
    this.backToBrowseHandler= this.backToBrowseHandler.bind(this);
    this.logOutHandler= this.logOutHandler.bind(this);
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

  loginSubmitHandler(e) {
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
    // console.log("itemId for addToCartHandler", id)
    // console.log("State of application after adding to cart", this.state)
    axios.post('/addItem', {itemid: id, qty: this.state.qty[id]})
      .then(res => {
        this.setState({list: res.data})
        axios.get("/cartItems")
          .then(res => this.setState({checkout:res.data}))
        .catch(err => console.log('ERROR from CLENT AXIOS REQ', err ))
    }).catch(err => console.log(err))

  }
  logOutHandler(e){
    this.setState({loggedIn: false, showCart:false, username:""})
    document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  }
   checkoutHandler(e){
     e.preventDefault();
     this.setState({showCart:true})
   } 
   backToBrowseHandler(e){
    e.preventDefault();
    this.setState({showCart:false})
   }
  
  render() {

    return (
      <div>
        {!this.state.loggedIn && <Login
          loginSubmitHandler={this.loginSubmitHandler}
          loginChangeHandler={this.loginChangeHandler}
          username={this.state.username}/>}

        {this.state.loggedIn && !this.state.showCart && <Browse list={this.state.list}
            itemQtyChangeHandler={this.itemQtyChangeHandler}
            addToCartHandler={this.addToCartHandler}
            qty={this.state.qty} 
            checkoutHandler={this.checkoutHandler}/>  }

        {this.state.showCart &&
        <Cart
          checkout={this.state.checkout}
          checkoutTotal={this.state.checkoutTotal}
          checkoutTotalHandler={this.checkoutTotalHandler}
          backToBrowseHandler={this.backToBrowseHandler}/>}

        {this.state.loggedIn && 
          <button onClick={this.logOutHandler}>Logout</button>}
      </div>
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
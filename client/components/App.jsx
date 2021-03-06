import React, {Component} from 'react';
import axios from 'axios';
import Login from './login';
import Browse from './browse';
import Cart from './cart';
import {getCookies} from '../utilities'
// import styled from 'styled-components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      username: '',
      qty: {
      },
      checkout: [],
      showCart: false,
      loggedIn: false,
      checkoutTotal: 0,
      category: 'all items',
      pageNumber: 1
    };
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
    this.loginChangeHandler = this.loginChangeHandler.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
    this.itemQtyChangeHandler = this.itemQtyChangeHandler.bind(this);
    this.checkoutHandler = this.checkoutHandler.bind(this);
    this.backToBrowseHandler = this.backToBrowseHandler.bind(this);
    this.logOutHandler = this.logOutHandler.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
  }
  

  componentDidMount() {
    const cookies = getCookies();
    if(cookies.userid) {
      this.setState({loggedIn: true})
    }
    if(cookies.page === 'cart'){
      this.setState({showCart:true})
    }
    console.log('cooookiesss', cookies.page)
    const getItems = axios.get("/all-items")
    const getCart = axios.get("/cartItems")
    Promise.all([getItems, getCart]).then((results) => {
      this.setState({
        list:results[0].data,
        checkout:results[1].data
      })
    })
    // axios.get("/all-items")
    //   .then((res) => {
    //       // console.log("response data Axios",res.data );
    //       this.setState({list:res.data})
    //   })
    //   .catch(err => console.log('ERROR from CLENT getAllItems', err ))

    // axios.get("/cartItems")
    //   .then(res => this.setState({checkout:res.data}))
    //     .catch(err => console.log('ERROR from CLENT getCartItems', err ))
  }

  loginSubmitHandler(e) {
    e.preventDefault();
    axios.post('/addUser', {username: this.state.username})
      .then(res => {
        // console.log("response form submitHandler", res.data)
        this.setState({loggedIn: true})
        axios.get("/cartItems")
          .then(res => this.setState({checkout:res.data}))
        .catch(err => console.log('ERROR from CLENT AXIOS REQ', err ))
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
        this.setState({list: res.data})
        axios.get("/cartItems")
          .then(res => this.setState({checkout:res.data}))
        .catch(err => console.log('ERROR from CLENT AXIOS REQ', err ))
    }).catch(err => console.log(err))

  }
  logOutHandler(e){
    this.setState({loggedIn: false, showCart:false, username:"", checkout:[]})
    document.cookie = "userid=; page=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  }
   checkoutHandler(e){
     e.preventDefault();
     this.setState({showCart:true})
   } 
   backToBrowseHandler(e){
    e.preventDefault();
    this.setState({showCart:false})
   }
   pageChangeHandler(pageNumber){
    this.setState({pageNumber})
   }

   categoryHandler(e) {
     e.preventDefault();
     this.setState({category: e.target.value});
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
            checkoutHandler={this.checkoutHandler}
            pageChangeHandler={this.pageChangeHandler}
            pageNumber={this.state.pageNumber}
            category={this.state.category} 
            categoryHandler={this.categoryHandler}/>} 

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


export default App;


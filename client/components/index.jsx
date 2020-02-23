import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
// import rootReducer from '../reducers/rootReducer'


// const store = createStore(rootReducer); 
//why const if immutable? because pointing to same obj?

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('App'));
ReactDOM.render(<App/>, document.getElementById('App'))













/* 
* reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state. 
 * you should
 * not mutate the state object, but return a new object if the state changes.
 * */
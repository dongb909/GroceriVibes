import React, {Component} from 'react';
// import {connect} from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state ={}
  }
  render() {
    // console.log(this.props)
    // const{movies} = this.props
    return (
      <div>
        <h1>React is WORKING</h1>
      </div>
    )
  }
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
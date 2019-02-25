import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './components/Nav';
import Board from './components/Board';
import {BrowserRouter as Router,Route} from "react-router-dom"
import CreateBoardFoam from './components/boardfoam/CreateBoardFoam';
import {Provider} from "react-redux"
import store from "./store"
import UpdateBoardFoam from './components/boardfoam/UpdateBoardFoam';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Nav />
            <Route exact path="/" component={Board} />
            <Route exact path="/updateBoardFoam/:board_code" component={UpdateBoardFoam}/>
            <Route exact path="/createBoardFoam" component={CreateBoardFoam} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react'
import './App.css'
import MineSweeperContainer from './components/MineSweeperContainer'
import GameStatusContainer from './components/GameStatusContainer'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="appHeader">
          <img src="./images/bomb.png" className="appLogo" alt="logo" />
          <h2>Minesweeper</h2>

          <GameStatusContainer />
        </div>

        <MineSweeperContainer />
      </div>
    )
  }
}

export default App

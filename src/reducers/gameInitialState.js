import mineSweeper from '../lib/mineSweeper'

const initialState = {
  gameTime: 0,
  gameStarted: false,
  isRunning: false,
  userLost: false,
  userWon: false,
  gameBoard: mineSweeper.generateBoard(),
  numberOfBombFlags: 0,
  mineCount: 10,
  boardSize: 9
}

export default initialState
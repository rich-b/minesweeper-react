import mineSweeper from '../lib/mineSweeper'

const initialState = {
  gameTime: 0,
  gameStarted: false,
  isRunning: false,
  userLost: false,
  userWon: false,
  gameBoard: mineSweeper.generateBoard(),
  difficulty: 'medium'
}

export default initialState

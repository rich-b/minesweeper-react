import * as actionTypes from '../actions/actionTypes'
import initialState from './gameInitialState'
import mineSweeper from '../lib/mineSweeper'

const updateCellInGameBoard = (gameBoard, coordinates, modifiedValues) => {
  const updatedBoard = [
    ...gameBoard.slice(0, coordinates.x),
    [
      ...gameBoard[coordinates.x].slice(0, coordinates.y),
      {
        ...gameBoard[coordinates.x][coordinates.y],
        ...modifiedValues
      },
      ...gameBoard[coordinates.x].slice(coordinates.y + 1)
    ],
    ...gameBoard.slice(coordinates.x + 1)
  ]

  // todo - cleanup array with object property
  updatedBoard.minePositions = gameBoard.minePositions
  
  return updatedBoard
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GRID_CLICK:
      if (state.gameStarted && !state.isRunning) return state

      const coordinates = { x: action.x, y: action.y }
      const userLost = state.gameBoard[action.x][action.y].hasBomb

      return {
        ...state,
        gameBoard: updateCellInGameBoard(
          state.gameBoard,
          coordinates, {
            isCovered: false
          }
        ),
        userLost,
        isRunning: !userLost,
        gameStarted: true,
        errorMessage: null
      }
    case actionTypes.FLAG_MINE:
      const flagCoordinates = { x: action.x, y: action.y }
      const userWon = mineSweeper.isLastMine(state.gameBoard, flagCoordinates)

      if (state.numberOfBombFlags >= state.mineCount) {
        return {
          ...state,
          errorMessage: 'Too many mines have been flagged!',
          userLost: true,
          isRunning: false
        }
      } else {
        return {
          ...state,
          gameBoard: updateCellInGameBoard(
            state.gameBoard,
            flagCoordinates, {
              isFlagged: true
            }
          ),
          numberOfBombFlags: state.numberOfBombFlags + 1,
          userWon,
          isRunning: !userWon,
          errorMessage: null
        }
      }
    case actionTypes.RESET_TIMER:
      return {
        ...state,
        gameTime: 0
      }
    case actionTypes.TIMER_TICK:
      return {
        ...state,
        gameTime: state.gameTime + 1
      }
    case actionTypes.RESET_GAME:
      return {
        ...initialState,
        gameBoard: mineSweeper.generateBoard(),
        errorMessage: null,
        numberOfBombFlags: 0
      }
    case actionTypes.CHANGE_BOARD_SIZE:
      return {
        ...initialState,
        boardSize: action.newSize,
        gameBoard: mineSweeper.generateBoard(action.newSize, state.mineCount),
        errorMessage: null,
        numberOfBombFlags: 0
      }
    default:
      return state
  }
}

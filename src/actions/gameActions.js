import * as actionTypes from './actionTypes'
import mineSweeper from '../lib/mineSweeper'

let timerInterval = null

const timerTick = () => {
  return {
    type: actionTypes.TIMER_TICK
  }
}

const gameCellClick = (x, y) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GRID_CLICK,
      x,
      y
    })

    const gameBoard = getState().game.gameBoard
    const clickCells = mineSweeper.findClickRevealCells(gameBoard, {x, y})
    
    clickCells.forEach((cell) => {
      gameCellClick(cell.x, cell.y)(dispatch, getState)
    })
  }
}

export const revealSpot = (x, y) => {
  return (dispatch, getState) => {
    if (!getState().game.gameStarted) {
      clearInterval(timerInterval)
      timerInterval = setInterval(() => dispatch(timerTick()), 1000)

      dispatch({
        type: actionTypes.RESET_TIMER
      })

      dispatch(timerTick())
    }

    gameCellClick(x, y)(dispatch, getState)
  }
}

export const flagMine = (x, y) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FLAG_MINE,
      x,
      y
    })
  }
}

export const stopGameTimer = () => {
  return (dispatch) => {
    clearInterval(timerInterval)
  }
}

export const resetGame = () => {
  return {
    type: actionTypes.RESET_GAME
  }
}

export const changeBoardSize = (newSize) => {
  return {
    type: actionTypes.CHANGE_BOARD_SIZE,
    newSize
  }
}
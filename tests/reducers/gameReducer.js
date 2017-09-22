import { expect } from 'chai'
import gameReducer from '../../src/reducers/gameReducer'
import initialState from '../../src/reducers/gameInitialState'
import * as actionTypes from '../../src/actions/actionTypes'
import mineSweeper from '../../src/lib/mineSweeper'
import sinon from 'sinon'

describe('GameReducer', () => {
  let didUserWinStub = null

  beforeEach(() => {
    didUserWinStub = sinon.stub(mineSweeper, 'didUserWin').returns(true)
  })

  afterEach(() => {
    didUserWinStub.restore()
  })

  it('should initialize bombCount and board size', () => {
    const defaultStateFromReducer = gameReducer()
    expect(defaultStateFromReducer.bombCount).to.eql(
      initialState.bombCount
    )
    expect(defaultStateFromReducer.boardSize).to.eql(
      initialState.boardSize
    )
  })

  it('should start the game on first click', () => {
    didUserWinStub.restore()

    const clickAction = {
      type: actionTypes.GRID_CLICK,
      x: 0,
      y: 0
    }
    const gridClickState = gameReducer(initialState, clickAction)

    expect(gridClickState.isRunning).to.be.true
  })

  it('should determine if user won', () => {
    const startedGameState = Object.assign({}, initialState, {
      gameStarted: true,
      isRunning: true
    })

    const clickAction = {
      type: actionTypes.GRID_CLICK,
      x: 0,
      y: 0
    }
    const winningState = gameReducer(startedGameState, clickAction)

    expect(winningState.userWon).to.eql(true)
    expect(winningState.isRunning).to.eql(false)
  })

  it('should show all mines if user won or lost', () => {
    const startedGameState = Object.assign({}, initialState, {
      gameStarted: true,
      isRunning: true
    })

    // click on every non-bomb cell
    for (let x = 0; x < startedGameState.gameBoard.length; x++) {
      for (let y = 0; y < startedGameState.gameBoard.length; y++) {
        if (!startedGameState.gameBoard[x][y].hasBomb) {
          startedGameState.gameBoard[x][y].isCovered = false
        }
      }
    }

    const clickAction = {
      type: actionTypes.GRID_CLICK,
      x: 0,
      y: 0
    }
    const winningState = gameReducer(startedGameState, clickAction)

    for (let x = 0; x < winningState.gameBoard.length; x++) {
      for (let y = 0; y < winningState.gameBoard.length; y++) {
        if (winningState.gameBoard[x][y].isCovered) {
          throw Error('All cells should be visible!')
        }
      }
    }
  })
})

import { expect } from 'chai'
import gameReducer from '../../src/reducers/gameReducer'
import initialState from '../../src/reducers/gameInitialState'
import * as actionTypes from '../../src/actions/actionTypes'

describe('GameReducer', () => {
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
    const clickAction = {
      type: actionTypes.GRID_CLICK,
      x: 0,
      y: 0
    }
    const gridClickState = gameReducer(initialState, clickAction)

    expect(gridClickState.isRunning).to.be.true
  })

  it('should prevent clicking too many mines', () => {
    const stateWithFlaggedMines = Object.assign({}, initialState, {
      numberOfBombFlags: 10
    })
    const flagMineAction = {
      type: actionTypes.FLAG_MINE,
      x: 0,
      y: 0
    }
    const flagMineState = gameReducer(stateWithFlaggedMines, flagMineAction)

    expect(flagMineState.errorMessage).to.eql('Too many mines have been flagged!')
    expect(flagMineState.userLost).to.eql(true)
    expect(flagMineState.isRunning).to.eql(false)
  })
})

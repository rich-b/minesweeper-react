import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as gameActions from '../actions/gameActions'

const GameStatusContainerUnconnected = (props) => {
  function handleBoardSizeChange(e) {
    const newValue = parseInt(e.target.value, 10)

    if (newValue > 3 && newValue < 50) {
      props.changeBoardSize(newValue)
    }
  }

  return (
    <div className="statusContainer">
      <div>
        <input name="boardSize" type="text" onChange={handleBoardSizeChange} defaultValue={props.boardSize} />
        <label htmlFor="boardSize">Board Size</label>
      </div>
      <div>
        <span>
          Time: { props.gameTime }
        </span>

        { props.userWon || props.userLost ?
          <input type="button" className="resetButton" onClick={props.resetGame} value="Reset" />
          : null
        }
      </div>
      <div>

      </div>
    </div>
  )
}

GameStatusContainerUnconnected.propTypes = {
  gameTime: PropTypes.number.isRequired,
}

const mapStateToProps = (state, props) => ({
  ...state.game
})

export default connect(mapStateToProps, gameActions)(GameStatusContainerUnconnected)
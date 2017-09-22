import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as gameActions from '../actions/gameActions'

const GameStatusContainerUnconnected = (props) => {
  function handleDifficultyChange(e) {
    props.changeDifficulty(e.target.value)
  }

  return (
    <div className="statusContainer">
      <div>
        <select name="difficulty" onChange={handleDifficultyChange} value={props.difficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="difficulty">Difficulty</label>
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
  changeDifficulty: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
  ...state.game
})

export default connect(mapStateToProps, gameActions)(GameStatusContainerUnconnected)
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import * as gameActions from '../actions/gameActions'
import GameBoard from './GameBoard'

export class MineSweeperContainerUnconnected extends Component {
  static propTypes = {
    gameBoard: PropTypes.array.isRequired,
    revealSpot: PropTypes.func.isRequired,
    flagMine: PropTypes.func.isRequired,
    stopGameTimer: PropTypes.func.isRequired,
    isRunning: PropTypes.bool,
    userWon: PropTypes.bool,
    userLost: PropTypes.bool
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isRunning) {
      this.props.stopGameTimer()
    }
  }

  render() {
    const {
      gameBoard,
      revealSpot,
      flagMine,
      userWon,
      userLost
    } = this.props

    return (
      <div className="gameWrapper">
        <GameBoard
          gameBoard={gameBoard}
          revealSpot={revealSpot}
          flagMine={flagMine}
        />

        { userLost &&
          <div>
            <iframe src="https://giphy.com/embed/3o7btT1T9qpQZWhNlK" width="480" height="277" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reactionseditor-3o7btT1T9qpQZWhNlK">via GIPHY</a></p>
          </div>
        }

        { userWon &&
          <div>
            <iframe src="https://giphy.com/embed/fkD36jhiqzJ9m" width="480" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/reaction-fkD36jhiqzJ9m">via GIPHY</a></p>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state.game
})

export default connect(mapStateToProps, gameActions)(MineSweeperContainerUnconnected)

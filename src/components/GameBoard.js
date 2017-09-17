import React, {PropTypes} from 'react'
import GameRow from './GameRow'

const GameBoard = (props) => {
  return (
    <div className="gameBoard">
      { props.gameBoard.map((row, idx) => 
        <GameRow
          key={idx}
          rowData={row}
          revealSpot={props.revealSpot.bind(this, idx)}
          flagMine={props.flagMine.bind(this, idx)}
        />
      )}
    </div>
  )
}

GameBoard.propTypes = {
  gameBoard: PropTypes.array.isRequired,
  revealSpot: PropTypes.func.isRequired,
  flagMine: PropTypes.func.isRequired
}

export default GameBoard

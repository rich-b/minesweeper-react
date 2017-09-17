import React, {PropTypes} from 'react'
import GameCell from './GameCell'

const GameRow = (props) => {
  return (
    <div className="gameRow">
      { props.rowData.map((cellData, idx) =>
        <GameCell
          key={idx}
          cellData={cellData}
          revealSpot={props.revealSpot.bind(this, idx)}
          flagMine={props.flagMine.bind(this, idx)}
        />
      )}
    </div>
  )
}

GameRow.propTypes = {
  rowData: PropTypes.array.isRequired,
  revealSpot: PropTypes.func.isRequired,
  flagMine: PropTypes.func.isRequired
}

export default GameRow

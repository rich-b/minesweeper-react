import React, {PropTypes} from 'react'
import classNames from 'classnames'

const GameCell = (props) => {
  function contextMenuClick(e) {
    e.preventDefault()
    props.flagMine()
  }

  return (
    <div
      className={classNames('gameCell', {
        coveredCell: props.cellData.isCovered,
        flaggedCell: props.cellData.isFlagged
      })}
      onClick={props.revealSpot}
      onContextMenu={contextMenuClick}
    >
      <span>
      { props.cellData.hasBomb
        ? 'X'
        : props.cellData.nearbyBombs
      }
      </span>
    </div>
  )
}

GameCell.propTypes = {
  revealSpot: PropTypes.func.isRequired,
  flagMine: PropTypes.func.isRequired
}

export default GameCell

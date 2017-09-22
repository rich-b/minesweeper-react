import React, {PropTypes} from 'react'
import classNames from 'classnames'

const GameCell = (props) => {
  function contextMenuClick(e) {
    e.preventDefault()
    props.flagMine()
  }

  return (
    <div
      className="gameCell"
      onClick={props.revealSpot}
      onContextMenu={contextMenuClick}
    >
      <span>
      { props.cellData.hasBomb
        ? 'X'
        : props.cellData.nearbyBombs
      }
      </span>

      <span className={classNames('coveredCell', {
        hidden: !props.cellData.isCovered
      })} />

      { props.cellData.isFlagged
        ? <span className="flaggedCell" />
        : null
      }
    </div>
  )
}

GameCell.propTypes = {
  cellData: PropTypes.object.isRequired,
  revealSpot: PropTypes.func.isRequired,
  flagMine: PropTypes.func.isRequired
}

export default GameCell

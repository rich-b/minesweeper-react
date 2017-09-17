
const generateUniqueRandomCoordinate = (rowAndColumnSize, existingCoordinates) => {
  // lets keep these zero based since we are working with arrays
  const newCoordinate = {
    x: Math.floor(Math.random() * rowAndColumnSize),
    y: Math.floor(Math.random() * rowAndColumnSize)
  }

  if (!existingCoordinates.some(ec => ec.x === newCoordinate.x && ec.y === newCoordinate.y)) {
    return newCoordinate
  } else {
    return generateUniqueRandomCoordinate(rowAndColumnSize, existingCoordinates)
  }
}

const generateRandomCoordinates = (rowAndColumnSize, numberOfCoordinates) => {
  const coordinates = []

  for (let i = 0; i < numberOfCoordinates; i++) {
    coordinates.push(generateUniqueRandomCoordinate(rowAndColumnSize, coordinates))
  }

  return coordinates
}

const findAjacentCells = (coordinates, gameBoardSize) => {
  let cells = []

  if (coordinates.x > 0) {
    cells.push({ x: coordinates.x - 1, y: coordinates.y })

    if (coordinates.y > 0) {
      cells.push({ x: coordinates.x - 1, y: coordinates.y - 1 })
    }
    if (coordinates.y < gameBoardSize - 1) {
      cells.push({ x: coordinates.x - 1, y: coordinates.y + 1 })
    }
  }

  if (coordinates.x < gameBoardSize - 1) {
    cells.push({ x: coordinates.x + 1, y: coordinates.y })

    if (coordinates.y > 0) {
      cells.push({ x: coordinates.x + 1, y: coordinates.y - 1 })
    }
    if (coordinates.y < gameBoardSize - 1) {
      cells.push({ x: coordinates.x + 1, y: coordinates.y + 1 })
    }
  }

  if (coordinates.y > 0) {
    cells.push({ x: coordinates.x, y: coordinates.y - 1 })
  }

  if (coordinates.y < gameBoardSize - 1) {
    cells.push({ x: coordinates.x, y: coordinates.y + 1 })
  }

  return cells
}

const findNumberOfBombsNearPosition = (coordinates, gameBoard) => {
  const ajacentCells = findAjacentCells(coordinates, gameBoard.length)
  const cellsWithBombs = ajacentCells.filter(cell => gameBoard[cell.x][cell.y].hasBomb)
  return cellsWithBombs.length
}

const generateBoard = (size = 9, mineCount = 10) => {
  const minePositions = generateRandomCoordinates(size, mineCount)
  const gameBoard = Array(size).fill().map(() => Array(size).fill().map(() => {
    return {
      isCovered: true
    }
  }))

  gameBoard.minePositions = minePositions

  minePositions.forEach((p) => {
    gameBoard[p.x][p.y].hasBomb = true
  })

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!gameBoard[x][y].hasBomb) {
        const bombCount = findNumberOfBombsNearPosition({x, y}, gameBoard)

        if (bombCount > 0) {
          gameBoard[x][y].nearbyBombs = bombCount
        }
      }
    }
  }

  return gameBoard
}

const findClickRevealCells = (gameBoard, coordinates) => {
  const currentCell = gameBoard[coordinates.x][coordinates.y]

  if (!currentCell.nearbyBombs && !currentCell.hasBomb) {
    const ajacentCells = findAjacentCells(coordinates, gameBoard.length)
    const revealableCells = ajacentCells.filter(cell => {
      return !gameBoard[cell.x][cell.y].hasBomb && gameBoard[cell.x][cell.y].isCovered
    })
    
    return revealableCells
  }

  return []
}

const isLastMine = (gameBoard, coordinates) => {
  const currentCell = gameBoard[coordinates.x][coordinates.y]

  if (!currentCell.hasBomb) return false

  const allOtherMinePositions = gameBoard.minePositions.filter(minePosition =>
    !(minePosition.x === coordinates.x && minePosition.y === coordinates.y)
  )

  return allOtherMinePositions.length === gameBoard.minePositions.length -1 &&
    allOtherMinePositions.every((minePosition) => {
      return gameBoard[minePosition.x][minePosition.y].isFlagged
    })
}

export default {
  generateBoard,
  findClickRevealCells,
  isLastMine
}
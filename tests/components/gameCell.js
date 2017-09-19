import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import GameCell from '../../src/components/GameCell'

describe('GameCell Component', () => {
  const renderer = new ShallowRenderer()
  let gameCell

  const cellDataFake = {}
  const revealSpotSpy = sinon.spy()
  const flagMineSpy = sinon.spy()

  beforeEach(() => {
    gameCell = renderer.render(
      <GameCell
        cellData={cellDataFake}
        revealSpot={revealSpotSpy}
        flagMine={flagMineSpy}
      />
    )
  })

  it('should render the GameCell component', () => {
    expect(gameCell.props.className).to.eql('gameCell')
  })

  it('should render an X for cells with bombs', () => {
    const cellWithBomb = renderer.render(
      <GameCell
        cellData={{ hasBomb: true }}
        revealSpot={revealSpotSpy}
        flagMine={flagMineSpy}
      />
    )

    expect(cellWithBomb.props.children.props.children).to.eql('X')
  })

  it('should render the number of nearby bombs', () => {
    const cellWithBomb = renderer.render(
      <GameCell
        cellData={{ nearbyBombs: 4 }}
        revealSpot={revealSpotSpy}
        flagMine={flagMineSpy}
      />
    )

    expect(cellWithBomb.props.children.props.children).to.eql(4)
  })

  // todo - more tests
})

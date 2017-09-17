import { expect } from 'chai'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import GameCell from '../../src/components/GameCell'

describe('GameCell Component', () => {
  const renderer = new ShallowRenderer()
  let gameCell

  const cellDataFake = {}

  beforeEach(() => {
    gameCell = renderer.render(
      <GameCell
        cellData={cellDataFake}
      />
    )
  })

  it('should render the GameCell component', () => {
    expect(gameCell.props.className).to.eql('gameCell')
  })

  // todo - more tests
})

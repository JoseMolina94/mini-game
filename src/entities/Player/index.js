import React from "react"

export const Player = props => {
  const velocity = 30
  let isDead = false
  
  const update = ({entity, deltaTime}) => {
    // console.log(state)
    if (entity.position.y < -50) {
      isDead = true
    }
  }
  
  const init = (state) => {

  }
  
  return {
    name: 'player-1',
    asset: 'assets/cube1.glb',
    key: 'player',
    init,
    update,
    velocity,
    isDead
  }
}

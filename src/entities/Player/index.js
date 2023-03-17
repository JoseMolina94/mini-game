import React from "react"

export const Player = props => {
  const velocity = 0.07
  let isDead = false
  
  const update = (state) => {
    // console.log(state)
    if (state.position.y < -50) {
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

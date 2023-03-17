import React from "react"

export const Ground = props => {
  const {
    asset,
    position = {x: 0, y: 0, z: 0}
  } = props
  let dropped = false
  
  const update = (state) => {
    if (state.position.y > -100 && dropped) {
      state.position.y -= 0.5
      if (state.position.y < -95) {
        state.scale.x = 0
        state.scale.y = 0
        state.scale.z = 0
      }
    }
  }
  
  const init = (state) => {
    state.position.x = position.x
    state.position.z = position.z
    state.position.y = position.y
  }
  
  const drop = () => {
    dropped = true
  }
  
  return {
    name: 'ground',
    asset,
    key: 'ground',
    init,
    update,
    drop,
    dropped
  }
}

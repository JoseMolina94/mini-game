import React from "react"

export const Ground = props => {
  const {
    asset,
    position = {x: 0, y: 0, z: 0},
    scale = 1
  } = props
  let dropped = false
  
  const update = ({entity, deltaTime}) => {
    if (entity.position.y > -100 && dropped) {
      entity.position.y -= 30 * deltaTime
      if (entity.position.y < -95) {
        entity.scale.x = 0
        entity.scale.y = 0
        entity.scale.z = 0
      }
    }
  }
  
  const init = (state) => {
    state.scale.x = scale
    state.scale.z = scale
    
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

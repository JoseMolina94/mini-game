import React from "react"

export const ObstacleBall = ({
  position= {x: 0, y: 0, z: 0},
  direction = [],
  scale= 1
}) => {
  const maxVelocity = 100
  
  const setVelocity = () => {
    return Math.floor(Math.random() * (maxVelocity - 10) + 10)
  }
  
  const update = ({entity, deltaTime}) => {
    if (entity.direction.length > 0) {
      const velocity = setVelocity()
      
      for (const dir of entity.direction) {
        // console.log ('FF', dir[1], entity)
        if (dir.includes('-')) {
          const axi = dir[1]
          entity.position[axi] -= velocity * deltaTime
          entity.rotation[axi] -= velocity * deltaTime
          
          if (entity.position[axi] <= -35) {
            entity.position.x = position.x
            entity.position.y = position.y
            entity.position.z = position.z
          }
          
        } else {
          entity.position[dir] += velocity * deltaTime
          entity.rotation[dir] += velocity * deltaTime
  
          if (entity.position[dir] >= 35) {
            entity.position.x = position.x
            entity.position.y = position.y
            entity.position.z = position.z
          }
          
        }
        
      }
    }
  }
  
  const init = (state) => {
    state.scale.x = scale
    state.scale.z = scale
    state.scale.y = scale
    
    state.position.x = position.x
    state.position.y = position.y
    state.position.z = position.z
  }
  
  return {
    maxVelocity,
    update,
    init,
    asset: 'assets/obsball.glb',
    key: 'obs-ball',
    name: 'ball',
    direction
  }
}

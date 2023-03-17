import React from 'react'

export const Controls = () => {
  let keys = []
  
  const init = () => {
    document.onkeydown = (e) => {
      if (!keys.includes(e.key)) {
        keys.push(e.key)
      }
    }
  
    document.onkeyup = (e) => {
      keys = keys.filter (key => key !== e.key)
    }
  }
  
  const update = ({entities = [], camera}) => {
    // console.log ('FFF', entities)
    if (entities.length) {
      // console.log ('FFF', entities)
      const player = entities.find(ele => ele.name === 'player-1')
      
      if (keys.includes('ArrowUp')) {
        player.position.z -= player.velocity
        // camera.position.z = player.position.z + 10
      }
      if (keys.includes('ArrowDown')) {
        player.position.z += player.velocity
        // camera.position.z = player.position.z - 10
      }
      if (keys.includes('ArrowRight')) {
        player.position.x += player.velocity
      }
      if (keys.includes('ArrowLeft')) {
        player.position.x -= player.velocity
      }
  
      camera.position.x = player.position.x
      camera.position.z = player.position.z + 40
      
      camera.lookAt(player.position)
    }
  }
  
  return {
    update,
    init
  }
}

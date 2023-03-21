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
  
  const update = ({entities = [], camera, deltaTime}) => {
    // console.log ('DD', deltaTime)
    // console.log ('FFF', entities)
  
    const currentPlayer = Cookies.get(`${process.env.NEXT_PUBLIC_CURRENT_PLAYER_COOKIE_NAME}`) || null
    
    if (entities.length && currentPlayer) {
      // console.log ('FFF', entities)
      const player = entities.find(ele => ele.name === currentPlayer)
      
      if (keys.includes('ArrowUp')) {
        player.position.z -= player.velocity * deltaTime
        // camera.position.z = player.position.z + 10
      }
      if (keys.includes('ArrowDown')) {
        player.position.z += player.velocity * deltaTime
        // camera.position.z = player.position.z - 10
      }
      if (keys.includes('ArrowRight')) {
        player.position.x += player.velocity * deltaTime
      }
      if (keys.includes('ArrowLeft')) {
        player.position.x -= player.velocity * deltaTime
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

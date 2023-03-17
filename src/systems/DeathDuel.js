import React from "react"

export const DeathDuel = () => {
  let clock = null
  let intervalToDrop = 10
  let startDuel = 30
  let isDeathDuel = false
  let drops = []

  const init = ({THREE}) => {
    clock = new THREE.Clock(true)
    clock.start()
  }
  
  const update = ({entities = []}) => {
    if (clock.running) {
      if (isDeathDuel) {
        
        if (parseInt(clock.getElapsedTime()) >= intervalToDrop) {
          let grounds = entities.filter(ele => ele.name === 'ground' && ele.dropped === false && !drops.includes(ele.uuid))
          if (grounds.length > 0) {
            const randomDrop = Math.floor(Math.random() * grounds.length)
            console.log ('DDD', grounds, randomDrop)
            grounds[randomDrop].drop()
            drops.push(grounds[randomDrop].uuid)
            clock.stop()
          } else {
            clock.stop()
          }
        }

      } else {
        if (parseInt(clock.getElapsedTime()) >= startDuel) {
          isDeathDuel = true
          clock.stop()
        }
      }
      
    } else {
      clock.start()
    }
  }
  
  return {
    init,
    update
  }
}

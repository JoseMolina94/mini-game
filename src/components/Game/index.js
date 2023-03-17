import React, {useEffect, useRef} from "react";
import GameClass from "./lib/GameClass";

export const Game = props => {
  const {
    w = 300,
    h = 300,
    entities = [],
    systems = []
  } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const game = new GameClass(canvasRef)
  
    game.initialize({
      size: { w, h },
      fullScreen: true
    })
    game.loadEntities(entities)
    game.loadSystems(systems)
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      id="canvasRef"
    />
  )
}

import React, { useEffect, useState } from "react"
import { Game } from "../components/Game";
import {Player} from "../entities/Player";
import { Ligths } from "../entities/Ligths";
import {Ground} from "../entities/Ground";
import {Controls} from "../systems/Controls";
import {DeathDuel} from "../systems/DeathDuel";
import {ObstacleBall} from "../entities/ObstacleBall";

export default function Home() {
  const BALL_SCALE = 0.5
  const BALL_Y_POS = 5
  const BALL_POS_INIT = 35
  
  useEffect(() => {
    const player = Cookies.get(`${process.env.NEXT_PUBLIC_CURRENT_PLAYER_COOKIE_NAME}`) || ''
    if (!player) {
      Cookies.set(`${process.env.NEXT_PUBLIC_CURRENT_PLAYER_COOKIE_NAME}`, 'player-1', { path: '/' })
    }
  }, [])
  
  return (
    <Game
      fullScreen
      entities={[
        Player(),
        Ligths,
        Ground({asset: 'assets/g1.glb', scale: 5}),
        Ground({asset: 'assets/g2.glb', position: {x: 25, y: 0, z: 0}, scale: 5}),
        Ground({asset: 'assets/g3.glb', position: {x: -25, y: 0, z: 0}, scale: 5}),
        Ground({asset: 'assets/g4.glb', position: {x: 0, y: 0, z: 25}, scale: 5}),
        Ground({asset: 'assets/g5.glb', position: {x: 0, y: 0, z: -25}, scale: 5}),
        Ground({asset: 'assets/g6.glb', position: {x: -25, y: 0, z: -25}, scale: 5}),
        Ground({asset: 'assets/g7.glb', position: {x: 25, y: 0, z: 25}, scale: 5}),
        Ground({asset: 'assets/g8.glb', position: {x: 25, y: 0, z: -25}, scale: 5}),
        Ground({asset: 'assets/g9.glb', position: {x: -25, y: 0, z: 25}, scale: 5}),
        ObstacleBall({direction: ['-x'], position: {x: BALL_POS_INIT, y: BALL_Y_POS, z: 0}, scale: BALL_SCALE}),
        ObstacleBall({direction: ['z'], position: {x: 0, y: BALL_Y_POS, z: -BALL_POS_INIT}, scale: BALL_SCALE}),
        ObstacleBall({direction: ['x'], position: {x: -BALL_POS_INIT, y: BALL_Y_POS, z: 0}, scale: BALL_SCALE}),
        ObstacleBall({direction: ['-z'], position: {x: 0, y: BALL_Y_POS, z: BALL_POS_INIT}, scale: BALL_SCALE})
      ]}
      systems={[
        Controls(),
        DeathDuel()
      ]}
    />
  )
}

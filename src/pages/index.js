import React from "react"
import { Game } from "../components/Game";
import {Player} from "../entities/Player";
import { Ligths } from "../entities/Ligths";
import {Ground} from "../entities/Ground";
import {Controls} from "../systems/Controls";
import {DeathDuel} from "../systems/DeathDuel";

export default function Home() {
  
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
      ]}
      systems={[
        Controls(),
        DeathDuel()
      ]}
    />
  )
}

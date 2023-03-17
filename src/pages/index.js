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
        Ground({asset: 'assets/ground1.glb'}),
        Ground({asset: 'assets/ground1.glb', position: {x: 20, y: 0, z: 0}}),
        Ground({asset: 'assets/ground1.glb', position: {x: -20, y: 0, z: 0}}),
        Ground({asset: 'assets/ground1.glb', position: {x: 0, y: 0, z: 20}}),
      ]}
      systems={[
        Controls(),
        DeathDuel()
      ]}
    />
  )
}

import React, { useRef, useState, useEffect } from "react"
import * as THREE from 'three'
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import { OrbitControls } from "three/addons/controls/OrbitControls";
import Stats from "three/addons/libs/stats.module";

export default function Home() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    if (canvasRef?.current) {
      const width = window.innerWidth
      const height = window.innerHeight
      
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        50,
        width / height,
        1,
        1000
      )
      camera.position.z = 40
      const loader = new GLTFLoader()
      loader.load(
        'assets/cube1.glb',
        (model) => {
          scene.add(model.scene)
        },
        undefined,
        (error) => {
          console.error(error)
        })
      
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true
      })
      renderer.setSize(width, height)
      
      const controls = new OrbitControls(camera, renderer.domElement)
      const stats = Stats()
      
      document.body.appendChild(stats.dom)
      document.body.appendChild(renderer.domElement)
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      ambientLight.castShadow = true
      scene.add(ambientLight)
      
      const spotLight = new THREE.SpotLight(0xffffff, 1)
      spotLight.castShadow = true
      spotLight.position.set(0, 64, 32)
      scene.add(spotLight)
      
      const animate = () => {
        stats.update()
        controls.update()
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
      }
      animate()
    }
  }, [canvasRef?.current])
  
  return (
    <canvas
      ref={canvasRef}
    />
  )
}

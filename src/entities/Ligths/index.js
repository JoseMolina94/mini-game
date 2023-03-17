import React from 'react'

export const Ligths = props => {
  const {
    THREE,
    scene
  } = props
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow = true
  scene.add(ambientLight)
  
  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.castShadow = true
  spotLight.position.set(0, 64, 32)
  scene.add(spotLight)
}

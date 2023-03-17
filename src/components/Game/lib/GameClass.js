import React from 'react'
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader"
import { OrbitControls } from "three/addons/controls/OrbitControls";

export default class GameClass {

  constructor (canvasRef) {
    this.canvasRef = canvasRef
    this.scene = null
    this.camera = null
    this.controls = null
    this.entities = []
    this.systems = []
    this.renderer = null
    this.loading = true
    this.screenSize = null
  }
  
  initialize ({fullScreen = false, size = {w: 300, h: 300}}) {
    if (fullScreen) {
      this.screenSize = {
        w: window.innerWidth,
        h: window.innerHeight
      }
    } else {
      this.screenSize = size
    }

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.screenSize.w / this.screenSize.h,
      1,
      1000
    )
    this.camera.position.z = 30
    this.camera.position.y = 30
  
    if (typeof this.canvasRef !== 'string') {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvasRef.current,
        antialias: true
      })
    } else {
      const canvas = document.getElementById(this.canvasRef)
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
      })
    }
    this.renderer.setSize(this.screenSize.w, this.screenSize.h)
  
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  
    const update = () => {
      this.controls.update()
    
      for(const entity of this.entities) {
        if (entity?.update) {
          entity.update(entity)
        }
      }
    
      for (const system of this.systems) {
        system.update({
          entities: this.entities,
          camera: this.camera,
          THREE
        })
      }
    
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(update)
    }
    update()
    
    this.loading = false
  }
  
  loadEntities (entities = []) {
    const loader = new GLTFLoader()
  
    for (const entity of entities) {
      if (typeof entity === 'function') {
        const entityResponse = entity({
          THREE,
          screenSize: this.screenSize,
          scene: this.scene,
          renderer: this.renderer,
          camera: this.camera,
          loading: this.loading,
          loader
        })
      
        if (entityResponse && typeof entityResponse !== 'undefined') {
          this.entities.push(entityResponse)
        }
      } else {
        loader.load(
          entity.asset,
          (model) => {
            const object = new THREE.Object3D()
            object.add(model.scene)
            entity?.init && entity.init(object)
            this.scene.add(object)
  
            const found = this.entities.find(element => {
              return element.uuid === object.uuid
            })
            if (!found) {
              this.entities.push({...object, ...entity})
            }
            console.log ('GG', entity)
            
          },
          undefined,
          (error) => {
            console.error(error)
          })
      }
    }
  }
  
  loadSystems (systems = []) {
    this.systems = systems
    for (const system of this.systems) {
      system?.init && system.init({
        THREE,
        screenSize: this.screenSize,
        scene: this.scene,
        renderer: this.renderer,
        camera: this.camera,
        loading: this.loading
      })
    }
  }
}

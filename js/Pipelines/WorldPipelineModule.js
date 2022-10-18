import CannonWorld from '../Experience/CannonWorld'
import CannonWorld2 from '../Experience/CannonWorld2'

import Dummy from '../Experience/Dummy'
import ParticleSystem from '../Experience/ParticleSystem'

export const initWorldPipelineModule = () => {
  let dummy
  let particleSystem
  let cannonWorld

  const init = () => {
    const { scene, camera } = XR8.Threejs.xrScene()

    const ambientLight = new THREE.AmbientLight(0x333333)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 50, 0)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    // dummy = new Dummy({ scene })
    // particleSystem = new ParticleSystem({ scene, count: 3000 })

    cannonWorld = new CannonWorld2({ scene, camera })

    console.log('✨', 'World ready')
  }

  const updateWorld = () => {
    dummy?.update()
    // particleSystem?.update()
    cannonWorld?.update()
  }

  return {
    name: 'world',

    onStart: () => init(),

    onUpdate: () => updateWorld(),
  }
}

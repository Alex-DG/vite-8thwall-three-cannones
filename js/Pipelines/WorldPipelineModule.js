import CannonWorld from '../Experience/CannonWorld'
import Dummy from '../Experience/Dummy'
import ParticleSystem from '../Experience/ParticleSystem'

export const initWorldPipelineModule = () => {
  let dummy
  let particleSystem
  let cannonWorld

  const init = () => {
    const { scene } = XR8.Threejs.xrScene()

    // dummy = new Dummy({ scene })
    // particleSystem = new ParticleSystem({ scene, count: 3000 })

    cannonWorld = new CannonWorld({ scene })

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

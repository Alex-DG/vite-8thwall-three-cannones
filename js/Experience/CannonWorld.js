import * as CANNON from 'cannon-es'

class CannonWorld {
  constructor({ scene }) {
    this.scene = scene
    this.timeStep = 1 / 60
    this.init()
  }

  setMeshes() {
    const boxGeo = new THREE.BoxGeometry(2, 2, 2)
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
    })
    this.boxMesh = new THREE.Mesh(boxGeo, boxMat)
    this.scene.add(this.boxMesh)

    const sphereGeo = new THREE.SphereGeometry(2)
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    })
    this.sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)
    this.scene.add(this.sphereMesh)

    const groundGeo = new THREE.PlaneGeometry(30, 30, 10, 10)
    const groundMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: true,
    })
    this.groundMesh = new THREE.Mesh(groundGeo, groundMat)
    this.scene.add(this.groundMesh)
  }

  setWorld() {
    this.instance = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.81, 0),
    })
  }

  setBodies() {
    const groundPhysMat = new CANNON.Material()
    this.groundBody = new CANNON.Body({
      //   shape: new CANNON.Plane(), infinite shape
      shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
      position: new CANNON.Vec3(0, -2, 0),
      type: CANNON.Body.STATIC,
      material: groundPhysMat,
    })
    this.instance.addBody(this.groundBody)
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

    this.boxBody = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      position: new CANNON.Vec3(0, 5, -2),
    })
    this.instance.addBody(this.boxBody)

    this.boxBody.angularVelocity.set(1, 10, 0)
    this.boxBody.angularDamping = 0.5

    const spherePhysMat = new CANNON.Material()

    this.sphereBody = new CANNON.Body({
      mass: 4,
      shape: new CANNON.Sphere(2),
      position: new CANNON.Vec3(0, 8, 0),
      material: spherePhysMat,
    })
    this.instance.addBody(this.sphereBody)

    this.sphereBody.linearDamping = 0.21

    const groundSphereContactMat = new CANNON.ContactMaterial(
      groundPhysMat,
      spherePhysMat,
      { restitution: 0.9 }
    )

    this.instance.addContactMaterial(groundSphereContactMat)
  }

  init() {
    this.setWorld()
    this.setMeshes()
    this.setBodies()
  }

  update() {
    this.instance?.step(this.timeStep)

    this.groundMesh?.position.copy(this.groundBody.position)
    this.groundMesh?.quaternion.copy(this.groundBody.quaternion)

    this.boxMesh?.position.copy(this.boxBody.position)
    this.boxMesh?.quaternion.copy(this.boxBody.quaternion)

    this.sphereMesh?.position.copy(this.sphereBody.position)
    this.sphereMesh?.quaternion.copy(this.sphereBody.quaternion)
  }
}

export default CannonWorld

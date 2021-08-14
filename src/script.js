import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => 
{
// Update sizes
sizes.width = window.innerWidth
sizes.height = window.innerHeight

// Update Camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()

// Update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
const cubeTextureEnvironment = cubeTextureLoader.load([
  '/cubemap/px.png',
  '/cubemap/nx.png',
  '/cubemap/py.png',
  '/cubemap/ny.png',
  '/cubemap/pz.png',
  '/cubemap/nz.png',
])

const leatherTextureColor = textureLoader.load('/leather/Leather011_1K_Color.jpg')
const leatherTextureDisplacement = textureLoader.load('/leather/Leather011_1K_Displacement.jpg')
const leatherTextureNormals = textureLoader.load('/leather/Leather011_1K_Normal.jpg')
const leatherTextureRoughness = textureLoader.load('/leather/Leather011_1K_Roughness.jpg')

const metalTextureColor = textureLoader.load('/metal/Metal001_1K_Color.jpg')
const metalTextureDisplacement = textureLoader.load('/metal/Metal001_1K_Displacement.jpg')
const metalTextureMetalness = textureLoader.load('/metal/Metal001_1K_Metalness.jpg')
const metalTextureNormals = textureLoader.load('/metal/Metal001_1K_Normal.jpg')
const metalTextureRoughness = textureLoader.load('/metal/Metal001_1K_Roughness.jpg')

const platesTextureColor = textureLoader.load('/plates/MetalPlates006_1K_Color.jpg')
const platesTextureDisplacement = textureLoader.load('/plates/MetalPlates006_1K_Displacement.jpg')
const platesTextureMetalness = textureLoader.load('/plates/MetalPlates006_1K_Metalness.jpg')
const platesTextureNormals = textureLoader.load('/plates/MetalPlates006_1K_Normal.jpg')
const platesTextureRoughness = textureLoader.load('/plates/MetalPlates006_1K_Roughness.jpg')

const rockTextureColor = textureLoader.load('/rock/Rock028_1K_Color.jpg')
const rockTextureAmbientOcclusion = textureLoader.load('/rock/Rock028_1K_AmbientOcclusion.jpg')
const rockTextureDisplacement = textureLoader.load('/rock/Rock028_1K_Displacement.jpg')
const rockTextureNormals = textureLoader.load('/rock/Rock028_1K_Normal.jpg')
const rockTextureRoughness = textureLoader.load('/rock/Rock028_1K_Roughness.jpg')

/**
 * Object
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.x = 1
directionalLight.position.y = 1
directionalLight.position.z = 2
scene.add(directionalLight)

/* const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper) */

const sphereGeometry = new THREE.SphereGeometry(1, 40, 40)

const leatherMaterial = new THREE.MeshStandardMaterial()
leatherMaterial.map = leatherTextureColor
leatherMaterial.displacementMap = leatherTextureDisplacement
leatherMaterial.displacementScale = 0.2
leatherMaterial.normalMap = leatherTextureNormals
leatherMaterial.roughnessMap = leatherTextureRoughness
leatherMaterial.roughness = 1
leatherMaterial.envMap = cubeTextureEnvironment
leatherMaterial.envMapIntensity = 0.2

const metalMaterial = new THREE.MeshStandardMaterial()
metalMaterial.map = metalTextureColor
metalMaterial.displacementMap = metalTextureDisplacement
metalMaterial.displacementScale = 0.2
metalMaterial.metalnessMap = metalTextureMetalness
metalMaterial.metalness = 1
metalMaterial.normalMap = metalTextureNormals
metalMaterial.roughnessMap = metalTextureRoughness
metalMaterial.roughness = 1
metalMaterial.envMap = cubeTextureEnvironment
metalMaterial.envMapIntensity = 1

const platesMaterial = new THREE.MeshStandardMaterial()
platesMaterial.map = platesTextureColor
platesMaterial.displacementMap = platesTextureDisplacement
platesMaterial.displacementScale = 0.1
platesMaterial.metalnessMap = platesTextureMetalness
platesMaterial.metalness = 1
platesMaterial.normalMap = platesTextureNormals
platesMaterial.roughnessMap = platesTextureRoughness
platesMaterial.envMap = cubeTextureEnvironment
platesMaterial.envMapIntensity = 0.9

const rockMaterial = new THREE.MeshStandardMaterial()
rockMaterial.map = rockTextureColor
rockMaterial
rockMaterial.aoMap = rockTextureAmbientOcclusion
rockMaterial.aoMapIntensity = 1
rockMaterial.displacementMap = rockTextureDisplacement
rockMaterial.displacementScale = 0.3
rockMaterial.normalMap = rockTextureNormals
rockMaterial.roughnessMap = rockTextureRoughness
rockMaterial.roughness = 1

const leatherMesh = new THREE.Mesh(sphereGeometry, leatherMaterial)
leatherMesh.position.x = -2
leatherMesh.position.y = 2

const metalMesh = new THREE.Mesh(sphereGeometry, metalMaterial)
metalMesh.position.x = -2
metalMesh.position.y = -2

const platesMesh = new THREE.Mesh(sphereGeometry, platesMaterial)
platesMesh.position.x = 2
platesMesh.position.y = 2

const rockMesh = new THREE.Mesh(sphereGeometry, rockMaterial)
rockMesh.position.x = 2
rockMesh.position.y = -2

console.log(rockMesh.geometry.attributes.uv.array)

// Adding Ambient Occlusion UV coordinates
rockMesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(rockMesh.geometry.attributes.uv.array, 2))

scene.add(leatherMesh, metalMesh, platesMesh, rockMesh)

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime()

     leatherMesh.rotation.y = elapsedTime * 0.5
     metalMesh.rotation.y = elapsedTime * 0.5
     platesMesh.rotation.y = elapsedTime * 0.5
     rockMesh.rotation.y = elapsedTime * 0.5
 
     // Update controls
     controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()


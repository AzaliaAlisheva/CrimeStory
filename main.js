// import './style.css';
import * as THREE from './three/src/Three.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader} from './three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const azaliaTexture = new THREE.TextureLoader().load('azalia.jpg');

const azalia = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: azaliaTexture }));
azalia.position.z = -5;
azalia.position.x = 2.8;

scene.add(azalia);

// Cone

const myCone = new THREE.TetrahedronGeometry(10);
const coneMaterial = new THREE.MeshBasicMaterial( {color: 0x800080} );
const cone = new THREE.Mesh( myCone, coneMaterial );
scene.add(cone);
cone.position.z = 20;
cone.position.x = -20;
cone.position.y = 0;

// Torus

const geometry = new THREE.TorusGeometry(8, 1, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const torus = new THREE.Mesh(geometry, material);
torus.position.z = 5;
scene.add(torus);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 80;
moon.position.setX(30);
moon.position.y = 10;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

//   azalia.rotation.y += 0.01;
//   azalia.rotation.x += 0.01;


  camera.position.z = t * -0.015;
  camera.position.x = t * 0.005;
  camera.position.y = t * -0.0005;
  camera.rotation.y = t * 0.0005;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;
  // torus.rotation.z += 0.01;
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.015;

  // controls.update();

  renderer.render(scene, camera);
}

function loadGLTF() {
  const loader = new GLTFLoader();

  loader.load('crime_scene.gltf', function(gltf) {
    const fMesh = gltf.scene.children.find((child) => child.name === 'Fridge');
    scene.add(fMesh);
    fMesh.position.x = 5;
    fMesh.position.y = 0;
    fMesh.position.z = 22;
    fMesh.rotation.y = -1.5;
  });

  loader.load('crime_scene.gltf', function(gltf) {
    const sMesh = gltf.scene.children.find((child) => child.name === 'Search');
    scene.add(sMesh);
    sMesh.position.x = -10;
    sMesh.position.y = 1.5;
    sMesh.position.z = 36.5;
    sMesh.rotation.y = -1.6;
    sMesh.rotation.x = 0.5;
  });
}

loadGLTF();
animate();
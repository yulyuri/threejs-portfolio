import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

import * as THREE from "three";

// always need a scene , camera and a renderer

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000) ;
const renderer = new THREE.WebGLRenderer ({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera );


//object need geometry , material , mesh
//material can write own custom shaders and need light source
//mesh = geometry + material
const geometry = new THREE.TorusGeometry( 10, 3 , 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)




scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement);

function addstar() {
  const geometry = new THREE.SphereGeometry(0.25 , 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y ,z);
  scene.add(star)
}

Array(200).fill().forEach(addstar)

const spaceTexture = new THREE.TextureLoader().load('/images/space.png')
scene.background = spaceTexture;

const chynTexture = new THREE.TextureLoader().load('/images/Chyn.png');
const Chyn = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial( {map:chynTexture})
);
scene.add(Chyn);


const moonTexture = new THREE.TextureLoader().load('/images/redmoon.jpg');
const normalTexture = new THREE.TextureLoader().load('/images/normal.jpg');
const Moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  normalMap: normalTexture} )
); 
scene.add(Moon);

Moon.position.z = 30;
Moon.position.setX(-10);



function moveCamera(){
  const t = document.body.getBoundingClientRect().top; //get dimensions and how far away from top
  Moon.rotation.x += 0.05;
  Moon.rotation.y += 0.075;
  Moon.rotation.z += 0.05;

  Chyn.rotation.y += 0.01;
  Chyn.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;



}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate);//tell  browseer wants animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render( scene, camera);
}

animate()


import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';
import { PointerLockControls } from 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/PointerLockControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
scene.fog = new THREE.Fog(0x111111, 0, 75);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 1.7;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Walls
const wallGeometry = new THREE.BoxGeometry(100, 5, 1);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xa0a0a0 });

const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 2.5, -50);
wall1.castShadow = true;
wall1.receiveShadow = true;
scene.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(0, 2.5, 50);
wall2.castShadow = true;
wall2.receiveShadow = true;
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 100), wallMaterial);
wall3.position.set(-50, 2.5, 0);
wall3.castShadow = true;
wall3.receiveShadow = true;
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 100), wallMaterial);
wall4.position.set(50, 2.5, 0);
wall4.castShadow = true;
wall4.receiveShadow = true;
scene.add(wall4);


// Player Controls
const controls = new PointerLockControls(camera, document.body);
const blocker = document.createElement('div');
blocker.style.position = 'absolute';
blocker.style.width = '100%';
blocker.style.height = '100%';
blocker.style.backgroundColor = 'rgba(0,0,0,0.5)';
blocker.style.display = 'flex';
blocker.style.justifyContent = 'center';
blocker.style.alignItems = 'center';
blocker.style.color = 'white';
blocker.style.fontSize = '24px';
blocker.innerHTML = 'Click to play';
document.body.appendChild(blocker);

blocker.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    blocker.style.display = 'none';
});

controls.addEventListener('unlock', () => {
    blocker.style.display = 'flex';
});

const keys = {};
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

const moveSpeed = 5;
const clock = new THREE.Clock();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (keys['KeyW']) {
        controls.moveForward(moveSpeed * delta);
    }
    if (keys['KeyS']) {
        controls.moveForward(-moveSpeed * delta);
    }
    if (keys['KeyA']) {
        controls.moveRight(-moveSpeed * delta);
    }
    if (keys['KeyD']) {
        controls.moveRight(moveSpeed * delta);
    }

    renderer.render(scene, camera);
}

animate();
"use strict";
//NCC-1701
console.log("                                                                \n  ___________________  *       _-_                   *          \n  \\\%c==============%c_%c=%c_/ ____.---'---`---.____   *        *     *  \n              \\\_ \\\    \\\----._________.----/                     \n         *      \\\ \\\   /  /    `-_-'              *            * \n  *         __,--`.`-'..'-_                            *        \n           /____          ||    *         *                     \n                `--.____,-'                                     \n                                                                ", "color: #ff0000;", "color: #000000;", "color: #0000ff;", "color: #000000;");

function initScreenAnd3D() {
  container = document.getElementById('container');
  HEIGHT = container.offsetHeight;
  WIDTH = container.width;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;

  scene = new THREE.Scene();
  
  scene.fog = new THREE.Fog(0xffffff, 150,300);
  
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 50;
  nearPlane = 1;
  farPlane = 2000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.x = 0;
  camera.position.z = 100;
  camera.position.y = 0;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
  renderer.shadowMap.enabled = true;

  container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);

  clock = new THREE.Clock();
  handleWindowResize();
}

function handleWindowResize() {
  HEIGHT = container.offsetHeight;
  WIDTH = container.offsetWidth;
  windowHalfX = WIDTH / 2;
  windowHalfY = HEIGHT / 2;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

function createLights() {
  globalLight = new THREE.AmbientLight(0xffffff, 1);
  shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  shadowLight.position.set(10, 8, 8);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -40;
  shadowLight.shadow.camera.right = 40;
  shadowLight.shadow.camera.top = 40;
  shadowLight.shadow.camera.bottom = -40;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;
  scene.add(globalLight);
  scene.add(shadowLight);
}

var Zul = function() {
	
	this.mesh = new THREE.Group();
	this.body = new THREE.Group();
	this.mesh.add(this.body);

	var headGeom = new THREE.CubeGeometry(16,16,16, 1);
	this.head = new THREE.Mesh(headGeom, blueMat);
	this.head.position.y = 21;
	this.head.castShadow = true;
	this.body.add(this.head);

}

Zul.prototype.blink = function(){

}

function createZul() {
  zul = new Zul();
  zul.mesh.position.y=-15;
  scene.add(zul.mesh);
}

function loop(){
  render();  
  requestAnimationFrame(loop);
}

function render(){
  renderer.render(scene, camera);
}


window.addEventListener('load', init, false);

function init(event){
  initScreenAnd3D();
  createLights();
  createZul();
  loop();
}
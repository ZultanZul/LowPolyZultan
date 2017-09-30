"use strict";
//NCC-1701
console.log("                                                                \n  ___________________  *       _-_                   *          \n  \\\%c==============%c_%c=%c_/ ____.---'---`---.____   *        *     *  \n              \\\_ \\\    \\\----._________.----/                     \n         *      \\\ \\\   /  /    `-_-'              *            * \n  *         __,--`.`-'..'-_                            *        \n           /____          ||    *         *                     \n                `--.____,-'                                     \n                                                                ", "color: #ff0000;", "color: #000000;", "color: #0000ff;", "color: #000000;");


var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container, controls;

function createScene() {
  container = document.getElementById('container');
  HEIGHT = container.offsetHeight;
  WIDTH = container.offsetWidth;
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
  camera.position.z = 80;
  camera.position.y = 0;

  renderer = new THREE.WebGLRenderer({ 

    alpha: true, 
    antialias: true 
  });

  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
  renderer.shadowMap.enabled = true;  
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);
  handleWindowResize();


  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

var isMobile = /iPhone|Android/i.test(navigator.userAgent);

var globalLight, shadowLight,backLight;

function createLights() {
  globalLight = new THREE.HemisphereLight(0xffffff, 0x555555, 1);
  shadowLight = new THREE.DirectionalLight(0xffffff,  .4);
  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(100, 100, -200);

  shadowLight.position.set(100, 250, 75);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -150;
  shadowLight.shadow.camera.right = 150;
  shadowLight.shadow.camera.top = 150;
  shadowLight.shadow.camera.bottom = -150;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  
  if (isMobile) shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 1024;
  if (!isMobile) shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;

  scene.add(globalLight);
  //scene.add(backLight);
  scene.add(shadowLight);
}

var Colors = {
  skin:0xffe0bd,
  auburn:0x905537,
  brown:0x6e5136,
  black: 0x2e2e2e,
  white: 0xffffff,
  lightBlue: 0x6295a8,
};

var skinMat = new THREE.MeshLambertMaterial({color:Colors.skin, flatShading:true});
var auburnMat = new THREE.MeshLambertMaterial({color:Colors.auburn, flatShading:true});
var brownMat = new THREE.MeshLambertMaterial({color:Colors.brown, flatShading:true});
var blackMat = new THREE.MeshLambertMaterial({color:Colors.black, flatShading:true});
var whiteMat = new THREE.MeshPhongMaterial({color:Colors.white, flatShading:true});
var blueMat = new THREE.MeshPhongMaterial({color:Colors.lightBlue, flatShading:true});
var normalMat = new THREE.MeshNormalMaterial({});

var Zul = function() {
	
	this.mesh = new THREE.Group();
	this.body = new THREE.Group();
	this.mesh.add(this.body);

	var headGeom = new THREE.BoxBufferGeometry(16,16,16);
	this.head = new THREE.Mesh(headGeom, skinMat);
  this.head.castShadow = true;
  // this.head.receiveShadow = true;
	this.head.position.y = 21;
	this.body.add(this.head);

  this.beard = new THREE.Group();
  this.beard.position.y = -7;
  this.beard.position.z = 0.5;
  this.head.add(this.beard);

//BEARD
////////////////////////////////////

  var beard1Geom = new THREE.BoxBufferGeometry(2,12,16);

    var beard1 = new THREE.Mesh(beard1Geom, auburnMat);
    beard1.position.set(9, 0, 0);
    beard1.castShadow = true;
    beard1.receiveShadow = true;

    var beard2 = new THREE.Mesh(beard1Geom, auburnMat);
    beard2.position.set(7, -3, 1);
    beard2.castShadow = true;
    beard2.receiveShadow = true;

    var beard3 = beard1.clone();
    var beard4 = beard2.clone(); 
    beard3.position.x = -beard1.position.x;
    beard4.position.x = -beard2.position.x;

  var beard2Geom = new THREE.BoxGeometry(3,14,16);
    //beard2Geom.vertices[0].z-=1;
    beard2Geom.vertices[2].z-=2;
    beard2Geom.vertices[7].z-=2;

    var beard5 = new THREE.Mesh(beard2Geom, auburnMat);
    beard5.position.set(5, -5, 2);
    beard5.castShadow = true;
    beard5.receiveShadow = true;

  var beard3Geom = new THREE.BoxGeometry(3,15,16);
    beard3Geom.vertices[2].z-=2;
    beard3Geom.vertices[7].z-=2;

    var beard6 = new THREE.Mesh(beard3Geom, auburnMat);
    beard6.position.set(2, -5.5, 2.5);
    beard6.castShadow = true;
    beard6.receiveShadow = true;
    var beard7 = beard5.clone();
    var beard8 = beard6.clone(); 
    beard7.position.x = -beard5.position.x;
    beard8.position.x = -beard6.position.x;

  var beard4Geom = new THREE.BoxGeometry(1,15.5,16);
  beard4Geom.vertices[2].z-=1;
  beard4Geom.vertices[7].z-=1;
  var beard9 = new THREE.Mesh(beard4Geom, auburnMat);
  beard9.position.set(0, -5.75, 2.75);
  beard9.castShadow = true;
  beard9.receiveShadow = true;

  var mouthGeom = new THREE.BoxGeometry(1,15.5,16);

  this.beard.add(beard1, beard2, beard3, beard4, beard5, beard6, beard7, beard8, beard9); 


  var moustacheGeom = new THREE.BoxGeometry(14,3,3,3);
    moustacheGeom.vertices[0].y-=2;
    moustacheGeom.vertices[1].y-=2;
    moustacheGeom.vertices[2].y-=2;
    moustacheGeom.vertices[3].y-=2;
    moustacheGeom.vertices[4].y-=2;
    moustacheGeom.vertices[5].y-=2;
    moustacheGeom.vertices[6].y-=2;
    moustacheGeom.vertices[7].y-=2;
    moustacheGeom.vertices[8].x-=1;
    moustacheGeom.vertices[9].x+=1;

    moustacheGeom.applyMatrix( new THREE.Matrix4().makeTranslation(0, 4, 0));
  this.moustache = new THREE.Mesh(moustacheGeom, auburnMat);
  this.moustache.castShadow = true;
  this.moustache.receiveShadow = true;

  this.moustache.position.set(0,0,9);
  this.beard.add(this.moustache);


//GLASSES
////////////////////////////////////

  this.glasses = new THREE.Group();
  this.glasses.position.set(0,0,9);
  this.head.add(this.glasses);

  var frameOuterGeom = new THREE.BoxGeometry(6,5,1);
  var frameInnerGeom = new THREE.BoxGeometry(4,3,1);
  frameOuterGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/45));
  frameInnerGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/45));
  var frameBSP = new ThreeBSP(frameOuterGeom);
  var frameCutBSP = new ThreeBSP(frameInnerGeom);
  var frameintersectionBSP = frameBSP.subtract(frameCutBSP);  
  var frameLeft = frameintersectionBSP.toMesh(blackMat);
  frameLeft.position.set(4,3,0);
  frameLeft.castShadow = true;
  frameLeft.receiveShadow = true;

  var frameRight = frameLeft.clone();
  frameRight.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/30));
  frameRight.position.set(-4,3,0);

  var frameMidGeom = new THREE.BoxGeometry(3,1,1);
  var frameMid = new THREE.Mesh(frameMidGeom, blackMat);
  frameMid.position.set(0, 3, 0);
  frameMid.castShadow = true;
  frameMid.receiveShadow = true;

  var frameEndGeom = new THREE.BoxGeometry(1.5,1,1);
  var frameEndRight = new THREE.Mesh(frameEndGeom, blackMat);
  frameEndRight.position.set(7.5, 3, 0);
  frameEndRight.castShadow = true;
  frameEndRight.receiveShadow = true;

  var frameEndLeft = frameEndRight.clone();
  frameEndLeft.position.x = -frameEndRight.position.x;

  var frameSpokeGeom = new THREE.BoxGeometry(1,1,12);
  var frameSpokeRight = new THREE.Mesh(frameSpokeGeom, blackMat);
  frameSpokeRight.position.set(8, 3, -5.5);
  frameSpokeRight.castShadow = true;
  frameSpokeRight.receiveShadow = true;

  var frameSpokeLeft = frameSpokeRight.clone();
  frameSpokeLeft.position.x = -frameSpokeRight.position.x;

  this.glasses.add(frameLeft, frameRight, frameMid, frameEndRight,frameEndLeft,frameSpokeRight,frameSpokeLeft);

//HAIR
////////////////////////////////////

  this.hair = new THREE.Group();
  this.hair.position.set(0,9,0);
  this.head.add(this.hair);

  var hairFlatGeom = new THREE.BoxBufferGeometry(10,2,18);

    var hair1 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair1.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/40));
    hair1.position.set(-4, -0.5, 0);
    hair1.castShadow = true;
    hair1.receiveShadow = true;

    var hair2 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair2.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/10));
    hair2.position.set(-2, 1, 0);
    hair2.castShadow = true;
    hair2.receiveShadow = true;

    var hair3 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair3.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/5));
    hair3.position.set(2, 1, 0);
    hair3.castShadow = true;
    hair3.receiveShadow = true;

    var hair4 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair4.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/4));
    hair4.position.set(6, 0, 0);
    hair4.castShadow = true;
    hair4.receiveShadow = true;

  var hairFlatBackGeom = new THREE.BoxGeometry(18,7,6);
      hairFlatBackGeom.vertices[0].x-=1;
      hairFlatBackGeom.vertices[1].x-=1;
      hairFlatBackGeom.vertices[4].x+=1;
      hairFlatBackGeom.vertices[5].x+=1;

    var hair5 = new THREE.Mesh(hairFlatBackGeom, auburnMat);
    //hair5.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI));
    hair5.position.set(0, -4.5, -6);
    hair5.castShadow = true;
    hair5.receiveShadow = true;

  var hairTuftGeom = new THREE.CylinderGeometry( 1,1.5, 10, 4 );

    var hairTuft1 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft1.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/10));
    hairTuft1.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/10));
    hairTuft1.position.set(-4, 2, -4);
    hairTuft1.castShadow = true;
    hairTuft1.receiveShadow = true;

    var hairTuft2 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft2.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/6));
    hairTuft2.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/10));
    hairTuft2.position.set(-6.5, -1, -1);
    hairTuft2.castShadow = true;
    hairTuft2.receiveShadow = true;

    var hairTuft3 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft3.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/3));
    hairTuft3.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/3));
    hairTuft3.position.set(1, 3, -3);
    hairTuft3.castShadow = true;
    hairTuft3.receiveShadow = true;

  this.hair.add(hair1,hair2,hair3,hair4,hair5,hairTuft1,hairTuft2,hairTuft3);

//EYES
////////////////////////////////////

  this.eyes = new THREE.Group();
  this.eyes.position.set(0,3,9);
  this.head.add(this.eyes);

  var eyeWhiteGeom = new THREE.PlaneGeometry( 2.5, 2.5 );

    var eyeWhiteRight = new THREE.Mesh(eyeWhiteGeom, whiteMat);
    eyeWhiteRight.position.set(-3.75,0,0);
    eyeWhiteRight.castShadow = false;
    eyeWhiteRight.receiveShadow = false;

    var eyeBlueGeom = new THREE.PlaneGeometry( 1.5, 1.5 );

    this.eyeBlueRight = new THREE.Mesh(eyeBlueGeom, blueMat);
    this.eyeBlueRight.position.set(0,0,.01);
    this.eyeBlueRight.castShadow = false;
    this.eyeBlueRight.receiveShadow = false;

  eyeWhiteRight.add(this.eyeBlueRight);

    var eyePupilGeom = new THREE.PlaneGeometry( 1, 1 );

    this.eyePupilRight = new THREE.Mesh(eyePupilGeom, blackMat);
    this.eyePupilRight.position.set(0,0,.02);
    this.eyePupilRight.castShadow = false;
    this.eyePupilRight.receiveShadow = false;

  this.eyeBlueRight.add(this.eyePupilRight); 

    var eyeWhiteLeft = new THREE.Mesh(eyeWhiteGeom, whiteMat);
    eyeWhiteLeft.position.set(3.75,0,0);
    eyeWhiteLeft.castShadow = false;
    eyeWhiteLeft.receiveShadow = false;

    this.eyeBlueLeft = new THREE.Mesh(eyeBlueGeom, blueMat);
    this.eyeBlueLeft.position.set(0,0,.01);
    this.eyeBlueLeft.castShadow = false;
    this.eyeBlueLeft.receiveShadow = false;

  eyeWhiteLeft.add(this.eyeBlueLeft);

    this.eyePupilLeft = new THREE.Mesh(eyePupilGeom, blackMat);
    this.eyePupilLeft.position.set(0,0,.02);
    this.eyePupilLeft.castShadow = false;
    this.eyePupilLeft.receiveShadow = false;

  this.eyeBlueLeft.add(this.eyePupilLeft); 

  this.eyes.add(eyeWhiteRight, eyeWhiteLeft);

//EYE BROWS
////////////////////////////////////

  this.eyeBrows = new THREE.Group();
  this.eyeBrows.position.set(0,6,8);
  this.head.add(this.eyeBrows);

  var eyeBrowGeom = new THREE.BoxGeometry(4,1,1);

    this.eyeBrowRight = new THREE.Mesh(eyeBrowGeom, auburnMat);
    this.eyeBrowRight.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/45));
    this.eyeBrowRight.position.set(-3.75,0,0);
    this.eyeBrowRight.castShadow = false;
    this.eyeBrowRight.receiveShadow = false;


    this.eyeBrowLeft = new THREE.Mesh(eyeBrowGeom, auburnMat);
    this.eyeBrowLeft.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/45));
    this.eyeBrowLeft.position.set(3.75,0,0);
    this.eyeBrowLeft.castShadow = false;
    this.eyeBrowLeft.receiveShadow = false;

  this.eyeBrows.add(this.eyeBrowRight, this.eyeBrowLeft);

//Freckles
////////////////////////////////////
  this.freckles = new THREE.Group();
  this.freckles.position.set(0,0,8);
  this.head.add(this.freckles);

    var frecklesGeom = new THREE.PlaneGeometry( 0.5, 0.5 );

    var freckle1 = new THREE.Mesh(frecklesGeom, brownMat);
    freckle1.position.set(-5,0,.01);
    freckle1.castShadow = false;
    freckle1.receiveShadow = false;

    var freckle2 = freckle1.clone();
    freckle2.position.set(-5.5,-1,.01);

    var freckle3 = freckle1.clone();
    freckle3.position.set(-4,-0.5,.01);

    var freckle4 = freckle1.clone();
    freckle4.position.x = -freckle1.position.x;
    var freckle5 = freckle2.clone();
    freckle5.position.x = -freckle2.position.x;
    var freckle6 = freckle3.clone();
    freckle6.position.x = -freckle3.position.x;

  this.freckles.add(freckle1,freckle2,freckle3, freckle4,freckle5,freckle6);

}

Zul.prototype.Nod = function(){

  this.head.rotation.z = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ;
  this.head.rotation.x = Math.sin(Date.now() * 0.01) * Math.PI * 0.01 ;
  this.head.rotation.y = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ; 
}

Zul.prototype.eyeMove = function(){

  var distance = 1;
  this.eyeBlueRight.position.x = Math.sin(Date.now() * 0.005) * distance ;
  this.eyeBlueLeft.position.x = Math.sin(Date.now() * 0.005) * distance ;

  this.eyeBrowRight.position.y = Math.sin(Date.now() * 0.005) * distance ;
  this.eyeBrowLeft.position.y = Math.cos(Date.now() * 0.005) * distance ;
}

Zul.prototype.moustacheMove = function(){

  var distance =.5;
  this.moustache.position.y = Math.cos(Date.now() * 0.01) * distance ;
}

function blinkLoop(){
    var isBlinking;

    if ((Math.random()>.99) || (isBlinking = false)) blink();

  function blink() {
      if (isBlinking) return;
      zul.eyes.scale.y = 1;
      TweenMax.to(zul.eyes.scale, .07, {
          y: 0, yoyo: true, repeat: 1, onComplete: () => {
             isBlinking = false;
          }
      });
  }
}


var zul;

function createZul() {
  zul = new Zul();
  zul.mesh.position.y=-18;
  scene.add(zul.mesh);
}

function loop(){
  zul.Nod();
  zul.eyeMove();
  zul.moustacheMove();
  blinkLoop();
  render();  
  requestAnimationFrame(loop);
}

function render(){
  renderer.render(scene, camera);
}


window.addEventListener('load', init, false);

function init(){
  createScene();
  createLights();
  createZul();
  loop();
}
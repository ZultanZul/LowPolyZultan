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

  var beardGeomMerged = new THREE.Geometry();

  var beard1Geom = new THREE.BoxGeometry(2,12,16);

    var beard1 = new THREE.Mesh(beard1Geom, auburnMat);
    beard1.applyMatrix( new THREE.Matrix4().makeTranslation(9, 0, 0));
    beard1.updateMatrix();
    beardGeomMerged.merge(beard1.geometry, beard1.matrix);

    var beard2 = new THREE.Mesh(beard1Geom, auburnMat);
    beard2.applyMatrix( new THREE.Matrix4().makeTranslation(7, -3, 1));
    beard2.updateMatrix();
    beardGeomMerged.merge(beard2.geometry, beard2.matrix);

    var beard3 = beard1.clone();
    beard3.position.x = -beard1.position.x;
    beard3.updateMatrix();
    beardGeomMerged.merge(beard3.geometry, beard3.matrix);  

    var beard4 = beard2.clone(); 
    beard4.position.x = -beard2.position.x;
    beard4.updateMatrix();
    beardGeomMerged.merge(beard4.geometry, beard4.matrix);


  var beard2Geom = new THREE.BoxGeometry(3,14,16);
    beard2Geom.vertices[2].z-=2;
    beard2Geom.vertices[7].z-=2;

    var beard5 = new THREE.Mesh(beard2Geom, auburnMat);
    beard5.applyMatrix( new THREE.Matrix4().makeTranslation(5, -5, 2));
    beard5.updateMatrix();
    beardGeomMerged.merge(beard5.geometry, beard5.matrix);

  var beard3Geom = new THREE.BoxGeometry(3,14,16);
    beard3Geom.vertices[2].z-=2;
    beard3Geom.vertices[7].z-=2;

    var beard6 = new THREE.Mesh(beard3Geom, auburnMat);
    beard6.applyMatrix( new THREE.Matrix4().makeTranslation(2, -6, 2.5));
    beard6.updateMatrix();
    beardGeomMerged.merge(beard6.geometry, beard6.matrix);

    var beard7 = beard5.clone();
    beard7.position.x = -beard5.position.x;
    beard7.updateMatrix();
    beardGeomMerged.merge(beard7.geometry, beard7.matrix);  
    var beard8 = beard6.clone(); 
    beard8.position.x = -beard6.position.x;
    beard8.updateMatrix();
    beardGeomMerged.merge(beard8.geometry, beard8.matrix);  


  var beard4Geom = new THREE.BoxGeometry(1,14.5,16);
    beard4Geom.vertices[2].z-=1;
    beard4Geom.vertices[7].z-=1;
    var beard9 = new THREE.Mesh(beard4Geom, auburnMat);
    beard9.applyMatrix( new THREE.Matrix4().makeTranslation(0, -6.25, 2.75));
    beard9.updateMatrix();
    beardGeomMerged.merge(beard9.geometry, beard9.matrix);  

  var beardMerged = new THREE.Mesh(beardGeomMerged, auburnMat);
  beardMerged.castShadow = true;
  beardMerged.receiveShadow = true;


  var mouthGeom = new THREE.BoxGeometry(10,4,1);
  var mouth = new THREE.Mesh(mouthGeom, blackMat); 
  mouth.position.set(0,2,8);
  mouth.castShadow = false;
  mouth.receiveShadow = true;

  var teethGeom = new THREE.BoxGeometry(10,1,1);
  var teeth = new THREE.Mesh(teethGeom, whiteMat); 
  teeth.position.set(0,1,0.1);
  teeth.castShadow = false;
  teeth.receiveShadow = true;
  mouth.add(teeth)

  this.beard.add(beardMerged, mouth); 


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


  var frameGeomMerged = new THREE.Geometry();

  var frameOuterGeom = new THREE.BoxGeometry(6,5,1);
  var frameInnerGeom = new THREE.BoxGeometry(4,3,1);
  frameOuterGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/45));
  frameInnerGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/45));
  var frameBSP = new ThreeBSP(frameOuterGeom);
  var frameCutBSP = new ThreeBSP(frameInnerGeom);
  var frameintersectionBSP = frameBSP.subtract(frameCutBSP);  
  var frameLeft = frameintersectionBSP.toMesh(blackMat);
  frameLeft.applyMatrix( new THREE.Matrix4().makeTranslation(4, 3, 0));
  frameLeft.updateMatrix();
  frameGeomMerged.merge(frameLeft.geometry, frameLeft.matrix);  

  var frameRight = frameLeft.clone();
  frameRight.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/30));
  frameRight.applyMatrix( new THREE.Matrix4().makeTranslation(-7.5, -0.25, 0));
  frameRight.updateMatrix();
  frameGeomMerged.merge(frameRight.geometry, frameRight.matrix);  

  var frameMidGeom = new THREE.BoxGeometry(3,1,1);
  var frameMid = new THREE.Mesh(frameMidGeom, blackMat);
  frameMid.applyMatrix( new THREE.Matrix4().makeTranslation(0, 3, 0));
  frameMid.updateMatrix();
  frameGeomMerged.merge(frameMid.geometry, frameMid.matrix);  

  var frameEndGeom = new THREE.BoxGeometry(1.5,1,1);
  var frameEndRight = new THREE.Mesh(frameEndGeom, blackMat);
  frameEndRight.applyMatrix( new THREE.Matrix4().makeTranslation(7.5, 3, 0));
  frameEndRight.updateMatrix();
  frameGeomMerged.merge(frameEndRight.geometry, frameEndRight.matrix);  

  var frameEndLeft = frameEndRight.clone();
  frameEndLeft.position.x = -frameEndRight.position.x;
  frameEndLeft.updateMatrix();
  frameGeomMerged.merge(frameEndLeft.geometry, frameEndLeft.matrix);  

  var frameSpokeGeom = new THREE.BoxGeometry(1,1,12);
  var frameSpokeRight = new THREE.Mesh(frameSpokeGeom, blackMat);
  frameSpokeRight.applyMatrix( new THREE.Matrix4().makeTranslation(8, 3, -5.5));
  frameSpokeRight.updateMatrix();
  frameGeomMerged.merge(frameSpokeRight.geometry, frameSpokeRight.matrix);  

  var frameSpokeLeft = frameSpokeRight.clone();
  frameSpokeLeft.position.x = -frameSpokeRight.position.x;
  frameSpokeLeft.updateMatrix();
  frameGeomMerged.merge(frameSpokeLeft.geometry, frameSpokeLeft.matrix); 

  var frameMerged = new THREE.Mesh(frameGeomMerged, blackMat);
  frameMerged.castShadow = true;
  frameMerged.receiveShadow = true;

  this.glasses.add(frameMerged);

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


    var frecklesGeomMerged = new THREE.Geometry();
    
    var frecklesGeom = new THREE.PlaneGeometry( 0.5, 0.5 );

    var freckle1 = new THREE.Mesh(frecklesGeom, brownMat);
    freckle1.applyMatrix( new THREE.Matrix4().makeTranslation(-5, 0, 0.01));
    freckle1.updateMatrix();
    frecklesGeomMerged.merge(freckle1.geometry, freckle1.matrix);  

    var freckle2 = freckle1.clone();
    freckle2.applyMatrix( new THREE.Matrix4().makeTranslation(-0.5,-1,0));
    freckle2.updateMatrix();
    frecklesGeomMerged.merge(freckle2.geometry, freckle2.matrix);  

    var freckle3 = freckle1.clone();
    freckle3.applyMatrix( new THREE.Matrix4().makeTranslation(1,-0.5,0));
    freckle3.updateMatrix();
    frecklesGeomMerged.merge(freckle3.geometry, freckle3.matrix);  

    var freckle4 = freckle1.clone();
    freckle4.position.x = -freckle1.position.x;
    freckle4.updateMatrix();
    frecklesGeomMerged.merge(freckle4.geometry, freckle4.matrix);  
    var freckle5 = freckle2.clone();
    freckle5.position.x = -freckle2.position.x;
    freckle5.updateMatrix();
    frecklesGeomMerged.merge(freckle5.geometry, freckle5.matrix);  
    var freckle6 = freckle3.clone();
    freckle6.position.x = -freckle3.position.x;
    freckle6.updateMatrix();
    frecklesGeomMerged.merge(freckle6.geometry, freckle6.matrix); 

  var freckledMerged = new THREE.Mesh(frecklesGeomMerged, brownMat);
  freckledMerged.castShadow = false;
  freckledMerged.receiveShadow = false;

  this.freckles.add(freckledMerged);

}

Zul.prototype.Nod = function(){

  this.head.rotation.z = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ;
  this.head.rotation.x = Math.sin(Date.now() * 0.01) * Math.PI * 0.01 ;
  this.head.rotation.y = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ; 

  this.body.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1 ; 
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
        isBlinking = true;
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
  zul.mesh.position.y=-12;
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
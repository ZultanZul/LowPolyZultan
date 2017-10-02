"use strict";
//NCC-1701
console.log("                                                                \n  ___________________  *       _-_                   *          \n  \\\%c==============%c_%c=%c_/ ____.---'---`---.____   *        *     *  \n              \\\_ \\\    \\\----._________.----/                     \n         *      \\\ \\\   /  /    `-_-'              *            * \n  *         __,--`.`-'..'-_                            *        \n           /____          ||    *         *                     \n                `--.____,-'                                     \n                                                                ", "color: #ff0000;", "color: #000000;", "color: #0000ff;", "color: #000000;");


var scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
    renderer, container, controls,loaderManager,loaded;

function createScene() {
  container = document.getElementById('container');
  HEIGHT = container.offsetHeight;
  WIDTH = container.offsetWidth;
  scene = new THREE.Scene();
  //scene.fog = new THREE.Fog(0xffffff, 150,300);
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
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);
  handleWindowResize();
  //ORBIT CONTROLS
  controls = new THREE.OrbitControls(camera, renderer.domElement);

}

var loaderManager = new THREE.LoadingManager();
loaderManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loaderManager.onLoad = function ( ) {
  console.log( 'Loading complete!');
  finishedLoading();
};
loaderManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
loaderManager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};

function finishedLoading(){
  loaded = true;
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
  //backLight.position.set(100, 100, -200);

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
  beige: 0xa49178
};

var skinMat = new THREE.MeshLambertMaterial({color:Colors.skin, flatShading:true});
var skin2Mat = new THREE.MeshLambertMaterial({color:Colors.skin, flatShading:true});
var auburnMat = new THREE.MeshLambertMaterial({color:Colors.auburn, flatShading:true});
var brownMat = new THREE.MeshLambertMaterial({color:Colors.brown, flatShading:true});
var blackMat = new THREE.MeshLambertMaterial({color:Colors.black, flatShading:true});
var whiteMat = new THREE.MeshPhongMaterial({color:Colors.white, flatShading:true});
var blueMat = new THREE.MeshPhongMaterial({color:Colors.lightBlue, flatShading:true});
var beigeMat = new THREE.MeshPhongMaterial({color:Colors.beige, flatShading:true});
var normalMat = new THREE.MeshNormalMaterial({});

var Head = function() {
	
	this.mesh = new THREE.Group();


	var headGeom = new THREE.BoxBufferGeometry(16,16,16);
	this.head = new THREE.Mesh(headGeom, skinMat);
  this.head.castShadow = true;
  this.mesh.add(this.head);

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
    beard2.applyMatrix( new THREE.Matrix4().makeTranslation(7, -3,7));
    beard2.scale.z = 0.2;
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


  var beard2Geom = new THREE.BoxGeometry(3,14,10);
    beard2Geom.vertices[2].z-=2;
    beard2Geom.vertices[7].z-=2;

    var beard5 = new THREE.Mesh(beard2Geom, auburnMat);
    beard5.applyMatrix( new THREE.Matrix4().makeTranslation(5, -5, 5.5));
    beard5.updateMatrix();
    beardGeomMerged.merge(beard5.geometry, beard5.matrix);

  var beard3Geom = new THREE.BoxGeometry(3,14,10);
    beard3Geom.vertices[2].z-=2;
    beard3Geom.vertices[7].z-=2;

    var beard6 = new THREE.Mesh(beard3Geom, auburnMat);
    beard6.applyMatrix( new THREE.Matrix4().makeTranslation(2, -6, 5.5));
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


  var beard4Geom = new THREE.BoxGeometry(1,14.5,10);
    beard4Geom.vertices[2].z-=1;
    beard4Geom.vertices[7].z-=1;
    var beard9 = new THREE.Mesh(beard4Geom, auburnMat);
    beard9.applyMatrix( new THREE.Matrix4().makeTranslation(0, -6.25, 5.75));
    beard9.updateMatrix();
    beardGeomMerged.merge(beard9.geometry, beard9.matrix);  

 var beard5Geom = new THREE.BoxGeometry(4,8,5);  
    var beard10 = new THREE.Mesh(beard5Geom, auburnMat);
    beard10.applyMatrix( new THREE.Matrix4().makeTranslation(-6, -1, -4));
    beard10.updateMatrix();
    beardGeomMerged.merge(beard10.geometry, beard10.matrix);  

    var beard11 = new THREE.Mesh(beard5Geom, auburnMat);
    beard11.applyMatrix( new THREE.Matrix4().makeTranslation(6, -1, -4));
    beard11.updateMatrix();
    beardGeomMerged.merge(beard11.geometry, beard11.matrix);  

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
  teeth.position.set(0,0.5,0.1);
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

  var hairGeomMerged = new THREE.Geometry();

  var hairFlatGeom = new THREE.BoxGeometry(10,2,18);

    var hair1 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair1.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/40));
    hair1.applyMatrix( new THREE.Matrix4().makeTranslation(-4, -0.5, 0));
    hair1.updateMatrix();
    hairGeomMerged.merge(hair1.geometry, hair1.matrix);  

    var hair2 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair2.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/10));
    hair2.applyMatrix( new THREE.Matrix4().makeTranslation(-2, 1, 0));
    hair2.updateMatrix();
    hairGeomMerged.merge(hair2.geometry, hair2.matrix);  

    var hair3 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair3.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/5));
    hair3.applyMatrix( new THREE.Matrix4().makeTranslation(2, 1, 0));
    hair3.updateMatrix();
    hairGeomMerged.merge(hair3.geometry, hair3.matrix);  

    var hair4 = new THREE.Mesh(hairFlatGeom, auburnMat);
    hair4.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/4));
    hair4.applyMatrix( new THREE.Matrix4().makeTranslation(6, 0, 0));
    hair4.updateMatrix();
    hairGeomMerged.merge(hair4.geometry, hair4.matrix);  

  var hairFlatBackGeom = new THREE.BoxGeometry(18,7,6);
      hairFlatBackGeom.vertices[0].x-=1;
      hairFlatBackGeom.vertices[1].x-=1;
      hairFlatBackGeom.vertices[4].x+=1;
      hairFlatBackGeom.vertices[5].x+=1;

    var hair5 = new THREE.Mesh(hairFlatBackGeom, auburnMat);
    hair5.applyMatrix( new THREE.Matrix4().makeTranslation(0, -4.5, -6));
    hair5.updateMatrix();
    hairGeomMerged.merge(hair5.geometry, hair5.matrix);


  var hairTuftGeom = new THREE.CylinderGeometry( 1,1.5, 10, 4 );

    var hairTuft1 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft1.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/10));
    hairTuft1.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/10));
    hairTuft1.applyMatrix( new THREE.Matrix4().makeTranslation(-4, 2, -4));
    hairTuft1.updateMatrix();
    hairGeomMerged.merge(hairTuft1.geometry, hairTuft1.matrix);

    var hairTuft4 = hairTuft1.clone();
    hairTuft4.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/8));
    hairTuft4.applyMatrix( new THREE.Matrix4().makeTranslation(4, -.5, 1));
    hairTuft4.updateMatrix();
    hairGeomMerged.merge(hairTuft4.geometry, hairTuft4.matrix);


    var hairTuft7 = hairTuft1.clone();
    hairTuft7.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/8));
    hairTuft7.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/8));
    hairTuft7.applyMatrix( new THREE.Matrix4().makeTranslation(0.5, -1, 2));
    hairTuft7.updateMatrix();
    hairGeomMerged.merge(hairTuft7.geometry, hairTuft7.matrix);


    var hairTuft2 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft2.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/6));
    hairTuft2.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/10));
    hairTuft2.applyMatrix( new THREE.Matrix4().makeTranslation(-6.5, -1, -1));
    hairTuft2.updateMatrix();
    hairGeomMerged.merge(hairTuft2.geometry, hairTuft2.matrix);


    var hairTuft5 = hairTuft2.clone();
    hairTuft5.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/10));
    hairTuft5.applyMatrix( new THREE.Matrix4().makeTranslation(2, 1.5, -5));
    hairTuft5.updateMatrix();
    hairGeomMerged.merge(hairTuft5.geometry, hairTuft5.matrix);

    var hairTuft3 = new THREE.Mesh(hairTuftGeom, auburnMat);
    hairTuft3.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/3));
    hairTuft3.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/3));
    hairTuft3.applyMatrix( new THREE.Matrix4().makeTranslation(3, 3, -3));
    hairTuft3.updateMatrix();
    hairGeomMerged.merge(hairTuft3.geometry, hairTuft3.matrix);


    var hairTuft6 = hairTuft3.clone();
    hairTuft6.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/10));
    hairTuft6.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI/5));
    hairTuft6.applyMatrix( new THREE.Matrix4().makeTranslation(2, -1.5, -1));
    hairTuft6.updateMatrix();
    hairGeomMerged.merge(hairTuft6.geometry, hairTuft6.matrix);


    var hairTuft8 = hairTuft6.clone();
    hairTuft8.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/30));
    hairTuft8.applyMatrix( new THREE.Matrix4().makeTranslation(-1.5, 1.5, 3.5));
    hairTuft8.updateMatrix();
    hairGeomMerged.merge(hairTuft8.geometry, hairTuft8.matrix);


    var hairTuft9 = hairTuft2.clone();
    hairTuft9.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI/2));
    hairTuft9.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/7));
    hairTuft9.applyMatrix( new THREE.Matrix4().makeTranslation(3.5, 5.5, -5));
    hairTuft9.updateMatrix();
    hairGeomMerged.merge(hairTuft9.geometry, hairTuft9.matrix);

    var hairTuft10 = hairTuft9.clone();
    hairTuft10.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/4));
    hairTuft10.applyMatrix( new THREE.Matrix4().makeTranslation(-.5, -1, -6));
    hairTuft10.updateMatrix();
    hairGeomMerged.merge(hairTuft10.geometry, hairTuft10.matrix);


    var hairMerged = new THREE.Mesh(hairGeomMerged, auburnMat);
    hairMerged.castShadow = true;
    hairMerged.receiveShadow = true;

  this.hair.add(hairMerged);

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

//Features - Nose and Ears
////////////////////////////////////

  var earGeom = new THREE.BoxBufferGeometry(1.5,3,1.5);
  var earRight = new THREE.Mesh(earGeom, skin2Mat);
  earRight.position.set(-8.5,1,0);
  earRight.castShadow = true;
  earRight.receiveShadow = false;

  var earLeft = new THREE.Mesh(earGeom, skin2Mat);
  earLeft.position.set(8.5,1,0);
  earLeft.castShadow = true;
  earLeft.receiveShadow = false;

  var noseGeom = new THREE.CylinderGeometry( 1,2, 4, 4 );
  var nose = new THREE.Mesh(noseGeom, skin2Mat);
  nose.scale.set(.75, 1, 1.3);
  nose.position.set(0,1,8);
  nose.castShadow = true;
  nose.receiveShadow = false;


  this.head.add(earRight, earLeft, nose);
}

var Torso = function() {

  //TORSO - CHEST
  ////////////////////////////////////
  
  this.mesh = new THREE.Group();

  var textShirt = new THREE.TextureLoader(loaderManager).load( "images/fabric.png" );
  textShirt.wrapS = THREE.RepeatWrapping;
  textShirt.wrapT = THREE.RepeatWrapping;
  textShirt.repeat.set( 7, 7 );

  var shirtMat = new THREE.MeshLambertMaterial( {
    map: textShirt
  });

  var chestGeom = new THREE.BoxGeometry(14, 21, 10, 1, 2, 1);
    chestGeom.vertices[0].x+=2;
    chestGeom.vertices[0].z+=2;
    chestGeom.vertices[1].x+=1;
    chestGeom.vertices[1].z-=1;
    chestGeom.vertices[2].x+=1;
    chestGeom.vertices[3].x+=1;

    chestGeom.vertices[6].x-=1;
    chestGeom.vertices[6].z-=1;
    chestGeom.vertices[7].x-=2;
    chestGeom.vertices[7].z+=2;
    chestGeom.vertices[8].x-=1;
    chestGeom.vertices[9].x-=1;

  this.chest = new THREE.Mesh(chestGeom, shirtMat);
  this.chest.position.set(0,0.5,-1);
  this.chest.castShadow = true;
  // this.chest.receiveShadow = true;


  //BUTTONS
  ////////////////////////////////////
  var buttonGeomMerged = new THREE.Geometry();

  var buttonGeom = new THREE.CylinderGeometry(.75, .75, .75, 6 );
  buttonGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/2));
  var button1 = new THREE.Mesh(buttonGeom, blackMat);
  button1.applyMatrix( new THREE.Matrix4().makeTranslation(0, 2, 5.25));
  button1.updateMatrix();
  buttonGeomMerged.merge(button1.geometry, button1.matrix);

  var button2 = new THREE.Mesh(buttonGeom, blackMat);

  button2.applyMatrix( new THREE.Matrix4().makeTranslation(0, -1.5, 5));
  button2.updateMatrix();
  buttonGeomMerged.merge(button2.geometry, button2.matrix);

  var button3 = new THREE.Mesh(buttonGeom, blackMat);
  button3.applyMatrix( new THREE.Matrix4().makeTranslation(0, -5, 5));
  button3.updateMatrix();
  buttonGeomMerged.merge(button3.geometry, button3.matrix);

  var button4 = new THREE.Mesh(buttonGeom, blackMat);
  button4.applyMatrix( new THREE.Matrix4().makeTranslation(0, -8.5, 5));
  button4.updateMatrix();
  buttonGeomMerged.merge(button4.geometry, button4.matrix);

  var buttonsMerged = new THREE.Mesh(buttonGeomMerged, blackMat);
  buttonsMerged.castShadow = true;
  buttonsMerged.receiveShadow = true;

  this.chest.add(buttonsMerged);
  this.mesh.add(this.chest);

  //NECK
  ////////////////////////////////////
  
  var neckGeom = new THREE.BoxGeometry(8, 8, 8);
  var neck = new THREE.Mesh(neckGeom, skinMat);
  neck.position.set(0, 12, -2);
  this.mesh.add(neck);


  //RIGHT ARM
  ////////////////////
  this.armRightGroup = new THREE.Group();  
  var armRightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(-7,-12,-3),
    new THREE.Vector3(-5,-24,0),
    ]);
  var armRightGeom = new THREE.TubeGeometry(armRightCurve, 2, 2.75, 6, false);

  var armRight = new THREE.Mesh(armRightGeom, shirtMat);
  //armRight.position.set(-7,9,-1);
  armRight.castShadow = true;
  armRight.receiveShadow = false;  
  this.armRightGroup.add(armRight);
  this.armRightGroup.applyMatrix( new THREE.Matrix4().makeTranslation(0, -9, 0));
  this.armRightGroup.position.set(-7,9,-1);

  //RIGHT HAND
  ////////////////////
  var handGeom = new THREE.BoxGeometry(6, 6, 4.85);
  var handRight = new THREE.Mesh(handGeom, skinMat);
  handRight.position.set(-5,-26,0);
  this.armRightGroup.add(handRight);  
  this.mesh.add(this.armRightGroup);


  //Left ARM
  ////////////////////  
  this.armLeftGroup = new THREE.Group();  
  var armLeftCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(7,-12,-3),
    new THREE.Vector3(5,-24,0),
    ]);
  var armLeftGeom = new THREE.TubeGeometry(armLeftCurve, 2, 2.75, 6, false);

  var armLeft = new THREE.Mesh(armLeftGeom, shirtMat);
  armLeft.castShadow = true;
  armLeft.receiveShadow = false;  
  this.armLeftGroup.add(armLeft);
  this.armLeftGroup.applyMatrix( new THREE.Matrix4().makeTranslation(0, -9, 0));
  this.armLeftGroup.position.set(7,9,-1);

  //LEFT HAND
  ////////////////////
  var handLeft = new THREE.Mesh(handGeom, skinMat);
  handLeft.position.set(5,-26,0);
  this.armLeftGroup.add(handLeft);

  this.mesh.add(this.armLeftGroup);
}


var Legs = function() {

  //LEGS - WAIST
  ////////////////////////////////////
  
  this.mesh = new THREE.Group();

  var waistGeom = new THREE.BoxGeometry(14, 5, 10);
  var waist = new THREE.Mesh(waistGeom, beigeMat);
  waist.position.set(0, 0, 0);

  var beltGeom = new THREE.BoxGeometry(15, 2, 11);
  var belt = new THREE.Mesh(beltGeom, brownMat);
  belt.position.set(0, 2.5, 0);

  var buckleGeom = new THREE.BoxGeometry(2.5, 2.5, 1);
  var buckle = new THREE.Mesh(buckleGeom, blackMat);
  buckle.position.set(0, 2.5, 5.5);

  this.mesh.add(waist, belt, buckle);


}




var head, torso, legs;

function createHead() {
  head = new Head();
  scene.add(head.mesh);
}

function createTorso() {
  torso = new Torso();
  scene.add(torso.mesh);
}

function createLegs() {
  legs = new Legs();
  scene.add(legs.mesh);
}

function createCharacter() {
  createHead();
  head.mesh.position.y+=23;
  createTorso();
  createLegs();
  legs.mesh.position.set(0,-13,-1);
}



//HEAD ANIMATION
////////////////////

Head.prototype.Nod = function(){

  this.head.rotation.z = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ;
  this.head.rotation.x = Math.sin(Date.now() * 0.01) * Math.PI * 0.01 ;
  this.head.rotation.y = Math.sin(Date.now() * 0.005) * Math.PI * 0.01 ; 

  //this.mesh.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1 ; 
}

Head.prototype.eyeMove = function(){

  function blinkLoop(){
    var isBlinking = false;

    if ((!isBlinking) && (Math.random()>.99)) {
      isBlinking = true;
      blink();
    }  
    function blink() {
      head.eyes.scale.y = 1;
      TweenMax.to(head.eyes.scale, .07, {
          y: 0, yoyo: true, repeat: 1, onComplete: function() {
             isBlinking = false;
          }
      });
    }
  }

  blinkLoop();

  var distance = 1;
  this.eyeBlueRight.position.x = Math.sin(Date.now() * 0.005)* -distance ;
  this.eyeBlueLeft.position.x = Math.sin(Date.now() * 0.005) * distance ;
  this.eyeBlueRight.position.y = Math.cos(Date.now() * 0.005)* -distance ;
  this.eyeBlueLeft.position.y = Math.cos(Date.now() * 0.005) * distance ;

  this.eyeBrowRight.position.y = Math.cos(Date.now() * 0.005) * -distance ;
  this.eyeBrowLeft.position.y = Math.cos(Date.now() * 0.005) * distance ;
}

Head.prototype.moustacheMove = function(){

  var distance =.5;
  //this.moustache.position.y = Math.cos(Date.now() * 0.01) * distance ;
  this.moustache.rotation.z = Math.sin(Date.now() * 0.005) * Math.PI * 0.05 ;
}

//ARM ANIMATION
////////////////////

Torso.prototype.wave = function(){

  this.armRightGroup.rotation.x = Math.sin(Date.now() * 0.01) * Math.PI * 0.1 ;

  this.armLeftGroup.rotation.x = -Math.sin(Date.now() * 0.01) * Math.PI * 0.1 ;

}



function loop(){
  head.Nod();
  head.eyeMove();
  head.moustacheMove();

  torso.wave();

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
  createCharacter();
  loop();
}
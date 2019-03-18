import * as THREE from "three";
import { TweenLite } from "gsap";
import { BloomEffect, EffectComposer, ShaderPass, EffectPass, RenderPass } from "postprocessing";
// import BadTVShade
import ImaginationScene from "./ImaginationScene.js";

export default class SceneManager {
  constructor(canvas) {
    let container = document.getElementById("threejs-container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    this.width = canvas.width;
    this.height = canvas.height;
    this.size = {
      width: this.width,
      height: this.height
    };

    this.clock = new THREE.Clock();
    this.clock.start();

    //Setup Scene, Lights, Camera and Renderer
    this.scene = new THREE.Scene();
    this.registerTVShader();
    this.lights = this.buildLights(this.scene);
    this.camera = this.buildCamera(this.width, this.height);
    this.renderer = this.buildRender(this.width, this.height);
    // this.composer = new EffectComposer(this.renderer)

    // this.badTVPass = new ShaderPass( this.BadTVShader );
    // this.composer.addPass(new RenderPass(this.scene, this.camera));
    // this.composer.addPass(this.badTVPass);

    this.initScenes();
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );

var sphere = new THREE.Mesh( geometry, material );
sphere.position.set(0,0,0)
this.scene.add( sphere );
  }

  initScenes() {
    this.imaginationScene = new ImaginationScene(this.scene);
    this.imaginationScene.init();
  }

  news() {
    this.imaginationScene.news();
  }

  registerTVShader() {
    this.BadTVShader = {
      uniforms: {
        "tDiffuse": 	{ type: "t", value: null },
        "time": 		{ type: "f", value: 0.0 },
        "distortion":   { type: "f", value: 3.0 },
        "distortion2":  { type: "f", value: 5.0 },
        "speed":     	{ type: "f", value: 0.2 },
        "rollSpeed":    { type: "f", value: 0.1 },
      },
    
      vertexShader: [
        "varying vec2 vUv;",
        "void main() {",
        "vUv = uv;",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    
      ].join("\n"),
    
      fragmentShader: [
    
        "uniform sampler2D tDiffuse;",
        "uniform float time;",
        "uniform float distortion;",
        "uniform float distortion2;",
        "uniform float speed;",
        "uniform float rollSpeed;",
        "varying vec2 vUv;",
        
        // Start Ashima 2D Simplex Noise
    
        "vec3 mod289(vec3 x) {",
        "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
        "}",
    
        "vec2 mod289(vec2 x) {",
        "  return x - floor(x * (1.0 / 289.0)) * 289.0;",
        "}",
    
        "vec3 permute(vec3 x) {",
        "  return mod289(((x*34.0)+1.0)*x);",
        "}",
    
        "float snoise(vec2 v)",
        "  {",
        "  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0",
        "                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)",
        "                     -0.577350269189626,  // -1.0 + 2.0 * C.x",
        "                      0.024390243902439); // 1.0 / 41.0",
        "  vec2 i  = floor(v + dot(v, C.yy) );",
        "  vec2 x0 = v -   i + dot(i, C.xx);",
    
        "  vec2 i1;",
        "  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
        "  vec4 x12 = x0.xyxy + C.xxzz;",
        " x12.xy -= i1;",
    
        "  i = mod289(i); // Avoid truncation effects in permutation",
        "  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
        "		+ i.x + vec3(0.0, i1.x, 1.0 ));",
    
        "  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);",
        "  m = m*m ;",
        "  m = m*m ;",
    
        "  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
        "  vec3 h = abs(x) - 0.5;",
        "  vec3 ox = floor(x + 0.5);",
        "  vec3 a0 = x - ox;",
    
        "  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",
    
        "  vec3 g;",
        "  g.x  = a0.x  * x0.x  + h.x  * x0.y;",
        "  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
        "  return 130.0 * dot(m, g);",
        "}",
    
        // End Ashima 2D Simplex Noise
    
        "void main() {",
    
          "vec2 p = vUv;",
          "float ty = time*speed;",
          "float yt = p.y - ty;",
          //smooth distortion
          "float offset = snoise(vec2(yt*3.0,0.0))*0.2;",
          // boost distortion
          "offset = offset*distortion * offset*distortion * offset;",
          //add fine grain distortion
          "offset += snoise(vec2(yt*50.0,0.0))*distortion2*0.001;",
          //combine distortion on X with roll on Y
          "gl_FragColor = texture2D(tDiffuse,  vec2(fract(p.x + offset),fract(p.y-time*rollSpeed) ));",
    
        "}"
    
      ].join("\n")
    
    };
  }

  buildLights(scene) {
    var light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 150);
    light.position.set(20, 10, 10);
    // scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 150);
    light.position.set(-20, 10, 10);
    // scene.add(light);
  }

  buildCamera(width, height) {
    var aspectRatio = width / height;
    var fieldOfView = 30;
    var nearPlane = 1;
    var farPlane = 10000;
    var camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.set(0, 0, 100);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }

  buildRender(width, height) {
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  update() {
    const delta = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
    // this.composer.render(delta);

    this.time += 1;
    this.imaginationScene.update(delta);
  }
}

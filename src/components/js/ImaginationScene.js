import * as THREE from "three";
// import GLTFLoader from "three-gltf-loader";
import {TweenLite } from 'gsap'

export default function ImaginationScene(scene) {
  this.sceneGroup = new THREE.Group();
  scene.add(this.sceneGroup);
  this.material = null;
  // this.loader = new GLTFLoader();
  this.weight = 10.0

  // scene.background
  this.init = () => {
    this.load();
    this.start = Date.now();
  };

  this.load = () => {
    // instantiate a loader
    var panoTexture = new THREE.TextureLoader().load("static/pano.jpg");

    var uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["lights"],
      {
        diffuse: { type: "c", value: new THREE.Color(0xffffff) },
        tShine: { type: "t", value: panoTexture },
        time: { type: "f", value: 0 },
        weight: { type: "f", value: 0 }
      }
    ]);

    this.material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById("vertexShader").textContent,
      fragmentShader: document.getElementById("fragmentShader").textContent,
      lights: true
    });
    console.log(this.material);
    let mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(20, 5),
      this.material
    );
    console.log(mesh);
    mesh.scale.setScalar(0.7);
    mesh.position.set(0, 0, 0);
    this.sceneGroup.add(mesh);
  };

  this.update = delta => {
    this.sceneGroup.rotation.y += 0.005;
    if (this.material) {
      this.material.uniforms["time"].value += delta
      this.material.uniforms["weight"].value =
        this.weight * (0.5 + 0.5 * Math.sin(0.00025 * (Date.now() - this.start)));
    }
  };

  this.news = () => {
      TweenLite.to(this.material.uniforms["time"],1.0, {
        value: 0.1,
      })
      TweenLite.to(this,1.0, {
        weight: 20.0,
        onComplete: ()=>{
          TweenLite.to(this,1.0, {
            weight: 10.0,
          })
        }
      })
  }
}

import * as THREE from "three";
import Site from "../Site.js";
import effect2VertexShader from "../Shaders/CarEffect2/vertex.glsl";
import effect2FragmentShader from "../Shaders/CarEffect2/fragment.glsl";
import Time from "../Utils/Time.js";

export default class CarEffect2 {
  constructor(model, direcion) {
    this.site = new Site();
    this.timeLocal = new Time();

    this.scene = this.site.scene;
    this.resources = this.site.resources;

    // Resource
    this.resource = model;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDirection: { value: direcion },
      },
      vertexShader: effect2VertexShader,
      fragmentShader: effect2FragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.children[0].material = this.material;
    this.model.children[0].layers.set(0);
    this.scene.add(this.model);
  }

  update() {
    this.model.children[0].material.uniforms.uTime.value =
      this.timeLocal.elapsedTime;

    this.model.quaternion.copy(
      this.site.physicsWorld.physicCar.carBody.quaternion
    );

    this.model.position.set(
      this.site.physicsWorld.physicCar.carBody.position.x,
      this.site.physicsWorld.physicCar.carBody.position.y,
      this.site.physicsWorld.physicCar.carBody.position.z
    );
  }
}

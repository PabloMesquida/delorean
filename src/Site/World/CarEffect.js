import * as THREE from "three";
import Site from "../Site.js";
import effectVertexShader from "../Shaders/CarEffect/vertex.glsl";
import effectFragmentShader from "../Shaders/CarEffect/fragment.glsl";
import Time from "../Utils/Time.js";

export default class CarEffect {
  constructor() {
    this.site = new Site();
    this.time = new Time();
    this.scene = this.site.scene;
    this.resources = this.site.resources;

    // Resource
    this.resource = this.resources.items.carEffect;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.children[0].layers.set(0);

    this.model.children[0].material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: effectVertexShader,
      fragmentShader: effectFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    this.scene.add(this.model);
  }

  update() {
    if (this.model) {
      this.model.children[0].material.uniforms.uTime.value =
        this.time.elapsedTime;

      this.model.quaternion.copy(
        this.site.physicsWorld.physicCar.carBody.quaternion
      );

      this.model.position.set(
        this.site.physicsWorld.physicCar.carBody.position.x - 1.09,
        this.site.physicsWorld.physicCar.carBody.position.y,
        this.site.physicsWorld.physicCar.carBody.position.z
      );
    }
  }
}

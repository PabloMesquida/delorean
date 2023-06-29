import * as THREE from "three";
import Site from "./Site.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.site = new Site();
    this.sizes = this.site.sizes;
    this.scene = this.site.scene;
    this.canvas = this.site.canvas;
    this.time = this.site.time;

    this.angle = 0;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.set(-5.5, 7, 5.5);
    this.instance.layers.enable(1);
    this.scene.add(this.instance);

    this.helper = new THREE.CameraHelper(this.instance);
    //  this.scene.add(this.helper);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}

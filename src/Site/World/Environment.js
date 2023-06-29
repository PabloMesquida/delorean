import * as THREE from "three";
import Site from "../Site";

export default class Environment {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;
    this.resources = this.site.resources;

    //this.setSunLight();
    //this.setAmbientLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.camera.near = 1;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.camera.left = -4;
    this.sunLight.shadow.camera.top = 4;
    this.sunLight.shadow.camera.right = 4;
    this.sunLight.shadow.camera.bottom = -4;
    this.sunLight.position.set(5, 5, 5);
    this.sunLight.shadow.bias = 0.001;
    this.sunLight.shadow.normalBias = 0.02;
    this.scene.add(this.sunLight);
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
  }
}

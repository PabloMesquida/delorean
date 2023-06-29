import * as THREE from "three";
import Site from "../Site.js";

export default class Floor_circle {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0x01070c,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}

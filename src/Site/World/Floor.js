import * as THREE from "three";
import Site from "../Site.js";

export default class Floor {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(700, 50, 70, 5);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: "#0033FF",
      wireframe: true,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.position.x = -305;
    this.scene.add(this.mesh);
  }
}

import * as THREE from "three";
import Site from "../Site.js";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import effect3VertexShader from "../Shaders/CarEffect3/vertex.glsl";
import effect3FragmentShader from "../Shaders/CarEffect3/fragment.glsl";
import Time from "../Utils/Time.js";

export default class CarEffect3_bloom {
  constructor(x, y, z) {
    this.site = new Site();
    this.timeLocal = new Time();

    this.scene = this.site.scene;

    this.eX = x;
    this.eY = y;
    this.eZ = z;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();

    setTimeout(() => {
      this.shaderMaterial.dispose();
      this.geometry.dispose();
      this.scene.remove(this.mesh);
    }, 120);
  }

  setGeometry() {
    this.geometry = new THREE.SphereGeometry(0.2, 4, 4);
    this.tModifier = new TessellateModifier(4, 4);
    this.geometry = this.tModifier.modify(this.geometry);
    this.numFaces = this.geometry.attributes.position.count / 3;
    this.colors = new Float32Array(this.numFaces * 3 * 3);
    this.vel = new Float32Array(this.numFaces * 3 * 3);

    this.color = new THREE.Color();
    this.lightness = 0.5;
    this.saturation = 1.0;

    for (this.f = 0; this.f < this.numFaces; this.f++) {
      this.index = 9 * this.f;

      this.hue = 0.5 + Math.random(0.5);
      this.color.setHSL(this.hue, this.lightness, this.saturation);

      this.dirX = Math.random() * 2 - 1;
      this.dirY = Math.random() * 2 - 1;
      this.dirZ = Math.random() * 2 - 1;

      for (this.i = 0; this.i < 3; this.i++) {
        this.colors[this.index + 3 * this.i] = this.color.r;
        this.colors[this.index + 3 * this.i + 1] = this.color.g;
        this.colors[this.index + 3 * this.i + 2] = this.color.b;

        this.vel[this.index + 3 * this.i] = this.dirX;
        this.vel[this.index + 3 * this.i + 1] = this.dirY;
        this.vel[this.index + 3 * this.i + 2] = this.dirZ;
      }
    }

    this.geometry.setAttribute(
      "customColor",
      new THREE.BufferAttribute(this.colors, 3)
    );

    this.geometry.setAttribute("vel", new THREE.BufferAttribute(this.vel, 3));
  }

  setMaterial() {
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        amplitude: { value: 0 },
      },
      vertexShader: effect3VertexShader,
      fragmentShader: effect3FragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.shaderMaterial);
    this.mesh.layers.set(1);
    this.scene.add(this.mesh);
  }

  update() {
    this.shaderMaterial.uniforms.amplitude.value += 0.08;

    this.mesh.position.set(
      this.site.physicsWorld.physicCar.carBody.position.x + this.eX,
      this.site.physicsWorld.physicCar.carBody.position.y + this.eY,
      this.site.physicsWorld.physicCar.carBody.position.z + this.eY
    );

    this.mesh.quaternion.copy(
      this.site.physicsWorld.physicCar.carBody.quaternion
    );
  }
}

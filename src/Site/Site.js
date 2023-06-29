import * as THREE from "three";
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Debug from "./Utils/Debug.js";
import World from "./World/World.js";
import PhysicsWorld from "./PhysicsWorld/PhysicsWorld.js";
import Resources from "./Utils/Resources.js";

import sources from "./sources.js";

let instance = null;

export default class Site {
  constructor(canvas) {
    if (instance) {
      return instance;
    }

    instance = this;

    // window.site = this;

    this.canvas = canvas;

    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.scene.background = null;
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(sources);
    this.world = new World();
    this.physicsWorld = new PhysicsWorld();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.physicsWorld.update();
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }
}

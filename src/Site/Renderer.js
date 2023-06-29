import * as THREE from "three";
import Site from "./Site.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export default class Renderer {
  constructor() {
    this.site = new Site();
    this.canvas = this.site.canvas;
    this.scene = this.site.scene;
    this.camera = this.site.camera;
    this.sizes = this.site.sizes;

    this.setInstance();

    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, {
      samples: this.instance.getPixelRatio() === 1 ? 2 : 0,
    });

    this.effectComposer = new EffectComposer(this.instance, this.renderTarget);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.effectComposer.setSize(this.sizes.width, this.sizes.height);

    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.effectComposer.addPass(this.renderPass);

    this.unrealBloomPass = new UnrealBloomPass();
    this.unrealBloomPass.enabled = true;
    this.unrealBloomPass.strength = 0;
    this.unrealBloomPass.threshold = 0;
    this.unrealBloomPass.radius = 0;
    this.unrealBloomPass.bloomTintColors = [
      new THREE.Vector3(0.1, 0.1, 0.5),
      new THREE.Vector3(0.1, 0.1, 0.5),
      new THREE.Vector3(0.1, 0.1, 0.5),
      new THREE.Vector3(0.1, 0.1, 0.5),
      new THREE.Vector3(0.1, 0.1, 0.5),
    ];
    this.effectComposer.addPass(this.unrealBloomPass);
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      alpha: true,
    });
    this.instance.autoClear = false;
    this.instance.autoClearStencil = false;

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    // this.instance.setClearColor(0x00ff00, 0.5);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.clear();
    this.camera.instance.layers.set(1);
    this.effectComposer.render();

    this.instance.clearDepth();
    this.camera.instance.layers.set(0);
    this.instance.render(this.scene, this.camera.instance);

    this.instance.clearDepth();
    this.camera.instance.layers.set(2);
    this.instance.render(this.scene, this.camera.instance);
  }
}

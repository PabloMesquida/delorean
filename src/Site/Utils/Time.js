import EventEmitter from "./EventEmitter.js";
import * as THREE from "three";

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.clock = new THREE.Clock(); // Test
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.oldElapsed = 0; // test
    this.delta = 16;
    this.reset = false;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.elapsedTime = this.clock.getElapsedTime(); // test

    this.deltaTime = this.elapsedTime - this.oldElapsed; // test
    this.oldElapsed = this.elapsedTime; // test
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

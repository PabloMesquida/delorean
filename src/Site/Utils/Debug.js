import * as dat from "lil-gui";

export default class Debug {
  constructor() {
    this.active = window.location.hash === "#debug";
    if (this.active) this.iu = new dat.GUI();
  }
}

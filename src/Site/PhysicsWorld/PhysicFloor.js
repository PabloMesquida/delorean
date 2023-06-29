import * as CANNON from "cannon-es";

export default class PhysicFloor {
  constructor() {
    this.setBody();
  }

  setBody() {
    this.groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  }
}

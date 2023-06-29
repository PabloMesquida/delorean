import * as CANNON from "cannon-es";
import Site from "../Site.js";
import PhysicFloor from "./PhysicFloor.js";
import CannonDebugger from "cannon-es-debugger";
import PhysicCar from "./PhysicCar.js";

export default class PhysicsWorld {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;
    this.physicFloor = new PhysicFloor();
    this.physicCar = new PhysicCar();

    this.setPhysicsWorld();

    this.physicsWorld.addBody(this.physicFloor.groundBody);
    this.physicCar.vehicle.addToWorld(this.physicsWorld);

    this.cannonDebugger = new CannonDebugger(this.scene, this.physicsWorld, {
      color: 0xff0000,
    });
  }

  setPhysicsWorld() {
    this.physicsWorld = new CANNON.World();
    this.physicsWorld.gravity.set(0, -10, 0);
  }

  update() {
    this.physicsWorld.step(1 / 60, this.site.time.deltaTime, 3);
    this.physicCar.update();
  }
}

import * as CANNON from "cannon-es";
import Time from "../Utils/Time";

export default class PhysicCar {
  constructor() {
    this.time = new Time();
    this.setBody();
    this.setVehicle();
    this.setWheels();
    this.setUserControl();
    this.update();
  }

  setBody() {
    this.carBody = new CANNON.Body({
      mass: 10,
      position: new CANNON.Vec3(0, 2, 0),
      shape: new CANNON.Box(new CANNON.Vec3(3.7, 0.5, 1.5)),
    });
  }

  setVehicle() {
    this.vehicle = new CANNON.RigidVehicle({
      chassisBody: this.carBody,
    });
  }

  setWheels() {
    this.mass = 2;
    this.axisWidthFront = 3.1;
    this.axisWidthBack = 3.2;

    this.wheelShapeFront = new CANNON.Sphere(0.55);
    this.wheelShapeBack = new CANNON.Sphere(0.6);
    this.wheelMaterial = new CANNON.Material("wheel");
    this.down = new CANNON.Vec3(0, -1, 0);
    this.alturaRuedas = -0.75;
    this.angularDamping = 0.65;

    this.wheelBody1 = new CANNON.Body({
      mass: this.mass,
      material: this.wheelMaterial,
      shape: this.wheelShapeFront,
      angularDamping: this.angularDamping,
    });

    this.vehicle.addWheel({
      body: this.wheelBody1,
      position: new CANNON.Vec3(-2.1, this.alturaRuedas, this.axisWidthFront / 2),
      axis: new CANNON.Vec3(0, 0, 1),
      direction: this.down,
    });

    this.wheelBody2 = new CANNON.Body({
      mass: this.mass,
      material: this.wheelMaterial,
      shape: this.wheelShapeFront,
      angularDamping: this.angularDamping,
    });

    this.vehicle.addWheel({
      body: this.wheelBody2,
      position: new CANNON.Vec3(-2.1, this.alturaRuedas, -this.axisWidthFront / 2),
      axis: new CANNON.Vec3(0, 0, 1),
      direction: this.down,
    });

    this.wheelBody3 = new CANNON.Body({
      mass: this.mass,
      material: this.wheelMaterial,
      shape: this.wheelShapeBack,
      angularDamping: this.angularDamping,
    });

    this.vehicle.addWheel({
      body: this.wheelBody3,
      position: new CANNON.Vec3(2.1, this.alturaRuedas, this.axisWidthBack / 2),
      axis: new CANNON.Vec3(0, 0, 1),
      direction: this.down,
    });

    this.wheelBody4 = new CANNON.Body({
      mass: this.mass,
      material: this.wheelMaterial,
      shape: this.wheelShapeBack,
      angularDamping: this.angularDamping,
    });

    this.vehicle.addWheel({
      body: this.wheelBody4,
      position: new CANNON.Vec3(2.1, this.alturaRuedas, -this.axisWidthBack / 2),
      axis: new CANNON.Vec3(0, 0, 1),
      direction: this.down,
    });
  }

  setUserControl() {
    this.cStop = false;
    this.vehicle.chassisBody.velocidad = 0;
    document.addEventListener("keydown", (event) => {
      this.maxSteerVal = Math.PI / 100; // 8
      this.maxForce = 100;
    });

    // reset car force to zero when key is released
    document.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "w":
        case "ArrowUp":
          //console.log(this.site.physicsWorld.physicCar.velocidad);
          if (this.velocidad < 100) {
            this.vehicle.setWheelForce(0, 0);
            this.vehicle.setWheelForce(0, 1);
          }
          break;

        case "s":
        case "ArrowDown":
          this.vehicle.setWheelForce(0, 0);
          this.vehicle.setWheelForce(0, 1);
          break;

        case "a":
        case "ArrowLeft":
          this.vehicle.setSteeringValue(0, 0);
          this.vehicle.setSteeringValue(0, 1);
          break;

        case "d":
        case "ArrowRight":
          this.vehicle.setSteeringValue(0, 0);
          this.vehicle.setSteeringValue(0, 1);
          break;
      }
    });
  }

  update() {
    //console.log(this.vehicle.wheelBodies[3].position.y);

    this.velocidad =
      (Math.abs(this.vehicle.chassisBody.velocity.x) +
        Math.abs(this.vehicle.chassisBody.velocity.y) +
        Math.abs(this.vehicle.chassisBody.velocity.z)) *
      2;

    if (
      this.vehicle.wheelBodies[0].position.y > 0.7 &&
      this.vehicle.wheelBodies[0].position.y < 1.3
    ) {
      this.vehicle.wheelBodies[0].mass = 14;
    } else if (this.vehicle.wheelBodies[0].position.y > 1.3) {
      this.vehicle.wheelBodies[0].mass = 20;
    } else {
      this.vehicle.wheelBodies[0].mass = 2;
    }

    if (
      this.vehicle.wheelBodies[1].position.y > 0.7 &&
      this.vehicle.wheelBodies[1].position.y < 1.3
    ) {
      this.vehicle.wheelBodies[1].mass = 14;
    } else if (this.vehicle.wheelBodies[1].position.y > 1.3) {
      this.vehicle.wheelBodies[1].mass = 20;
    } else {
      this.vehicle.wheelBodies[1].mass = 2;
    }

    if (
      this.vehicle.wheelBodies[2].position.y > 0.7 &&
      this.vehicle.wheelBodies[2].position.y < 1.3
    ) {
      this.vehicle.wheelBodies[2].mass = 14;
    } else if (this.vehicle.wheelBodies[2].position.y > 1.3) {
      this.vehicle.wheelBodies[2].mass = 20;
    } else {
      this.vehicle.wheelBodies[2].mass = 2;
    }

    if (
      this.vehicle.wheelBodies[3].position.y > 0.7 &&
      this.vehicle.wheelBodies[3].position.y < 1.3
    ) {
      this.vehicle.wheelBodies[3].mass = 14;
    } else if (this.vehicle.wheelBodies[3].position.y > 1.3) {
      this.vehicle.wheelBodies[3].mass = 20;
    } else {
      this.vehicle.wheelBodies[3].mass = 2;
    }
  }
}

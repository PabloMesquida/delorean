import Site from "../Site.js";
import DeLorean from "./DeLorean.js";
import Environment from "./Environment.js";

import Wheels from "./Wheels.js";

export default class World {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;
    this.resources = this.site.resources;
    this.environment = new Environment();
    this.isLoading = true;
    this.resources.on("ready", () => {
      this.deLorean = new DeLorean();
      this.wheels = new Wheels();
      this.isLoading = false;
    });
  }

  update() {
    if (this.isLoading) {
      // Mostrar mensaje de carga mientras isLoading sea true
      const loadingMessage = document.createElement("div");
      loadingMessage.textContent = "Cargando...";
      loadingMessage.style.position = "absolute";
      loadingMessage.style.top = "50%";
      loadingMessage.style.left = "50%";
      loadingMessage.style.transform = "translate(-50%, -50%)";
      loadingMessage.style.fontSize = "24px";
      loadingMessage.style.fontWeight = "bold";
      loadingMessage.style.color = "#ffffff";
      loadingMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";
      document.body.appendChild(loadingMessage);

      return;
    }

    if (this.effect_bloom) this.effect_bloom.update();
    if (this.deLorean) {
      this.deLorean.update();

      this.deLorean.chasis.quaternion.set(
        this.site.physicsWorld.physicCar.carBody.quaternion.z,
        this.site.physicsWorld.physicCar.carBody.quaternion.y,
        -this.site.physicsWorld.physicCar.carBody.quaternion.x,
        this.site.physicsWorld.physicCar.carBody.quaternion.w
      );

      this.deLorean.chasis.position.set(
        this.site.physicsWorld.physicCar.carBody.position.z,
        this.site.physicsWorld.physicCar.carBody.position.y,
        -this.site.physicsWorld.physicCar.carBody.position.x
      );

      this.deLorean.acc01.position.set(
        this.site.physicsWorld.physicCar.carBody.position.z,
        this.site.physicsWorld.physicCar.carBody.position.y,
        -this.site.physicsWorld.physicCar.carBody.position.x
      );

      this.deLorean.acc01.quaternion.set(
        this.site.physicsWorld.physicCar.carBody.quaternion.z,
        this.site.physicsWorld.physicCar.carBody.quaternion.y,
        -this.site.physicsWorld.physicCar.carBody.quaternion.x,
        this.site.physicsWorld.physicCar.carBody.quaternion.w
      );

      this.deLorean.acc02.position.set(
        this.site.physicsWorld.physicCar.carBody.position.z,
        this.site.physicsWorld.physicCar.carBody.position.y,
        -this.site.physicsWorld.physicCar.carBody.position.x
      );

      this.deLorean.acc02.quaternion.set(
        this.site.physicsWorld.physicCar.carBody.quaternion.z,
        this.site.physicsWorld.physicCar.carBody.quaternion.y,
        -this.site.physicsWorld.physicCar.carBody.quaternion.x,
        this.site.physicsWorld.physicCar.carBody.quaternion.w
      );

      this.deLorean.acc01b.position.set(
        this.site.physicsWorld.physicCar.carBody.position.z,
        this.site.physicsWorld.physicCar.carBody.position.y,
        -this.site.physicsWorld.physicCar.carBody.position.x
      );

      this.deLorean.acc01b.quaternion.set(
        this.site.physicsWorld.physicCar.carBody.quaternion.z,
        this.site.physicsWorld.physicCar.carBody.quaternion.y,
        -this.site.physicsWorld.physicCar.carBody.quaternion.x,
        this.site.physicsWorld.physicCar.carBody.quaternion.w
      );

      this.deLorean.acc02b.position.set(
        this.site.physicsWorld.physicCar.carBody.position.z,
        this.site.physicsWorld.physicCar.carBody.position.y,
        -this.site.physicsWorld.physicCar.carBody.position.x
      );

      this.deLorean.acc02b.quaternion.set(
        this.site.physicsWorld.physicCar.carBody.quaternion.z,
        this.site.physicsWorld.physicCar.carBody.quaternion.y,
        -this.site.physicsWorld.physicCar.carBody.quaternion.x,
        this.site.physicsWorld.physicCar.carBody.quaternion.w
      );

      this.wheels.model1.position.copy(this.site.physicsWorld.physicCar.wheelBody1.position);
      this.wheels.model1.quaternion.copy(this.site.physicsWorld.physicCar.wheelBody1.quaternion);

      this.wheels.model2.position.copy(this.site.physicsWorld.physicCar.wheelBody2.position);
      this.wheels.model2.quaternion.copy(this.site.physicsWorld.physicCar.wheelBody2.quaternion);

      this.wheels.model3.position.copy(this.site.physicsWorld.physicCar.wheelBody3.position);
      this.wheels.model3.quaternion.copy(this.site.physicsWorld.physicCar.wheelBody3.quaternion);

      this.wheels.model4.position.copy(this.site.physicsWorld.physicCar.wheelBody4.position);
      this.wheels.model4.quaternion.copy(this.site.physicsWorld.physicCar.wheelBody4.quaternion);
    }

    const loadingMessage = document.querySelector(".loading-message");
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }
}

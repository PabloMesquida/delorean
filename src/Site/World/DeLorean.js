import * as THREE from "three";
import Site from "../Site.js";
import CarEffect from "./CarEffect.js";
import CarEffect2 from "./CarEffect2.js";
import CarEffect2_bloom from "./CarEffect2_bloom.js";
import CarEffect_bloom from "./CarEffect_bloom.js";
import CarEffect3 from "./CarEffect3.js";
import CarEffect3_bloom from "./CarEffect3_bloom.js";
import Time from "../Utils/Time.js";
import Fire from "./Fire.js";
import Fire_bloom from "./Fire_bloom.js";
import FireExp from "./FireExp.js";
import ExpEffect from "./ExpEffect.js";

export default class DeLorean {
  constructor() {
    this.site = new Site();
    this.timeLocal = new Time();
    this.scene = this.site.scene;
    this.resources = this.site.resources;
    this.control = true;
    this.controlE = true;
    this.fin = 0;
    this.cameraControl = 0;
    this.controlVelo = true;

    // Resource
    this.resource = this.resources.items.carModel;
    this.resource2 = this.resources.items.carModel2;

    this.passMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.setModel();

    this.chasis = this.model.children.find((child) => child.name === "Chasis");

    this.acc01 = this.model.children.find((child) => child.name === "Acc01");
    this.acc02 = this.model.children.find((child) => child.name === "Acc02");
    7;

    this.chasis2 = this.model2.children.find(
      (child) => child.name === "Chasis"
    );

    this.chasis2.position.y = 1000;
    this.chasis2.visible = false;

    this.acc01b = this.model2.children.find((child) => child.name === "Acc01");
    this.acc02b = this.model2.children.find((child) => child.name === "Acc02");

    this.chasis.layers.set(0);
    this.acc01b.layers.set(0);
    this.acc02b.layers.set(0);

    this.acc01.layers.set(1);
    this.acc02.layers.set(1);
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.rotation.y = -Math.PI * 0.5;

    this.model2 = this.resource2.scene;
    this.model2.rotation.y = -Math.PI * 0.5;

    this.scene.add(this.model, this.model2);
  }

  setMaterial() {
    if (this.control) {
      this.acc01.material = this.passMaterial;
      this.acc02.material = this.passMaterial;
      this.acc01b.material = this.passMaterial;
      this.acc02b.material = this.passMaterial;
      this.control = false;
    }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  setEffect() {
    if (this.controlE) {
      this.pressW = document.querySelector(".texto");
      this.pressW.classList.add("noVisible");
      setTimeout(() => {
        this.effect = new CarEffect();
        this.effect_bloom = new CarEffect_bloom();

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_01, 1);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_01_bloom,
          1
        );
      }, 200);

      setTimeout(() => {
        this.effect2.model.visible = false;
        this.effect2_bloom.model.visible = false;

        this.effect2 = null;
        this.effect2_bloom = null;

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_02, 2);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_02_bloom,
          2
        );
      }, 400);

      setTimeout(() => {
        this.effect2 = null;
        this.effect2_bloom = null;

        this.effect3 = new CarEffect2(this.resources.items.carEffect2_03, 1);
        this.effect3_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_03_bloom,
          1
        );
      }, 850);

      setTimeout(() => {
        this.effect3.model.visible = false;
        this.effect3_bloom.model.visible = false;

        this.effect3 = null;
        this.effect3_bloom = null;

        this.effect3 = new CarEffect2(this.resources.items.carEffect2_04, 2);
        this.effect3_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_04_bloom,
          2
        );
      }, 1050);

      setTimeout(() => {
        this.effect3.model.visible = false;
        this.effect3_bloom.model.visible = false;

        this.effect3 = null;
        this.effect3_bloom = null;

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_01, 1);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_01_bloom,
          1
        );

        this.effect2.model.visible = true;
        this.effect2_bloom.model.visible = true;
      }, 1400);

      setTimeout(() => {
        this.effect2.model.visible = false;
        this.effect2_bloom.model.visible = false;

        this.effect2 = null;
        this.effect2_bloom = null;

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_05, 2);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_05_bloom,
          2
        );
      }, 1600);

      setTimeout(() => {
        this.effect2.model.visible = false;
        this.effect2_bloom.model.visible = false;

        this.effect2 = null;
        this.effect2_bloom = null;

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_06, 2);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_06_bloom,
          2
        );
      }, 1850);

      setTimeout(() => {
        this.fire = new Fire(2, -0.8, -1.4);
        this.fire2 = new Fire(2, -0.8, 1.4);
        this.fire3 = new Fire(-2.5, -0.8, -1.4);
        this.fire4 = new Fire(-2.5, -0.8, 1.4);

        this.fire_bloom = new Fire_bloom(2, -0.8, -1.4);
        this.fire2_bloom = new Fire_bloom(2, -0.8, 1.4);
        this.fire3_bloom = new Fire_bloom(-2.5, -0.8, -1.4);
        this.fire4_bloom = new Fire_bloom(-2.5, -0.8, 1.4);

        this.effect2.model.visible = false;
        this.effect2_bloom.model.visible = false;

        this.effect2 = null;
        this.effect2_bloom = null;

        this.effect2 = new CarEffect2(this.resources.items.carEffect2_07, 2);
        this.effect2_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_07_bloom,
          2
        );
      }, 2050);

      setTimeout(() => {
        this.effect2.model.visible = false;
        this.effect2_bloom.model.visible = false;

        this.effect2 = null;
        this.effect2_bloom = null;
      }, 2200);

      setTimeout(() => {
        this.effect4 = new CarEffect2(this.resources.items.carEffect2_06, 2);
        this.effect4_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_06_bloom,
          2
        );

        this.effect4.model.visible = true;
        this.effect4_bloom.model.visible = true;
      }, 2700);

      setTimeout(() => {
        this.effect3 = new CarEffect2(this.resources.items.carEffect2_03, 1);
        this.effect3_bloom = new CarEffect2_bloom(
          this.resources.items.carEffect2_03_bloom,
          1
        );

        this.effect3.model.visible = true;
        this.effect3_bloom.model.visible = true;

        this.effect4.model.visible = false;
        this.effect4_bloom.model.visible = false;

        this.effect4 = null;
        this.effect4_bloom = null;
      }, 2900);

      setTimeout(() => {
        this.effect3.model.visible = false;
        this.effect3_bloom.model.visible = false;

        this.effect3 = null;
        this.effect3_bloom = null;
      }, 3100);

      for (this.i = 0; this.i < 30; this.i++) {
        setTimeout(() => {
          (this.uno = this.getRandomIntInclusive(-5, 2)),
            (this.dos = this.getRandomIntInclusive(-3, 3)),
            (this.tres = this.getRandomIntInclusive(0, 2));
          this.effecSparks = new CarEffect3(this.uno, this.dos, this.tres);

          this.effecSparks_bloom = new CarEffect3_bloom(
            this.uno,
            this.dos,
            this.tres
          );
        }, this.getRandomIntInclusive(2000, 4800));
      }
      setTimeout(() => {
        this.fireExp = new FireExp(0, 0, 0);
        this.expEffect = new ExpEffect(0, 0, 0);

        console.log("PUM");
      }, 4700);

      setTimeout(() => {
        this.fin = 1;

        this.effect.model.visible = false;
        this.effect_bloom.model.visible = false;

        this.chasis.visible = false;
        this.acc01.visible = false;
        this.acc02.visible = false;
        this.acc01b.visible = false;
        this.acc02b.visible = false;

        this.site.world.wheels.model1.visible = false;
        this.site.world.wheels.model2.visible = false;
        this.site.world.wheels.model3.visible = false;
        this.site.world.wheels.model4.visible = false;

        this.fire.visible = false;
        this.fire2.visible = false;
        this.fire3.visible = false;
        this.fire4.visible = false;

        this.fire_bloom.visible = false;
        this.fire2_bloom.visible = false;
        this.fire3_bloom.visible = false;
        this.fire4_bloom.visible = false;

        this.fire = null;
        this.fire2 = null;
        this.fire3 = null;
        this.fire4 = null;

        this.fire_bloom = null;
        this.fire2_bloom = null;
        this.fire3_bloom = null;
        this.fire4_bloom = null;
      }, 4800);

      setTimeout(() => {
        this.fireExp.fin();
        //     this.fireExp.visible = false;
        //     this.expEffect.visible = false;
        this.fireExp = null;
        this.expEffect = null;
        this.bye = document.querySelector(".textoB");
        console.log(this.bye);
        this.bye.classList.remove("noVisible");
      }, 5500);

      setTimeout(() => {
        this.scene.clear();
        window.location.reload();
      }, 8000);

      this.controlE = false;
    }
  }

  update() {
    // console.log(this.site.physicsWorld.physicCar.velocidad);
    if (this.site.physicsWorld.physicCar.velocidad > 100) {
      this.setMaterial();
      this.setEffect();

      if (this.site.physicsWorld.physicCar.velocidad > 117) {
        this.cameraControl = 1;
        const pos = new THREE.Vector3(
          this.site.physicsWorld.physicCar.carBody.position.x,
          this.site.physicsWorld.physicCar.carBody.position.y + 5,
          this.site.physicsWorld.physicCar.carBody.position.z + 20
        );
        //this.site.camera.instance.position.lerp(pos, 1.0);

        if (this.site.physicsWorld.physicCar.velocidad > 118) {
          this.cameraControl = 1;
          const pos = new THREE.Vector3(
            this.site.physicsWorld.physicCar.carBody.position.x + 20,
            10,
            this.site.physicsWorld.physicCar.carBody.position.z + 20
          );
        }
      }

      if (this.effect) this.effect.update();

      if (this.effect_bloom) this.effect_bloom.update();

      if (this.effect2) this.effect2.update();

      if (this.effect2_bloom) this.effect2_bloom.update();

      if (this.effect3) this.effect3.update();

      if (this.effect3_bloom) this.effect3_bloom.update();

      if (this.effect4) this.effect4.update();

      if (this.effect4_bloom) this.effect4_bloom.update();

      if (this.effecSparks) this.effecSparks.update();

      if (this.effecSparks_bloom) this.effecSparks_bloom.update();

      if (this.expEffect) this.expEffect.update();

      if (this.fire) {
        this.fire._AddParticles(1);
        this.fire._UpdateParticles(1);
        this.fire._UpdateGeometry();
      }

      if (this.fire2) {
        this.fire2._AddParticles(1);
        this.fire2._UpdateParticles(1);
        this.fire2._UpdateGeometry();
      }

      if (this.fire3) {
        this.fire3._AddParticles(1);
        this.fire3._UpdateParticles(1);
        this.fire3._UpdateGeometry();
      }

      if (this.fire4) {
        this.fire4._AddParticles(1);
        this.fire4._UpdateParticles(1);
        this.fire4._UpdateGeometry();
      }

      if (this.fire_bloom) {
        this.fire_bloom._AddParticles(1);
        this.fire_bloom._UpdateParticles(1);
        this.fire_bloom._UpdateGeometry();
      }

      if (this.fire2_bloom) {
        this.fire2_bloom._AddParticles(1);
        this.fire2_bloom._UpdateParticles(1);
        this.fire2_bloom._UpdateGeometry();
      }

      if (this.fire3_bloom) {
        this.fire3_bloom._AddParticles(1);
        this.fire3_bloom._UpdateParticles(1);
        this.fire3_bloom._UpdateGeometry();
      }

      if (this.fire4_bloom) {
        this.fire4_bloom._AddParticles(1);
        this.fire4_bloom._UpdateParticles(1);
        this.fire4_bloom._UpdateGeometry();
      }

      if (this.fireExp) {
        this.fire_huella = new Fire(2, -0.8, -1.4);
        this.fire_huella2 = new Fire(2, -0.8, 1.4);
        this.fire_huella3 = new Fire(1.95, -0.8, -1.4);
        this.fire_huella4 = new Fire(1.95, -0.8, 1.4);

        this.fire_huella._AddParticles(1);
        this.fire_huella._UpdateParticles(1);
        this.fire_huella._UpdateGeometry();

        this.fire_huella2._AddParticles(1);
        this.fire_huella2._UpdateParticles(1);
        this.fire_huella2._UpdateGeometry();

        this.fire_huella3._AddParticles(1);
        this.fire_huella3._UpdateParticles(1);
        this.fire_huella3._UpdateGeometry();

        this.fire_huella4._AddParticles(1);
        this.fire_huella4._UpdateParticles(1);
        this.fire_huella4._UpdateGeometry();

        if (this.fin === 1) {
          // this.fireExp.fin();
          this.fin = 2;
        } else if (this.fin === 0) {
          this.fireExp._AddParticles(1);
          this.fireExp._UpdateParticles(1);
          this.fireExp._UpdateGeometry();
        }
      }
      // console.log(this.fin);

      this.site.renderer.unrealBloomPass.strength += 0.05 * 0.4;
      this.site.renderer.unrealBloomPass.radius += 0.05 * 0.001;
    }
  }
}

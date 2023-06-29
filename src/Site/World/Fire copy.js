import * as THREE from "three";
import Site from "../Site.js";
import fireVertexShader from "../Shaders/Fire/vertex.glsl";
import fireFragmentShader from "../Shaders/Fire/fragment.glsl";
import Time from "../Utils/Time.js";

export default class Fire {
  constructor() {
    this.site = new Site();
    this.localTime = new Time();
    this.scene = this.site.scene;
    this.resources = this.site.resources;
    this.sizes = this.site.sizes;

    this.particles = [];

    this.setMaterial();
    this.setGeometry();
    this.setPoints();
    this.setAlphaSpline();
    this.setSizeSpline();
    this.addParticles();
    //this.updateGeometry();
    //this.updateParticles(this.site.time.elapsedTime);
    //console.log(this.site.time.elapsedTime);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        diffuseTexture: { value: this.resources.items.fireTexture },
        pointMultiplier: {
          value:
            (this.sizes.height / 2.0) * Math.tan((0.5 * 60.0 * Math.PI) / 180),
        },
      },
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([], 3)
    );

    this.geometry.setAttribute("size", new THREE.Float32BufferAttribute([], 1));

    this.geometry.setAttribute(
      "colour",
      new THREE.Float32BufferAttribute([], 3)
    );
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  setAlphaSpline() {
    this.alphaSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });
    this.alphaSpline.AddPoint(0.0, 0.0);
    this.alphaSpline.AddPoint(0.1, 1.0);
    this.alphaSpline.AddPoint(0.6, 1.0);
    this.alphaSpline.AddPoint(1.0, 0.0);
  }

  setSizeSpline() {
    this.sizeSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });
    this.sizeSpline.AddPoint(0.0, 1.0);
    this.sizeSpline.AddPoint(0.5, 5.0);
    this.sizeSpline.AddPoint(1.0, 1.0);
  }

  addParticles() {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * 1,
          (Math.random() * 2 - 1) * 1,
          (Math.random() * 2 - 1) * 1
        ),
        size: (Math.random() * 0.5 + 0.5) * 4,
        colour: new THREE.Color(Math.random(), Math.random(), Math.random()),
        alpha: 1,
        life: 5,
        rotation: Math.random() * 2 * Math.PI,
        velocity: new THREE.Vector3(0, -15, 0),
      });
    }
  }

  updateGeometry() {
    const positions = [];
    const sizes = [];
    const colours = [];
    const angles = [];

    for (let p of this.particles) {
      positions.push(p.position.x, p.position.y, p.position.z);
      sizes.push(p.size);
      colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
      angles.push(p.rotation);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    this.geometry.setAttribute(
      "colour",
      new THREE.Float32BufferAttribute(colours, 4)
    );
    this.geometry.setAttribute(
      "angle",
      new THREE.Float32BufferAttribute(angles, 1)
    );

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
    this.geometry.attributes.colour.needsUpdate = true;
    this.geometry.attributes.angle.needsUpdate = true;
  }

  updateParticles(timeElapsed) {
    for (let p of this.particles) {
      p.life -= timeElapsed;
    }

    this.particles = this.particles.filter((p) => {
      return p.life > 0.0;
    });

    for (let p of this.particles) {
      const t = 1.0 - p.life / p.maxLife;

      p.rotation += timeElapsed * 0.5;
      p.alpha = this.alphaSpline.Get(t);
      p.currentSize = p.size * this.sizeSpline.Get(t);

      p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));

      const drag = p.velocity.clone();
      drag.multiplyScalar(timeElapsed * 0.1);
      drag.x =
        Math.sign(p.velocity.x) *
        Math.min(Math.abs(drag.x), Math.abs(p.velocity.x));
      drag.y =
        Math.sign(p.velocity.y) *
        Math.min(Math.abs(drag.y), Math.abs(p.velocity.y));
      drag.z =
        Math.sign(p.velocity.z) *
        Math.min(Math.abs(drag.z), Math.abs(p.velocity.z));
      p.velocity.sub(drag);
    }

    this.particles.sort((a, b) => {
      const d1 = this.site.camera.instance.position.distanceTo(a.position);
      const d2 = this.site.camera.instance.position.distanceTo(b.position);

      if (d1 > d2) return -1;
      if (d1 < d2) return 1;

      return 0;
    });
  }
}

class LinearSpline {
  constructor(lerp) {
    this._points = [];
    this._lerp = lerp;
  }

  AddPoint(t, d) {
    this._points.push([t, d]);
  }

  Get(t) {
    let p1 = 0;

    for (let i = 0; i < this._points.length; i++) {
      if (this._points[i][0] >= t) {
        break;
      }
      p1 = i;
    }

    const p2 = Math.min(this._points.length - 1, p1 + 1);

    if (p1 == p2) {
      return this._points[p1][1];
    }

    return this._lerp(
      (t - this._points[p1][0]) / (this._points[p2][0] - this._points[p1][0]),
      this._points[p1][1],
      this._points[p2][1]
    );
  }
}

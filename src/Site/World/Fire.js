import * as THREE from "three";
import Site from "../Site.js";
import fireVertexShader from "../Shaders/Fire/vertex.glsl";
import fireFragmentShader from "../Shaders/Fire/fragment.glsl";
import Time from "../Utils/Time.js";

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

export default class Fire {
  constructor(wx, wy, wz) {
    this.site = new Site();
    this.localTime = new Time();
    this.scene = this.site.scene;
    this.resources = this.site.resources;
    this.sizes = this.site.sizes;

    this.wheelX = wx;
    this.wheelY = wy;
    this.wheelZ = wz;

    const uniforms = {
      diffuseTexture: {
        value: this.resources.items.fireTexture,
      },
      pointMultiplier: {
        value:
          window.innerHeight / (2.0 * Math.tan((0.5 * 60.0 * Math.PI) / 180.0)),
      },
    };

    this._material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
      vertexColors: true,
    });

    this._camera = this.site.camera.instance;
    this._particles = [];

    this._geometry = new THREE.BufferGeometry();
    this._geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([], 3)
    );
    this._geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute([], 1)
    );
    this._geometry.setAttribute(
      "colour",
      new THREE.Float32BufferAttribute([], 4)
    );
    this._geometry.setAttribute(
      "angle",
      new THREE.Float32BufferAttribute([], 1)
    );

    this._points = new THREE.Points(this._geometry, this._material);

    this._points.layers.set(0);
    this.scene.add(this._points);

    this._alphaSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });

    this._alphaSpline.AddPoint(0.0, 0.5);
    this._alphaSpline.AddPoint(0.1, 1.0);
    this._alphaSpline.AddPoint(0.6, 1.0);
    this._alphaSpline.AddPoint(1.0, 5.0);
    /* 
     this._alphaSpline.AddPoint(0.0, 0.0);
     this._alphaSpline.AddPoint(0.1, 1.0);
     this._alphaSpline.AddPoint(0.6, 1.0);
     this._alphaSpline.AddPoint(1.0, 0.0);
*/
    this._colourSpline = new LinearSpline((t, a, b) => {
      const c = a.clone();
      return c.lerp(b, t);
    });
    this._colourSpline.AddPoint(0.0, new THREE.Color(0xffff80));
    this._colourSpline.AddPoint(1.0, new THREE.Color(0xff8080));

    this._sizeSpline = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });

    this._sizeSpline.AddPoint(0.0, 1.0);
    this._sizeSpline.AddPoint(0.5, 5.0);
    this._sizeSpline.AddPoint(1.0, 1.0);

    // document.addEventListener("keyup", (e) => this._onKeyUp(e), false);

    this._UpdateGeometry();
  }

  /*
  _onKeyUp(event) {
    switch (event.keyCode) {
      case 32: // SPACE
        this._AddParticles();
        break;
    }
  }
*/
  _AddParticles(timeElapsed) {
    // timeElapsed += 1;
    if (!this.control) {
      this.control = 0.0;
    }
    this.control += timeElapsed;
    const n = Math.floor(this.control * 7.0);
    this.control -= n / 7.0;

    for (let i = 0; i < n; i++) {
      const life = (Math.random() * 0.75 + 0.25) * 10.0;

      this._particles.push({
        position: new THREE.Vector3(
          (Math.random() * 2 - 1) * 0.1,
          (Math.random() * 2 - 1) * 0.1,
          (Math.random() * 2 - 1) * 0.1
        ),
        size: (Math.random() * 0.5 + 0.5) * 0.5,
        colour: new THREE.Color(),
        alpha: 1.0,
        life: life,
        maxLife: life,
        rotation: Math.random() * 2.0 * Math.PI,
        velocity: new THREE.Vector3(0.7, 0, 0),
      });
    }
  }

  _UpdateGeometry() {
    const positions = [];
    const sizes = [];
    const colours = [];
    const angles = [];

    for (let p of this._particles) {
      positions.push(
        p.position.x +
          this.site.physicsWorld.physicCar.carBody.position.x +
          this.wheelX,
        p.position.y +
          this.site.physicsWorld.physicCar.carBody.position.y +
          this.wheelY,
        p.position.z +
          this.site.physicsWorld.physicCar.carBody.position.z +
          this.wheelZ
      );
      colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
      sizes.push(p.currentSize);

      angles.push(p.rotation);
    }

    this._geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this._geometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    this._geometry.setAttribute(
      "colour",
      new THREE.Float32BufferAttribute(colours, 4)
    );
    this._geometry.setAttribute(
      "angle",
      new THREE.Float32BufferAttribute(angles, 1)
    );

    this._geometry.attributes.position.needsUpdate = true;
    this._geometry.attributes.size.needsUpdate = true;
    this._geometry.attributes.colour.needsUpdate = true;
    this._geometry.attributes.angle.needsUpdate = true;
  }

  _UpdateParticles(timeElapsed) {
    //   timeElapsed += 0.01 * 0.1;
    for (let p of this._particles) {
      p.life -= timeElapsed;
    }

    this._particles = this._particles.filter((p) => {
      return p.life > 0.0;
    });

    for (let p of this._particles) {
      const t = 1.0 - p.life / p.maxLife;
      //  console.log(t);

      p.rotation += timeElapsed * 0.5;
      p.alpha = this._alphaSpline.Get(t);
      p.currentSize = p.size * this._sizeSpline.Get(t);
      p.colour.copy(this._colourSpline.Get(t));

      p.position.add(p.velocity.clone().multiplyScalar(timeElapsed * 0.5));

      const drag = p.velocity.clone();
      drag.multiplyScalar(timeElapsed * 0.05);
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

    this._particles.sort((a, b) => {
      const d1 = this._camera.position.distanceTo(a.position);
      const d2 = this._camera.position.distanceTo(b.position);

      if (d1 > d2) {
        return -1;
      }

      if (d1 < d2) {
        return 1;
      }

      return 0;
    });
  }

  /*
  Step(timeElapsed) {
    this._AddParticles(timeElapsed);
    this._UpdateParticles(timeElapsed);
    this._UpdateGeometry();
  }
  */
}

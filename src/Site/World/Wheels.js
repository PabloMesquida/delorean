import Site from "../Site.js";

export default class Wheels {
  constructor() {
    this.site = new Site();
    this.scene = this.site.scene;
    this.resources = this.site.resources;

    // Resource
    this.resource1 = this.resources.items.wheel1Model;
    this.resource2 = this.resources.items.wheel2Model;
    this.resource3 = this.resources.items.wheel3Model;
    this.resource4 = this.resources.items.wheel4Model;

    this.setModels();
  }

  setModels() {
    this.model1 = this.resource1.scene;
    this.model2 = this.resource2.scene;
    this.model3 = this.resource3.scene;
    this.model4 = this.resource4.scene;
    this.scene.add(this.model1, this.model2, this.model3, this.model4);
  }
}

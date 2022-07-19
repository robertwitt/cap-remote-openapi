const cds = require("@sap/cds");

class CropService extends cds.ApplicationService {
  async init() {
    const { Sites } = this.entities;

    this.on("getCurrentWeather", Sites, async (req) => {});
    await super.init();
  }
}

module.exports = CropService;

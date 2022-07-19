const cds = require("@sap/cds");

class CropService extends cds.ApplicationService {
  async init() {
    const { Sites } = this.entities;

    this.on("getCurrentWeather", Sites, async (req) => {
      const sites = await req.query;
      const weatherSrv = await cds.connect.to("OpenWeatherMap.API");
      const weatherData = await weatherSrv.send("weather", {
        q: null,
        id: null,
        lat: sites[0].latitude,
        lon: sites[0].longitude,
        zip: null,
        units: "metrics",
        lang: "en",
        mode: "json",
      });
    });

    await super.init();
  }
}

module.exports = CropService;

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
        units: "metric",
        lang: "en",
        mode: "json",
      });

      return {
        condition: weatherData.weather[0]
          ? weatherData.weather[0].description
          : null,
        temparature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windspeed: weatherData.wind.speed,
      };
    });

    await super.init();
  }
}

module.exports = CropService;

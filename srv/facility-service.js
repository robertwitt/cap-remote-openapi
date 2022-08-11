const cds = require("@sap/cds");

class FacilityService extends cds.ApplicationService {
  async init() {
    const { Sites } = this.entities;

    this.on("getCurrentWeather", Sites, async (req) => {
      const sites = await req.query;
      if (!sites.length) {
        return req.reject(404);
      }

      const { postalCode, country_code: country } = sites[0].postalAddress;
      const weatherSrv = await cds.connect.to("OpenWeatherMap.API");
      const weatherData = await weatherSrv.send("weather", {
        q: null,
        id: null,
        lat: null,
        lon: null,
        zip: `${postalCode},${country}`,
        units: "metric",
        lang: "en",
        mode: "json",
      });

      return {
        condition: weatherData.weather[0]?.description ?? null,
        temparature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windspeed: weatherData.wind.speed,
      };
    });

    await super.init();
  }
}

module.exports = FacilityService;

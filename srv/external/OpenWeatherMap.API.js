const { RestRemoteService } = require("cap-remote-service-rest");

class OpenWeatherMapService extends RestRemoteService {
  customizeQueryParams(queryParams) {
    queryParams.set("appid", process.env.API_KEY);
  }
}

module.exports = OpenWeatherMapService;

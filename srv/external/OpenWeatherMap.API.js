const OpenApiRemoteService = require("../utils/OpenApiRemoteService");

class OpenWeatherMapService extends OpenApiRemoteService {
  _getQueryParams(definition, data) {
    const queryParams = super._getQueryParams(definition, data);
    queryParams.set("appid", process.env.API_KEY);
    return queryParams;
  }
}

module.exports = OpenWeatherMapService;

const cds = require("@sap/cds");
const { URLSearchParams } = require("url");

class OpenWeatherMapService extends cds.RemoteService {
  async init() {
    this.before("*", "*", (req) => {
      const fullyQualifiedName = this.namespace + "." + req.event;
      const definition = this.model.definitions[fullyQualifiedName];

      req.method = this._getMethod(definition);
      req.path = this._getPath(definition, req.data || {});
      req.data = {};
      req.event = undefined;
    });

    await super.init();
  }

  _getMethod(definition) {
    return definition["@openapi.method"] || definition.kind === "action"
      ? "POST"
      : "GET";
  }

  _getPath(definition, data) {
    const path = definition["@openapi.path"]
      .split("/")
      .map((segment) => {
        const match = segment.match(/(?<=\{)(.*)(?=\})/g);
        if (!match) {
          return segment;
        }

        const param = match[0];
        const paramValue = data[param];
        if (paramValue === undefined || paramValue === null) {
          throw new CapError(
            400,
            `Value for mandatory parameter '${param}' missing`
          );
        }

        return paramValue.toString();
      })
      .join("/");

    const queryParams = new URLSearchParams();
    Object.entries(data)
      .filter(
        ([key]) =>
          definition.params &&
          definition.params[key] &&
          definition.params[key]["@openapi.in"] === "query"
      )
      .filter(([, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => queryParams.set(key, value.toString()));
    const queryString = queryParams.toString();

    return path + (queryString.length ? "?" + queryString : "");
  }
}

class CapError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = OpenWeatherMapService;

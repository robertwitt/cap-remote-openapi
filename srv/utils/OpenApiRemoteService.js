const cds = require("@sap/cds");
const { URLSearchParams } = require("url");
const { CapError } = require("./CapError");

class OpenApiRemoteService extends cds.RemoteService {
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
    // Maps the parameters to path segments
    const mapPathSegment = (segment) => {
      const match = segment.match(/(?<=\{)(.*)(?=\})/g); // matches e. g. {placeholder}
      if (!match) {
        // No placeholder
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
    };

    // Construct the path to the endpoint by replacing placeholders with actual parameter values
    const path = definition["@openapi.path"]
      .split("/")
      .map(mapPathSegment)
      .join("/");

    const queryString = this._getQueryParams(definition, data).toString();
    return path + (queryString.length ? "?" + queryString : "");
  }

  _getQueryParams(definition, data) {
    const queryParams = new URLSearchParams();
    Object.entries(data)
      .filter(([key]) => definition.params?.[key]?.["@openapi.in"] === "query")
      .filter(([, value]) => value !== undefined && value !== null)
      .forEach(([key, value]) => queryParams.set(key, value.toString()));

    return queryParams;
  }
}

module.exports = OpenApiRemoteService;

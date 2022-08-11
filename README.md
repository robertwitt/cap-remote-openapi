# OpenAPI Remote Service

The code in this repository belongs to the blog post [_Import OpenAPI-documented APIs remotely with CAP_]() on SAP community.

This is a simple CAP application to demonstrate how to invoke an OpenAPI-documented API via CAP's Remote Service API.

This project contains a service that exposes an endpoint `/Sites` to get basic information of a facility or site. The bound function `/Sites/<ID>/getCurrentWeather()` internally invokes a REST API of [OpenWeatherMap.org](https://openweathermap.org/current) to get the current weather at the given site.

## Prerequisite

You need to register at [OpenWeatherMap.org](https://openweathermap.org) and generate an API key in order to execute the requests locally.

## Run locally

Start the server locally and pass the API key as environment variable `API_KEY`:

```bash
APP_KEY=<your API key> cds watch
```

You can execute the sample requests in [`requests.http`](./requests.http) to see the effect.

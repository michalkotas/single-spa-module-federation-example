const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(
    angularWebpackConfig,
    options
  );

  const config = {
    ...singleSpaWebpackConfig,
    optimization: {
      runtimeChunk: false,
    },
    cache: false,
    plugins: [
      ...singleSpaWebpackConfig.plugins,
      new ModuleFederationPlugin({
        name: "mfe1",
        library: { type: "module" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./projects/mfe1/src/main.single-spa.ts",
        },
        shared: {
          "@angular/core": { eager: false, singleton: true , strictVersion: true},
          "@angular/common": { eager: false, singleton: true, strictVersion: true },
          "@angular/common/http": { eager: false, singleton: true, strictVersion: true },
          "@angular/router": { eager: false, singleton: true, strictVersion: true },
          "single-spa": { eager: false, singleton: true, strictVersion: true },
          "single-spa-angular": { eager: false, singleton: true, strictVersion: true },
        },
      }),
    ],
    output: {
      ...singleSpaWebpackConfig.output,
      library: "mfe1",
      publicPath: "http://localhost:4201/",
    },
    experiments: {
      outputModule: true
    }
  };

  return config;
};
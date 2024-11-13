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
        name: "mfe2",
        library: { type: "module" },
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./projects/mfe2/src/main.single-spa.ts",
        },
        shared: {
          "@angular/core": { eager: false, singleton: true },
          "@angular/common": { eager: false, singleton: true },
          "@angular/router": { eager: false, singleton: true },
          "single-spa": { eager: false, singleton: true },
          "single-spa-angular": { eager: false, singleton: true },
        },
      }),
    ],
    output: {
      ...singleSpaWebpackConfig.output,
      library: "mfe2",
      publicPath: "http://localhost:4202/",
    },
    experiments: {
      outputModule: true
    }
  };

  return config;
};
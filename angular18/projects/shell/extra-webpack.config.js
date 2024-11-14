const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = (angularWebpackConfig, options) => {
  const config = {
    ...angularWebpackConfig,
    optimization: {
      runtimeChunk: false,
    },
    cache: false,
    plugins: [
      ...angularWebpackConfig.plugins,
      new ModuleFederationPlugin({
        remoteType: "dmodule",
        name: "shell",
        filename: "remoteEntry.js",
        shared: {
          "@angular/core": { eager: false, singleton: true, strictVersion: true },
          "@angular/common": { eager: false, singleton: true, strictVersion: true },
          "@angular/common/http": { eager: false, singleton: true, strictVersion: true },
          "@angular/router": { eager: false, singleton: true, strictVersion: true },
          "single-spa": { eager: false, singleton: true, strictVersion: true },
          "single-spa-angular": { eager: false, singleton: true, strictVersion: true },
        },
      }),
    ],
    output: {
      ...angularWebpackConfig.output,
      publicPath: "http://localhost:4200/",
    }
  };
  return config;
};

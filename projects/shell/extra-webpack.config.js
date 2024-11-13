const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

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
        name: "shell",
        filename: "remoteEntry.js",
        // remotes: {
        //   mfe1: 'mfe1@http://localhost:4201/remoteEntry.js',
        //   mfe2: 'mfe2@http://localhost:4202/remoteEntry.js'
        // },
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
      ...angularWebpackConfig.output,
      publicPath: "http://localhost:4200/",
    }
  };
  return config;
};

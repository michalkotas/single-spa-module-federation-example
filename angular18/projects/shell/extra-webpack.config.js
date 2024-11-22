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
        remoteType: "module",
        name: "shell",
        manifest: true,
        filename: "remoteEntry.js",
        // remotes: {
        //       app1: {
        //         external: 'app1@http://localhost:4201/mf-manifest.json',
        //         // shareScope: 'ang18'
        //       },
        //       app2: {
        //         external: 'app2@http://localhost:4202/mf-manifest.json',
        //         shareScope: 'ang17'
        //       },
        //       app3: {
        //         external: 'app3@http://localhost:4203/mf-manifest.json',
        //         shareScope: 'ang17'
        //       },
        // },
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

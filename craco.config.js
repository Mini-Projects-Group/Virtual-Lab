const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#1DA1F2",
              "@default-color": "#134166d9",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

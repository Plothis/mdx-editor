module.exports = function override(webpackConfig, env) {
  //do stuff with the webpack config...
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });
  return webpackConfig;
};

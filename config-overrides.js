
module.exports = function override(config, env) {
    //do stuff with the webpack config...
    console.log(config.rules)
    // config.rules.push({

    // })
    return config;
}
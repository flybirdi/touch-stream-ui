const fs = require('fs');
const yaml = require('js-yaml');

function loadConfig(configPath) {
  const rawConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
  const envConfig = Object.assign({}, rawConfig, rawConfig.env[process.env.NODE_ENV || 'dev']);
  delete envConfig.env;
  return envConfig;
}

module.exports = {
  loadConfig,
};

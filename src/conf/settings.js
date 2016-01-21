var nconf = require('nconf'),
  fs = require('fs');

nconf.argv()
  .env();

// Base configuration for all environments
nconf.file('src/conf/develop.json');

// Override with specific enviroment config
//var envConf = nconf.get('NODE_ENV');
//if (envConf) {
//  nconf.file('src/conf/' + nconf.get('NODE_ENV') + '.json');
//} else {
//  nconf.set('NODE_ENV', 'develop');
//}

module.exports = nconf;
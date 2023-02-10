const shell = require('shelljs');
const package = require('../package.json');

shell.exec('yarn build');
shell.exec(`docker build . -t buuhvprojects/payment-gateway-integrator:${package.version} --no-cache`);
shell.exec(`docker push buuhvprojects/payment-gateway-integrator:${package.version}`);
const { exec } = require('shelljs');
const packageData = require(process.cwd() + '/package.json');
function changePackageVersionCode() {
    const versionCode = packageData.versionCode + 1;
    exec(`npm version ${versionCode}`);
}
changePackageVersionCode();

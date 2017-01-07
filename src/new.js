var fs = require('fs');
var path = require('path');
var install = require('yarn-install');
var fork = require('child_process').fork;

module.exports = function(appName) {
    if(!appName) {
        throw new Error('You must specify an app name: `create-marko-app my-app`');
    }

    if(!isValidAppName(appName)) {
        throw new Error('Invaid app name: '+appName);
    }

    fs.mkdirSync(appName);
    process.chdir(appName);

    fs.writeFileSync('package.json', JSON.stringify({
        name: appName,
        version: '1.0.0',
        private: true
    }, null, 2));

    install(['mlrawlings/new-marko-app']);

    var bin = path.join(process.cwd(), 'node_modules', '.bin', 'marko-app');
    fork(bin, ['init']);
}

function isValidAppName(name) {
    return !/\/|\\/.test(name);
}
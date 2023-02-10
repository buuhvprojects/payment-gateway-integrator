const shell = require("shelljs");

const destDir = `${process.cwd()}/dist`;

const paths = [`${destDir}/**/*.js`, `${destDir}/*.js`];

function replaceContent(file) {
    shell.sed(
        "-i",
        '"app/',
        "process.cwd()" + "+" + '"/dist/',
        file
    );
    shell.sed(
        "-i",
        "'app/",
        "process.cwd()" + "+" + "'/dist/",
        file
    );
}

paths.forEach((item) => {
    shell.ls(item).forEach((file) => replaceContent(file));
});
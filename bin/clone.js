#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const GIT_REPO = 'https://github.com/Kingdom-Create/kingdom-boilerplate.git';

if (process.argv.length < 3) {
    console.log('ℹ️  You have to provide a name to your dao.');
    console.log('e.g.: npx kingdom-create my-dao');

    process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

try {
    fs.mkdirSync(projectPath);
} catch (error) {
    if (error.code === 'EEXIST') {
        console.log(`🔴 The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
        console.error(`🔴 ${error}`);
    }
    process.exit(1);
}


async function clone() {
    try {
        console.log('⌛ Downloading files ...');
        execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);

        process.chdir(projectPath);

        console.log('⌛ Installing dependencies ...');
        execSync('npm install --loglevel=error');
        execSync('npx rimraf ./.git');

        console.log('🌈 Ready to use!');

    } catch (error) {
        console.error(`🔴 ${error}`);
    }
}

clone();
/*********************
 * Module dependencies
 *********************/

const path = require('path');
const fs = require('fs');
const exec = require('child_process').execSync;
const glob = require('glob');
const xcode = require('xcode');

// unfortunately we can't use the 'plist' module at the moment for parsing
// because it has a few issues with empty strings and keys.
// There are several issues and PRs on that repository open though and hopefully
// we can revert back to only using one module once they're merged.
const plistParser = require('fast-plist');
const plistWriter = require('plist');

const logger = require('./logger');
const helpers = require('./helpers');
logger.setLogTag("react-native-launch-navigator[ios_link_helpers]");

/*********************
 * Private properties
 *********************/
let iosHelpers = {};

const MODULE_CLASS_NAME = "RNLaunchNavigator";
const xcodeproject = findProject(helpers.directory.iosProject);
logger.debug("xcodeproject=" + xcodeproject);


const projectConfig = {
    sourceDir: helpers.directory.iosProject,
    pbxprojPath: path.join(
        helpers.directory.iosProject,
        xcodeproject,
        'project.pbxproj'
    )
};

const project = xcode.project(projectConfig.pbxprojPath).parseSync();


/*********************
 * Public properties
 *********************/
iosHelpers.plist = readPlist(projectConfig.sourceDir, project);
iosHelpers.tempFileName = "injectedQuerySchemes.json.tmp";

/*********************
 * Private functions
 *********************/

// The getBuildProperty method of the 'xcode' project is a bit naive in that it
// doesn't take a specific target but iterates over all of them and doesn't have
// an exit condition if a property has been found.
// Which in the case of react-native projects usually is the tvOS target because
// it comes last.
function getBuildProperty(project, property) {
    const firstTarget = project.getFirstTarget().firstTarget;
    const configurationList = project.pbxXCConfigurationList()[
        firstTarget.buildConfigurationList
        ];
    const defaultBuildConfiguration = configurationList.buildConfigurations.reduce(
        (acc, config) => {
            const buildSection = project.pbxXCBuildConfigurationSection()[
                config.value
                ];
            return buildSection.name ===
            configurationList.defaultConfigurationName
                ? buildSection
                : acc;
        },
        configurationList.buildConfigurations[0]
    );

    return defaultBuildConfiguration.buildSettings[property];
}

function getPlistPath(sourceDir, project) {
    const plistFile = getBuildProperty(project, 'INFOPLIST_FILE');
    if (!plistFile) {
        return null;
    }
    return path.join(
        sourceDir,
        plistFile.replace(/"/g, '').replace('$(SRCROOT)', '')
    );
}

function readPlist(sourceDir, project) {
    const plistPath = getPlistPath(sourceDir, project);
    if (!plistPath || !fs.existsSync(plistPath)) {
        return null;
    }
    return plistParser.parse(fs.readFileSync(plistPath, 'utf-8'));
}

function writePlist(sourceDir, project, plist) {
    fs.writeFileSync(
        getPlistPath(sourceDir, project),
        plistWriter.build(plist)
    );
}

// based on: https://github.com/facebook/react-native/blob/1490ab1/local-cli/core/ios/findProject.js
function findProject(folder) {
    const GLOB_PATTERN = '**/*.xcodeproj';
    const IOS_BASE_PATTERN = /ios||\./;
    const GLOB_EXCLUDE_PATTERN = ['**/@(Pods|node_modules)/**'];

    const projects = glob
        .sync(GLOB_PATTERN, {
            cwd: folder,
            ignore: GLOB_EXCLUDE_PATTERN,
        })
        .filter(project => {
            return path.dirname(project).match(IOS_BASE_PATTERN);
        })
        .sort((projectA, projectB) => {
            return path.dirname(projectA).match(IOS_BASE_PATTERN) ? -1 : 1;
        });

    if (projects.length === 0) {
        return null;
    }

    return projects[0];
}

function getModuleFilePath(filename) {
    return path.join(helpers.directory.module, './' + filename);
}

/*********************
 * Public functions
 *********************/
iosHelpers.writePlist = function (plist) {
    writePlist(projectConfig.sourceDir, helpers.directory.project, plist);
};

iosHelpers.readModuleJson = function (filename) {
    return JSON.parse(fs.readFileSync(getModuleFilePath(filename), 'utf-8'));
};

iosHelpers.writeModuleJson = function (filename, contents) {
    fs.writeFileSync(getModuleFilePath(filename), JSON.stringify(contents));
};

iosHelpers.moduleJsonExists = function (filename) {
    return fs.existsSync(getModuleFilePath(filename));
};

iosHelpers.removeModuleJson = function (filename) {
    fs.unlinkSync(getModuleFilePath(filename));
};

iosHelpers.podInstall = function() {
    try{
        logger.log("pod install");
        exec('pod install', {
            cwd: helpers.directory.iosProject,
            stdio: 'inherit'
        });
    }catch(e){
        //swallow the exception
    }
};


module.exports = iosHelpers;

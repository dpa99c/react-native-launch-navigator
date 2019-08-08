module.exports = {
    dependency: {
        hooks: {
            postlink: "node_modules/react-native-launch-navigator/scripts/postlink.js",
            postunlink: "node_modules/react-native-launch-navigator/scripts/postunlink.js"
        }
    }
};
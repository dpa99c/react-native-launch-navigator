/*********************
 * Private properties
 *********************/
var logger = {};

let DEBUG = false;

let logTag;

/*********************
 * Private functions
 *********************/
let _constructor = function () {
    let cliArgs = [];
    if (process.argv.length > 2) {
        cliArgs = process.argv.slice(2);
    }
    cliArgs.forEach((arg) => {
        if(arg.match('debug')){
            DEBUG = true;
        }
    });
};


/*********************
 * Public functions
 *********************/
logger.setLogTag = function (tag) {
    logTag = tag;
};

logger.log = function (msg) {
    if (!logTag) throw "first call setLogTag()";
    console.log(logTag + ": " + msg);
};

logger.error = function (msg) {
    logger.log("ERROR: " + msg);
};

logger.debug = function (msg) {
    if (!DEBUG) return;
    logger.log("DEBUG: " + msg);
};

_constructor();
module.exports = logger;
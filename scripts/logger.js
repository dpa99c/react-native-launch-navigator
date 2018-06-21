/*********************
 * Private properties
 *********************/
var logger = {};

let DEBUG = false;

let logTag;

/*********************
 * Public functions
 *********************/
logger.setLogTag = function(tag){
    logTag = tag;
};

logger.log = function(msg){
    if(!logTag) throw "first call setLogTag()";
    console.log(logTag+": "+msg);
};

logger.error = function(msg){
    logger.log("ERROR: "+msg);
};

logger.debug = function(msg){
    if(!DEBUG) return;
    logger.log("DEBUG: "+msg);
};

module.exports = logger;
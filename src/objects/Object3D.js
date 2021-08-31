var Objects = require('./objects.js');
var utils = require("../utils/utils.js");

function Object3D(options) {

	var obj = options.obj;

	if (options.units === 'meters') obj = Objects.prototype._makeGroup(options.obj, options);

	obj = Objects.prototype._addMethods(obj);
	return obj
}


module.exports = exports = Object3D;
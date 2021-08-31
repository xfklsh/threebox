var utils = require("../utils/utils.js");
var _ = require('lodash');

function face(obj){
    var straightProject = utils.lnglatsToWorld(obj.geometry);
	var normalized = utils.normalizeVertices(straightProject);
    const geometry = getShapeGeometryFromPoints(normalized.vertices, false);
    const mesh = new THREE.Mesh(geometry, obj.material);
    mesh.position.copy(normalized.position);
    return mesh;
}

function getShapeGeometryFromPoints(points, bezierCurve = false) {
    const shape = new THREE.Shape();
    if (bezierCurve) {
        shape.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 2; i++) {
            shape.bezierCurveTo(points[i].x, points[i].y,
                points[i + 1].x, points[i + 1].y,
                points[i + 2].x, points[i + 2].y);
        }
        shape.bezierCurveTo(_.takeRight(points, 2).concat(
            [{x: points[0].x, y: points[0].y}]));
        shape.bezierCurveTo(_.takeRight(points, 1).concat(
            [{x: points[0].x, y: points[0].y},
            {x: points[1].x, y: points[1].y}]));
    } else {
        shape.fromPoints(points);
    }
    return new THREE.ShapeGeometry(shape);
}


module.exports = exports = face;
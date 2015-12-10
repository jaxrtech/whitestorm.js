/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Figure.
 *
 * @param {String} figure name *THREE.JS*. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addObject = function(figureType, options) {
  'use strict';

  var scope = new api.construct(this, options, figureType);

  var opt = options || {};

  opt.geometry = options.geometryOptions || {};

  scope.materialType = api.loadMaterial(options.materialOptions)._material;

  switch (figureType) {
    case "sphere":

      api.def(opt.geometry.segmentA, 32);
      api.def(opt.geometry.segmentB, 32);

      scope.visible = new THREE.Mesh(new THREE.SphereGeometry(
        opt.geometry.radius,
        opt.geometry.segmentA,
        opt.geometry.segmentB
      ), scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new CANNON.Sphere(opt.geometry.radius);

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; //default
        scope.body.addShape(scope.physic);
        scope.body.name = scope.name;
      }

      break;
    case "cube":

      api.def(opt.geometry.width, 1);
      api.def(opt.geometry.height, 1);
      api.def(opt.geometry.depth, 1);

      scope.visible = new THREE.Mesh(new THREE.BoxGeometry(
        opt.geometry.width,
        opt.geometry.height,
        opt.geometry.depth
      ), scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new CANNON.Box(
          new CANNON.Vec3(
            opt.geometry.width * 0.5,
            opt.geometry.height * 0.5,
            opt.geometry.depth * 0.5
          )
        );

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "cylinder":

      api.def(opt.geometry.radiusTop, 1);
      api.def(opt.geometry.radiusBottom, 1);
      api.def(opt.geometry.height, 1);
      api.def(opt.geometry.radiusSegments, 32);

      scope.visible = new THREE.Mesh(
        new THREE.CylinderGeometry(
          opt.geometry.radiusTop,
          opt.geometry.radiusBottom,
          opt.geometry.height,
          opt.geometry.radiusSegments
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new CANNON.Cylinder(
          opt.geometry.radiusTop,
          opt.geometry.radiusBottom,
          opt.geometry.height,
          opt.geometry.radiusSegments
        );

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "dodecahedron":

      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      scope.visible = new THREE.Mesh(
        new THREE.DodecahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "extrude":

      api.def(opt.geometry.shapes, []);
      api.def(opt.geometry.options, {});

      scope.visible = new THREE.Mesh(
        new THREE.ExtrudeGeometry(
          opt.geometry.shapes,
          opt.geometry.options
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "icosahedron":

      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      scope.visible = new THREE.Mesh(
        new THREE.IcosahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "lathe":

      api.def(opt.geometry.points, []);

      scope.visible = new THREE.Mesh(new THREE.LatheGeometry(
        opt.geometry.points
      ), scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "octahedron":

      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      scope.visible = new THREE.Mesh(
        new THREE.OctahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "parametric":

      api.def(opt.geometry.func, function() {});
      api.def(opt.geometry.slices, 10);
      api.def(opt.geometry.stacks, 10);

      scope.visible = new THREE.Mesh(
        new THREE.ParametricGeometry(
          opt.geometry.func,
          opt.geometry.slices,
          opt.geometry.stacks
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "plane":

      api.def(opt.geometry.func, function() {});
      api.def(opt.geometry.width, 10);
      api.def(opt.geometry.height, 10);
      api.def(opt.geometry.segments, 32);

      scope.visible = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(
          opt.geometry.width,
          opt.geometry.height,
          opt.geometry.segments
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "polyhedron":

      api.def(opt.geometry.verticesOfCube, []);
      api.def(opt.geometry.indicesOfFaces, []);
      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 1);

      scope.visible = new THREE.Mesh(
        new THREE.PolyhedronGeometry(
          opt.geometry.verticesOfCube,
          opt.geometry.indicesOfFaces
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "ring":

      api.def(opt.geometry.innerRadius, 0);
      api.def(opt.geometry.outerRadius, 50);
      api.def(opt.geometry.thetaSegments, 1);
      api.def(opt.geometry.phiSegments, 8);
      api.def(opt.geometry.thetaStart, 0);
      api.def(opt.geometry.thetaLength, Math.PI * 2);

      scope.visible = new THREE.Mesh(
        new THREE.TorusGeometry(
          opt.geometry.outerRadius,
          (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2,
          opt.geometry.thetaSegments, opt.geometry.phiSegments
        ),
      scope.materialType);

      scope._scale.z =
        2 / (opt.geometry.outerRadius - opt.geometry.innerRadius);

      if (!options.onlyvis) {
        scope.physic = CANNON.Trimesh.createTorus(
          opt.geometry.outerRadius,
          (opt.geometry.outerRadius - opt.geometry.innerRadius) / 2,
          opt.geometry.thetaSegments, opt.geometry.phiSegments
        );

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "shape":

      scope.visible = new THREE.Mesh(
        new THREE.ShapeGeometry(opt.geometry.shapes),
        scope.materialType
      );

      scope.onlyvis = true;

      // WARN: console | 2d to 3d.
      console.warn('This is not physic object. 2D!', [scope]);

      break;
    case "tetrahedron":

      api.def(opt.geometry.radius, 1);
      api.def(opt.geometry.detail, 0);

      scope.visible = new THREE.Mesh(
        new THREE.TetrahedronGeometry(
          opt.geometry.radius,
          opt.geometry.detail
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.ConvexFigure(this.visible.geometry);

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "text":

      opt.geometry.parameters = opt.geometry.parameters || {};

      api.def(opt.geometry.text, "Hello World!");
      api.def(opt.geometry.parameters.size, 1);
      api.def(opt.geometry.parameters.height, 50);
      api.def(opt.geometry.parameters.curveSegments, 1);
      api.def(opt.geometry.parameters.font, "Adelle"); // string !
      api.def(opt.geometry.parameters.weight, "normal"); // string !
      api.def(opt.geometry.parameters.style, "normal");
      api.def(opt.geometry.parameters.bevelEnabled, false);
      api.def(opt.geometry.parameters.bevelThickness, 10);
      api.def(opt.geometry.parameters.bevelSize, 8);

      scope.visible = new THREE.Mesh(
        new THREE.TextGeometry(
          opt.geometry.text,
          opt.geometry.parameters
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "torus":

      api.def(opt.geometry.radius, 100);
      api.def(opt.geometry.tube, 40);
      api.def(opt.geometry.radialSegments, 8);
      api.def(opt.geometry.tubularSegments, 6);
      api.def(opt.geometry.arc, Math.PI * 2);

      scope.visible = new THREE.Mesh(
        new THREE.TorusGeometry(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments,
          opt.geometry.arc
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = CANNON.Trimesh.createTorus(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments
        );

        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
    case "torusknot":

      api.def(opt.geometry.radius, 100);
      api.def(opt.geometry.tube, 40);
      api.def(opt.geometry.radialSegments, 8);
      api.def(opt.geometry.tubularSegments, 6);
      api.def(opt.geometry.arc, Math.PI * 2);

      scope.visible = new THREE.Mesh(
        new THREE.TorusKnotGeometry(
          opt.geometry.radius,
          opt.geometry.tube,
          opt.geometry.radialSegments,
          opt.geometry.tubularSegments,
          opt.geometry.p,
          opt.geometry.q,
          opt.geometry.heightScale
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }
      break;
    case "tube":

      // #FIXME:30 fix to WHS.API (not here)
      scope.CustomSinCurve = THREE.Curve.create(
        function(scale) { //custom curve constructor
          this.scale = scale || 1;
        },
        function(t) { //getPoint: t is between 0-1
          var tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;
          return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
        }
      );

      if (!opt.geometry.path) {
        opt.geometry.path = new this.CustomSinCurve(100);
      }

      api.def(opt.geometry.segments, 20);
      api.def(opt.geometry.radius, 2);
      api.def(opt.geometry.radiusSegments, 8);
      api.def(opt.geometry.closed, false);

      scope.visible = new THREE.Mesh(
        new THREE.TubeGeometry(
          opt.geometry.path,
          opt.geometry.segments,
          opt.geometry.radius,
          opt.geometry.radiusSegments,
          opt.geometry.closed
        ),
      scope.materialType);

      if (!options.onlyvis) {
        scope.physic = new WHS.API.TrimeshFigure(scope.visible.geometry);
        scope.body = new CANNON.Body({
          mass: opt.mass
        });

        scope.body.linearDamping = 0.9; // Default value.
        scope.body.addShape(scope.physic);
      }

      break;
  }

  // DOING:20 Fix code style here.
  scope.addCompoundFace = function() {
    this.compoundFace = new THREE.Geometry();

    this.compoundFace.faces.push(new THREE.Face3(0, 1, 2));

    var boundingBox = new THREE.Box3().setFromObject(this.visible);

    var boxAround = new THREE.BoxGeometry(
      boundingBox.max.x - boundingBox.min.x,
      boundingBox.max.y - boundingBox.min.y,
      boundingBox.max.z - boundingBox.min.z
    );

    var vec1 = boxAround.vertices[boxAround.faces[7].a]
      .add(this.visible.position);

    var vec2 = boxAround.vertices[boxAround.faces[7].b]
      .add(this.visible.position);

    var vec3 = boxAround.vertices[boxAround.faces[7].c]
      .add(this.visible.position);

    this.compoundFace.vertices.push(vec1);
    this.compoundFace.vertices.push(vec2);
    this.compoundFace.vertices.push(vec3);
    //this.compoundFace.vertices.push(new THREE.Vector3(0,1,2));
  }

  scope.remove = function () {
    return scope.wrap.remove();
  }

  scope.retrieve = function () {
    return scope.wrap.retrieve();
  }

  scope.build(scope.visible, scope.body);

  scope.wrap = new api.Wrap(scope, scope.visible, scope.body);
  console.log(scope);

  return scope;
}
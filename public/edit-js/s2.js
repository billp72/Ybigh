/**
 * Ybigh demo stage 2
 *
 *
 *
 *
 *
 *
 *
 *
 */

sbVertexShader = [
  "varying vec3 vWorldPosition;",
  "void main() {",
  "  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
  "  vWorldPosition = worldPosition.xyz;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
  "}",
].join("\n");

sbFragmentShader = [
  "uniform vec3 topColor;",
  "uniform vec3 bottomColor;",
  "uniform float offset;",
  "uniform float exponent;",
  "varying vec3 vWorldPosition;",
  "void main() {",
  "  float h = normalize( vWorldPosition + offset ).y;",
  "  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );",
  "}",
].join("\n");

let Ybigh = [
  {
    word: "Food: mans view of himself",
    x: -5,
    y: 15,
    z: 50,
    color: 0xffff17,
  },
  {
    word: "Food: mans connection with other than himself",
    x: -5,
    y: 5,
    z: 50,
    color: 0x65b265,
  },
  {
    word: "Food: mans view of the world",
    x: -5,
    y: -5,
    z: 50,
    color: 0x3c3cff,
  },
  {
    word: "Food: mans physical activities",
    x: -5,
    y: -15,
    z: 50,
    color: 0xff2626,
  },
];
/*
    tetrahedron1.position.y = 16.5;
      tetrahedron1.position.x = -7.6;

      tetrahedron1.rotation.y = 0.8;
      tetrahedron1.rotation.x = 0.999;
      tetrahedron1.rotation.z = 1.6;
  */
let informationArrows = [
  {
    x: -8.38,
    y: 19.5,
    z: 10.7,
    rotationX: 0.1,
    rotationY: 1,
    rotationZ: 0,
    name: "beauty-arrow",
    label: "towards beauty",
  },
  {
    x: -7.7,
    y: -17.9,
    z: 6.5,
    rotationX: 0.99,
    rotationY: 0.99,
    rotationZ: 0,
    name: "peril-arrow",
    label: "towards peril",
  },
];
let centerObjects = [
  {
    x: -7,
    y: 2.9,
    z: -0.1,
    width: 7,
    colorBottom: 0xffffff,
    colorSide: 0x10335d,
    colorTop: 0x000000,
    name: "beauty",
    opacity: 0.0,
  },
  {
    x: -7,
    y: 0.3, //down into the vortex
    z: -0.1,
    width: 7,
    colorBottom: 0xffffff,
    colorSide: 0xffffff,
    colorTop: 0x000000,
    name: "signularity",
    opacity: 1.0,
  },
  {
    x: -7,
    y: -2.3,
    z: -0.1,
    width: 7,
    colorBottom: 0xffffff,
    colorSide: 0x10335d,
    colorTop: 0x000000,
    name: "peril",
    opacity: 0.0,
  },
];

let indifferenceBox = [
  {
    x: -7.4,
    y: 1, //pos
    z: 16,
    length: 43.4,
    depth: 0.5, //size
    width: 10,
    name: "indifferentleft",
  },
  {
    x: -22.9,
    y: 1,
    z: 0,
    length: 12.5,
    depth: 0.5, //size
    width: 30,
    name: "indifferentback",
  },
  {
    x: -7.4,
    y: 1,
    z: -15.9,
    length: 43.4,
    depth: 0.5, //size
    width: 10,
    name: "indifferentright",
  },
  {
    x: 8,
    y: 1,
    z: 0,
    length: 12.5,
    depth: 0.5, //size
    width: 30,
    name: "indifferentfront",
  },
];
var ybigh = {
  scene: null,
  camera: null,
  renderer: null,
  container: null,
  controls: null,
  clock: null /*stats: null,*/,
  plane: null,
  selection: null,
  offset: new THREE.Vector3(),
  objects: [],
  raycaster: new THREE.Raycaster(),
  textlabels: [],
  centerCube: [],
  indifferenceArray: [],
  torus: null,
  elem: null,
  info: null,
  closeWindow: null,
  selections: [],
  selection01: null,
  selection02: null,
  selection04: null,
  selection08: null,
  state: null,
  data: null,
  UIBlock: document.getElementById("overlay"),
  //torusInner:null,
  requestData: function (callback) {
    ybigh.UIBlock.style.display = "block";

    window.setTimeout(function () {
      callback();
    }, 1000);
  },

  init: function () {
    // Create main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

    var SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;

    // Prepare perspective camera
    var VIEW_ANGLE = 35,
      ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
      NEAR = 1,
      FAR = 1000;
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(100, 0, 0);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Prepare webgl renderer
    //this.renderer = window.WebGLRendererContext ? new THREE.WebGLRenderer({ antialias:true }) : new THREE.CanvasRenderer(); this.scene.fog.color
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(this.scene.fog.color);

    // Prepare container
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);
    // polyhedron class
    let TetrahedronGeometry = function (radius, detail, vertices, indices) {
      THREE.PolyhedronGeometry.call(this, vertices, indices, radius, detail);
    };
    THREE.TetrahedronGeometry.prototype = Object.create(
      THREE.Geometry.prototype
    );
    THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry;

    /*
     * information curve about torus direction
     *
     *
     */
    let geo = new THREE.TorusGeometry(20, 0.3, 16, 100, Math.PI * 1.2),
      mater = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.05,
      }),
      mesh = new THREE.Mesh(geo, mater);
    mesh.position.z = 15;
    mesh.position.x = -8;
    mesh.rotation.y = 29.87;
    mesh.rotation.x = 2;
    //mesh.rotation.z = 1;
    this.scene.add(mesh);

    var arrows = new THREE.TetrahedronGeometry(
      2,
      0,
      [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
      [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1]
    );
    var arrow, mesh1;
    for (var k = 0; k < informationArrows.length; k++) {
      arrow = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.05,
      });
      mesh1 = new THREE.Mesh(arrows.clone(), arrow);
      mesh1.position.z = informationArrows[k].z;
      mesh1.position.x = informationArrows[k].x;
      mesh1.position.y = informationArrows[k].y;
      mesh1.rotation.y = informationArrows[k].rotationY;
      mesh1.rotation.x = informationArrows[k].rotationX;

      mesh1.name = informationArrows[k].name;

      let infotext = this._createTextLabel(
        "info-text",
        informationArrows[k].name,
        "block"
      ); //class name, id, display type
      infotext.setHTML(informationArrows[k].label);
      infotext.setParent(mesh1);
      this.textlabels.push(infotext);
      this.container.appendChild(infotext.element);

      this.scene.add(mesh1);
    }

    /*

        

          tetrahedron1.position.y = 16.5;
      tetrahedron1.position.x = -7.6;

      tetrahedron1.rotation.y = 0.8;
      tetrahedron1.rotation.x = 0.999;
      tetrahedron1.rotation.z = 1.6;
        */

    // Events
    THREEx.WindowResize(this.renderer, this.camera);
    document.addEventListener("mousedown", this.onDocumentMouseDown, false); // touchstart
    document.addEventListener("mousemove", this.onDocumentMouseMove, false); // touchmove
    document.addEventListener("mouseup", this.onDocumentMouseUp, false); // touchend
    document.getElementById("submit").addEventListener("click", ybigh.submit); //submit selections
    document.getElementById("check").addEventListener("click", ybigh.submit); //check the selection chosen
    document.getElementById("next").addEventListener("click", ybigh.getSymbol); //retrieve symbol from server temp

    this.elem = document.getElementById("msg");
    this.info = document.getElementById("info");
    this.closeWindow = document.getElementById("closew");

    // Prepare Orbit controls
    this.controls = new THREE.OrbitControls(this.camera);
    this.controls.target = new THREE.Vector3(0, 0, 0);
    this.controls.maxDistance = 150;

    // Prepare clock
    this.clock = new THREE.Clock();

    // Prepare stats
    /*this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '50px';
    this.stats.domElement.style.bottom = '50px';
    this.stats.domElement.style.zIndex = 1;
    this.container.appendChild( this.stats.domElement );*/

    // Add lights
    this.scene.add(new THREE.AmbientLight(0x444444));

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    this.camera.add(dirLight);
    this.camera.add(dirLight.target);

    /*
     * center collision cones
     *
     */

    for (var i = 0; i < centerObjects.length; i++) {
      let centerCollision = new THREE.CylinderGeometry(
        centerObjects[i].width,
        centerObjects[i].width,
        2,
        32,
        1,
        false
      );

      let wire = !!centerObjects[i].wire ? centerObjects[i].wire : "";

      var faces = centerCollision.faces.length;

      for (var j = 0; j < faces; j++) {
        if (j < 64) {
          centerCollision.faces[j].materialIndex = 0;
        } else if (j > 63 && j < 96) {
          centerCollision.faces[j].materialIndex = 1;
        } else {
          centerCollision.faces[j].materialIndex = 2;
        }
      }

      var centerMatTop = new THREE.MeshBasicMaterial({
        color: centerObjects[i].colorTop,
        transparent: true,
        opacity: centerObjects[i].opacity,
      });
      var centerMatSide = new THREE.MeshBasicMaterial({
        color: centerObjects[i].colorSide,
        transparent: true,
        opacity: centerObjects[i].opacity,
      });
      var centerMatBottom = new THREE.MeshBasicMaterial({
        color: centerObjects[i].colorBottom,
        transparent: true,
        opacity: centerObjects[i].opacity,
      });
      var materialsArray = [];
      materialsArray.push(centerMatSide);
      materialsArray.push(centerMatTop);
      materialsArray.push(centerMatBottom);

      var materialFaces = new THREE.MeshFaceMaterial(materialsArray);

      var centerCube = new THREE.Mesh(centerCollision.clone(), materialFaces);
      centerCube.position.x = centerObjects[i].x;
      centerCube.position.y = centerObjects[i].y;
      centerCube.position.z = centerObjects[i].z;

      centerCube.rotation.x = 3.15;

      centerCube.name = centerObjects[i].name;

      this.centerCube.push(centerCube);

      this.scene.add(centerCube);
    }

    /*
     * Indifferences box rectangles
     *
     */

    for (var j = 0; j < indifferenceBox.length; j++) {
      //length depth width
      var geometry1 = new THREE.BoxGeometry(
        indifferenceBox[j].length,
        indifferenceBox[j].depth,
        indifferenceBox[j].width
      );
      var material1 = new THREE.MeshBasicMaterial({
        color: 0x585858,
        transparent: true,
        opacity: 1,
      });
      var cube1 = new THREE.Mesh(geometry1, material1);

      //xyz
      cube1.position.x = indifferenceBox[j].x;
      cube1.position.y = indifferenceBox[j].y;
      cube1.position.z = indifferenceBox[j].z;

      this.scene.add(cube1);

      this.indifferenceArray.push(cube1);
    }

    /*
     * Torus
     *
     */
    THREE.ImageUtils.crossOrigin = "";
    var texture1 = THREE.ImageUtils.loadTexture(
      "http://netcreative.org/getJSON.php/Ybigh/app/getJSON.php?img=something"
    );

    var torusTetra = new THREE.TorusGeometry(12, 9, 21, 20);
    var material1 = new THREE.MeshBasicMaterial({
      map: texture1,
      transparent: true,
      opacity: 0.9,
    });
    this.torus = new THREE.Mesh(torusTetra, material1);

    this.torus.name = "torus tetrahedron";
    this.torus.position.y = 1;
    this.torus.position.x = -7;

    this.torus.rotation.x = -4.716;
    this.torus.rotation.y = 0;
    this.torus.rotation.z = 0;

    this.scene.add(this.torus);

    // Display skybox
    this.addSkybox();

    // Plane, that helps to determinate an intersection position
    this.plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(300, 300, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xcce0ff })
    );
    this.plane.visible = false;
    this.scene.add(this.plane);

    /* CREATE SYMBOLS
     *
     *
     */

    var geometry = new THREE.CylinderGeometry(3.6, 3.8, 1.5, 20);
    var object, material;
    for (var i = 0; i < Ybigh.length; i++) {
      material = new THREE.MeshBasicMaterial({
        color: Ybigh[i].color,
        transparent: true,
        opacity: 1,
      });
      //material.transparent = true;

      object = new THREE.Mesh(geometry.clone(), material);

      this.objects.push(object);
      object.position.x = Ybigh[i].x;
      object.position.y = Ybigh[i].y;
      object.position.z = Ybigh[i].z;

      object.rotation.x = 0;
      object.rotation.y = 1.7;
      object.rotation.z = 0.0;

      object.name = Ybigh[i].word.replace(/\s+/g, "");

      this.scene.add(object);

      let text = this._createTextLabel(
        "text-label",
        Ybigh[i].word.replace(/\s+/g, ""),
        "block"
      );
      var arr = Ybigh[i].word.split(":");
      var html = "<span class='term'>" + arr[0] + "</span>";
      arr.splice(0, 1, html);
      text.setHTML(arr.join(":"));
      text.setParent(object);
      this.textlabels.push(text);
      this.container.appendChild(text.element);
    }

    ybigh.UIBlock.style.display = "none";
  },
  addSkybox: function () {
    //#070707  0x0077ff
    var iSBrsize = 300;
    var uniforms = {
      topColor: { type: "c", value: new THREE.Color(0xe1e1f2) },
      bottomColor: { type: "c", value: new THREE.Color(0xffffff) },
      offset: { type: "f", value: iSBrsize },
      exponent: { type: "f", value: 1.5 },
    };

    var skyGeo = new THREE.SphereGeometry(iSBrsize, 32, 32);
    skyMat = new THREE.ShaderMaterial({
      vertexShader: sbVertexShader,
      fragmentShader: sbFragmentShader,
      uniforms: uniforms,
      side: THREE.DoubleSide,
      fog: false,
    });
    skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyMesh);
  },
  setForCollision: function (sym) {
    //

    //let torusInner  = new THREE.Box3().setFromObject(this.torusInner);
    let torus = new THREE.Box3().setFromObject(this.torus);
    let extremeGood = new THREE.Box3().setFromObject(this.centerCube[0]);
    let signularity = new THREE.Box3().setFromObject(this.centerCube[1]);
    let extremeIll = new THREE.Box3().setFromObject(this.centerCube[2]);
    let symbol = new THREE.Box3().setFromObject(sym);

    let left = new THREE.Box3().setFromObject(this.indifferenceArray[0]);
    let front = new THREE.Box3().setFromObject(this.indifferenceArray[1]);
    let right = new THREE.Box3().setFromObject(this.indifferenceArray[2]);
    let back = new THREE.Box3().setFromObject(this.indifferenceArray[3]);

    let node0 = document.createElement("LI");
    let node = document.createElement("LI");
    let node1 = document.createElement("LI");
    let stopInterval = null;

    if (symbol.isIntersectionBox(torus)) {
      let submit = document.getElementById("submit");
      submit.disabled = false;
      submit.style.backgroundColor = "#4f87ff";
      submit.style.cursor = "pointer";

      ybigh.state = "torus";
      ybigh.elem.style.backgroundColor = "#2f96b4";
      sym.torus = true;
      this.info.style.display = "block";
      sym.tmsg = "touching the torus";
      node.className = "torus";
      let textnode = document.createTextNode(sym.tmsg);
      node.appendChild(textnode);

      ybigh.elem.appendChild(node);
      //elem.innerHTML = "<li>"+sym.msg+"</li>";
      stopInterval = window.setTimeout(interval, 10000);
      //var nodes = ybigh.elem.querySelectorAll('ul > li');
      function interval() {
        if (sym.torus) {
          ybigh.elem.style.backgroundColor = "transparent";
          while (ybigh.elem.firstChild) {
            ybigh.elem.removeChild(ybigh.elem.firstChild);
          }
          ybigh.info.style.display = "none";
        }
        window.clearInterval(stopInterval);
      }
    }
    //console.log(torus)
    if (symbol.isIntersectionBox(extremeGood)) {
      ybigh.state = "very good";
      if (!sym.peril) {
        sym.beauty = true;
      }
      sym.msg = "your are touching very good";
      let textnode = document.createTextNode(sym.msg);
      node1.appendChild(textnode);
      node1.className = "good";
      ybigh.elem.insertBefore(node1, ybigh.elem.childNodes[0]);
    } else if (symbol.isIntersectionBox(extremeIll)) {
      ybigh.state = "very ill";
      if (!sym.beauty) {
        sym.peril = true;
      }
      sym.msg = "you are touching very ill";
      let textnode = document.createTextNode(sym.msg);
      node1.appendChild(textnode);
      node1.className = "ill";
      ybigh.elem.insertBefore(node1, ybigh.elem.childNodes[0]);
    } else if (symbol.isIntersectionBox(signularity)) {
      if (
        !symbol.isIntersectionBox(left) ||
        !symbol.isIntersectionBox(right) ||
        !symbol.isIntersectionBox(front) ||
        !symbol.isIntersectionBox(back)
      ) {
        if (sym.beauty) {
          ybigh.state = "beauty";
          sym.msg = "you are touching beauty";
          sym.position.set(-7, 10, 1);
          sym.material.color.setHex(0xffffff); //0xff0000
        } else if (sym.peril) {
          ybigh.state = "peril";
          sym.msg = "you are touching peril";
          sym.position.set(-7.5, -10, 1);
          sym.material.color.setHex(0x000000); //0x2d2c2c
        } else {
          sym.msg = "illegal operation";
          sym.position.set(-7, 20, 10);
        }

        let textnode = document.createTextNode(sym.msg);
        node1.appendChild(textnode);
        node1.className = "singularity";
        ybigh.elem.insertBefore(node1, ybigh.elem.childNodes[0]);
        //this.info.style.display = "block";
        //sym.removeEventListener("mousemove", this.onDocumentMouseMove, false);
      } else {
        sym.beauty = false;
      }
    }

    if (
      symbol.isIntersectionBox(left) ||
      symbol.isIntersectionBox(right) ||
      symbol.isIntersectionBox(front) ||
      symbol.isIntersectionBox(back)
    ) {
      ybigh.state = "indifferent";
      sym.indifferent = true;
      this.info.style.display = "block";
      sym.tmsg1 = "touching indifferent";
      node0.className = "indifferent";
      let textnode = document.createTextNode(sym.tmsg1);
      node0.appendChild(textnode);
      sym.material.color.setHex(0x808080);
      ybigh.elem.insertBefore(node0, ybigh.elem.childNodes[0]);
      //sym.position.set(-7.1, 1.4, 23.9);
    }

    var arr = sym.name.split(":");

    if (!!ybigh.state) {
      switch (arr[1]) {
        case "mansviewofhimself":
          ybigh.selection01 = {
            symbol: arr[0],
            x: sym.position.x,
            y: sym.position.y,
            z: sym.position.z,
            category: 01,
            message: ybigh.state,
          };
          break;
        case "mansconnectionwithotherthanhimself":
          ybigh.selection02 = {
            symbol: arr[0],
            x: sym.position.x,
            y: sym.position.y,
            z: sym.position.z,
            category: 02,
            message: ybigh.state,
          };
          break;
        case "mansviewoftheworld":
          ybigh.selection08 = {
            symbol: arr[0],
            x: sym.position.x,
            y: sym.position.y,
            z: sym.position.z,
            category: 08,
            message: ybigh.state,
          };
          break;
        case "mansphysicalactivities":
          ybigh.selection04 = {
            symbol: arr[0],
            x: sym.position.x,
            y: sym.position.y,
            z: sym.position.z,
            category: 04,
            message: ybigh.state,
          };
          break;
      }
    }
    //console.log(sym)
    this.closeWindow.addEventListener("click", function () {
      ybigh.info.style.display = "none";
    });
  },
  _createTextLabel: function (param, id, display) {
    var div = document.createElement("div");
    div.className = param;
    div.id = id;
    div.style.position = "absolute";
    div.style.display = display;
    div.innerHTML = "hi there!";
    div.style.top = -1000;
    div.style.left = -1000;

    var _this = this;

    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0, 0, 0),
      setHTML: function (html) {
        this.element.innerHTML = html;
      },
      setParent: function (threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function () {
        if (parent) {
          this.position.copy(this.parent.position);
        }

        var coords2d = this.get2DCoords(this.position, _this.camera);
        this.element.style.left = coords2d.x + "px";
        this.element.style.top = coords2d.y + "px";
      },
      get2DCoords: function (position, camera) {
        var vector = position.project(camera);
        vector.x = ((vector.x + 1) / 2) * window.innerWidth + 12;
        vector.y = (-(vector.y - 1) / 2) * window.innerHeight - 20;
        return vector;
      },
    };
  },
  onDocumentMouseDown: function (event) {
    event.preventDefault();
    // Get mouse position

    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Get 3D vector from 3D mouse position using 'unproject' function
    var vector = new THREE.Vector3(mouseX, mouseY, 1);
    vector.unproject(ybigh.camera);

    // Set the raycaster position
    ybigh.raycaster.set(
      ybigh.camera.position,
      vector.sub(ybigh.camera.position).normalize()
    );

    // Find all intersected objects
    var intersects = ybigh.raycaster.intersectObjects(ybigh.objects);

    if (intersects.length > 0) {
      // Disable the controls
      ybigh.controls.enabled = false;

      // Set the selection - first intersected object
      ybigh.selection = intersects[0].object;

      ybigh.selection.material.opacity = 0.5;

      if (ybigh.selection.beauty) {
        delete ybigh.selection.beauty;
        ybigh.selection.material.color.setHex(0xad8d30);
      }
      if (ybigh.selection.peril) {
        delete ybigh.selection.peril;
        ybigh.selection.material.color.setHex(0xad8d30);
      }

      if (ybigh.selection.indifferent) {
        delete ybigh.selection.indifferent;
        ybigh.selection.material.color.setHex(0xad8d30);
      }
      // Calculate the offset
      var intersects = ybigh.raycaster.intersectObject(ybigh.plane);
      ybigh.offset.copy(intersects[0].point).sub(ybigh.plane.position);
    }
  },
  onDocumentMouseMove: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // Get mouse position
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Get 3D vector from 3D mouse position using 'unproject' function
    var vector = new THREE.Vector3(mouseX, mouseY, 1);
    vector.unproject(ybigh.camera);

    // Set the raycaster position
    ybigh.raycaster.set(
      ybigh.camera.position,
      vector.sub(ybigh.camera.position).normalize()
    );

    if (ybigh.selection) {
      // Check the position where the plane is intersected
      var intersects = ybigh.raycaster.intersectObject(ybigh.plane);
      // Reposition the object based on the intersection point with the plane
      ybigh.selection.position.copy(intersects[0].point.sub(ybigh.offset));

      //check collision
      ybigh.setForCollision(ybigh.selection);
    } else {
      // Update position of the plane if need
      var intersects = ybigh.raycaster.intersectObjects(ybigh.objects);
      if (intersects.length > 0) {
        //console.log(intersects[0].object.position)
        ybigh.plane.position.copy(intersects[0].object.position);
        ybigh.plane.lookAt(ybigh.camera.position);
      }
    }
  },
  onDocumentMouseUp: function (event) {
    event.preventDefault();
    // Enable the controls
    ybigh.controls.enabled = true;
    ybigh.selection.material.opacity = 1;
    ybigh.selection = null;
  },
  submit: function (e) {
    ybigh.selections.length = 0;

    if (ybigh.selection01) {
      ybigh.selections.push(ybigh.selection01);
    }
    if (ybigh.selection02) {
      ybigh.selections.push(ybigh.selection02);
    }
    if (ybigh.selection04) {
      ybigh.selections.push(ybigh.selection04);
    }
    if (ybigh.selection08) {
      ybigh.selections.push(ybigh.selection08);
    }
    if (e.target.id === "check") {
      alert(JSON.stringify(ybigh.selections));
    } else {
      let next = document.getElementById("next");
      next.disabled = false;
      next.style.backgroundColor = "#4f87ff";
      next.style.cursor = "pointer";

      console.log(ybigh.selections);
    }
  },
  getSymbol: function (event) {
    console.log(e.target.id);
  },
};

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

// Update controls and stats
function update() {
  var delta = ybigh.clock.getDelta();

  ybigh.controls.update(delta);
  //ybigh.stats.update();
}

// Render the scene
function render() {
  if (ybigh.renderer) {
    for (var i = 0; i < ybigh.textlabels.length; i++) {
      ybigh.textlabels[i].updatePosition();
    }
    ybigh.renderer.render(ybigh.scene, ybigh.camera);
  }
}

// Initialize lesson on page load
function initializeYbigh() {
  ybigh.requestData(function () {
    $.ajaxSetup({ headers: { "Node-server": "0" } });
    ybigh.init();
    animate();
  });
}

if (window.initializeYbigh)
  window.addEventListener("load", initializeYbigh, false);
else if (window.attachEvent) window.attachEvent("onload", initializeYbigh);
else window.onload = initializeYbigh;

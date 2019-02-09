function Marker() {
    THREE.Object3D.call(this);

    var radius = 0.005;
    var sphereRadius = 0.02;
    var height = 0.05;
    var URL = null;

    var material = new THREE.MeshPhongMaterial({ color: 0xab9aca });

    var cone = new THREE.Mesh(new THREE.ConeBufferGeometry(radius, height, 8, 1, true), material);
    cone.position.y = height * 0.5;
    cone.rotation.x = Math.PI;

    var sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);
    sphere.position.y = height * 0.95 + sphereRadius;

    this.add(cone, sphere);
}

Marker.prototype = Object.create(THREE.Object3D.prototype);

// ------ Earth object -------------------------------------------------

function Earth(radius, texture) {
    THREE.Object3D.call(this);

    this.userData.radius = radius;

    var earth = new THREE.Mesh(
        new THREE.SphereBufferGeometry(radius, 64.0, 48.0),
        new THREE.MeshPhongMaterial({
            map: texture
        })
    );

    this.add(earth);
}

Earth.prototype = Object.create(THREE.Object3D.prototype);

Earth.prototype.createMarker = function (lat, lon, val) {
    var marker = new Marker();

    var latRad = lat * (Math.PI / 180);
    var lonRad = -lon * (Math.PI / 180);
    var r = this.userData.radius;
    var value = val;
    console.log(value);
    marker.position.set(Math.cos(latRad) * Math.cos(lonRad) * r, Math.sin(latRad) * r, Math.cos(latRad) * Math.sin(lonRad) * r);
    marker.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);
    marker.userData = { URL: value };
    console.log(marker);
    objects.push(marker);
    this.add(marker);
};

// ------ Three.js code ------------------------------------------------

var scene, camera, renderer;
var controls;
var objects = [];

init();

function init() {
    
    
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 100);
    camera.position.set(0.0, 1.5, 5);
    
    
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0x000000, 0);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;
    controls.rotateSpeed = 0.4;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 4.5;
    controls.zoomSpeed = 0.4;
    var ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    var direcitonal = new THREE.DirectionalLight(0xffffff, 0.5);
    direcitonal.position.set(5.0, 2.0, 5.0).normalize();
    scene.add(direcitonal);
    
    var light = new THREE.PointLight(0xffffff, 1, Infinity);
camera.add(light);

    // just some code for the loading
    var manager = createLoader(renderer.domElement, animate);

    var texLoader = new THREE.TextureLoader(manager).setCrossOrigin(true);

    var texture = texLoader.load('media/textura_mapa.jpg');
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    var earth = new Earth(1.0, texture);
    ///añadir marcadores form DDBB
    $.get("back/MapSource.php",{func : "GetMap"}).done(function(data){
        datamap = (jQuery.parseJSON(data));
        console.log(datamap);
        for(var k in datamap) {
            earth.createMarker(datamap[k].lat, datamap[k].long, datamap[k].Pais+"");
         }
    });



    scene.add(earth);
    document.addEventListener('mousedown', onDocumentMouseDown, false);

    window.addEventListener('resize', onResize);
    onResize();

    document.body.appendChild(renderer.domElement);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
var mouse = new THREE.Vector2();
function onDocumentMouseDown(event) {
    console.log("a");
    event.preventDefault();
    mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;
    mouse.z = 0.5;
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera);
    var intersects = raycaster.intersectObjects(objects, true);
	if (intersects.length > 0) {
        console.log(intersects);
		window.open(intersects[0].object.parent.userData.URL+"");
	}
    }

    function onMouseMove( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components
    
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    }
    
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}
(()=>{sbVertexShader=["varying vec3 vWorldPosition;","void main() {","  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );","  vWorldPosition = worldPosition.xyz;","  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),sbFragmentShader=["uniform vec3 topColor;","uniform vec3 bottomColor;","uniform float offset;","uniform float exponent;","varying vec3 vWorldPosition;","void main() {","  float h = normalize( vWorldPosition + offset ).y;","  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );","}"].join("\n");let t=[{word:"Food: mans view of himself",x:-5,y:15,z:50,color:16776983},{word:"Food: mans connection with other than himself",x:-5,y:5,z:50,color:6664805},{word:"Food: mans view of the world",x:-5,y:-5,z:50,color:3947775},{word:"Food: mans physical activities",x:-5,y:-15,z:50,color:16721446}],o=[{x:-8.38,y:19.5,z:10.7,rotationX:.1,rotationY:1,rotationZ:0,name:"beauty-arrow",label:"towards beauty"},{x:-7.7,y:-17.9,z:6.5,rotationX:.99,rotationY:.99,rotationZ:0,name:"peril-arrow",label:"towards peril"}],n=[{x:-7,y:2.9,z:-.1,width:7,colorBottom:16777215,colorSide:1061725,colorTop:0,name:"beauty",opacity:0},{x:-7,y:.3,z:-.1,width:7,colorBottom:16777215,colorSide:16777215,colorTop:0,name:"signularity",opacity:1},{x:-7,y:-2.3,z:-.1,width:7,colorBottom:16777215,colorSide:1061725,colorTop:0,name:"peril",opacity:0}],i=[{x:-7.4,y:1,z:16,length:43.4,depth:.5,width:10,name:"indifferentleft"},{x:-22.9,y:1,z:0,length:12.5,depth:.5,width:30,name:"indifferentback"},{x:-7.4,y:1,z:-15.9,length:43.4,depth:.5,width:10,name:"indifferentright"},{x:8,y:1,z:0,length:12.5,depth:.5,width:30,name:"indifferentfront"}];var s={scene:null,camera:null,renderer:null,container:null,controls:null,clock:null,plane:null,selection:null,offset:new THREE.Vector3,objects:[],raycaster:new THREE.Raycaster,textlabels:[],centerCube:[],indifferenceArray:[],torus:null,elem:null,info:null,closeWindow:null,selections:[],selection01:null,selection02:null,selection04:null,selection08:null,state:null,data:null,UIBlock:document.getElementById("overlay"),requestData:function(e){s.UIBlock.style.display="block",window.setTimeout((function(){e()}),1e3)},init:function(){this.scene=new THREE.Scene,this.scene.fog=new THREE.FogExp2(13426943,3e-4);var e=window.innerWidth,r=window.innerHeight,a=e/r;this.camera=new THREE.PerspectiveCamera(35,a,1,1e3),this.scene.add(this.camera),this.camera.position.set(100,0,0),this.camera.lookAt(new THREE.Vector3(0,0,0)),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,r),this.renderer.setClearColor(this.scene.fog.color),this.container=document.createElement("div"),document.body.appendChild(this.container),this.container.appendChild(this.renderer.domElement),THREE.TetrahedronGeometry.prototype=Object.create(THREE.Geometry.prototype),THREE.TetrahedronGeometry.prototype.constructor=THREE.TetrahedronGeometry;let l=new THREE.TorusGeometry(20,.3,16,100,1.2*Math.PI),c=new THREE.MeshBasicMaterial({color:0,transparent:!0,opacity:.05}),d=new THREE.Mesh(l,c);d.position.z=15,d.position.x=-8,d.rotation.y=29.87,d.rotation.x=2,this.scene.add(d);for(var m,h,p=new THREE.TetrahedronGeometry(2,0,[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1]),u=0;u<o.length;u++){m=new THREE.MeshBasicMaterial({color:0,transparent:!0,opacity:.05}),(h=new THREE.Mesh(p.clone(),m)).position.z=o[u].z,h.position.x=o[u].x,h.position.y=o[u].y,h.rotation.y=o[u].rotationY,h.rotation.x=o[u].rotationX,h.name=o[u].name;let e=this._createTextLabel("info-text",o[u].name,"block");e.setHTML(o[u].label),e.setParent(h),this.textlabels.push(e),this.container.appendChild(e.element),this.scene.add(h)}THREEx.WindowResize(this.renderer,this.camera),document.addEventListener("mousedown",this.onDocumentMouseDown,!1),document.addEventListener("mousemove",this.onDocumentMouseMove,!1),document.addEventListener("mouseup",this.onDocumentMouseUp,!1),document.getElementById("submit").addEventListener("click",s.submit),document.getElementById("check").addEventListener("click",s.submit),document.getElementById("next").addEventListener("click",s.getSymbol),this.elem=document.getElementById("msg"),this.info=document.getElementById("info"),this.closeWindow=document.getElementById("closew"),this.controls=new THREE.OrbitControls(this.camera),this.controls.target=new THREE.Vector3(0,0,0),this.controls.maxDistance=150,this.clock=new THREE.Clock,this.scene.add(new THREE.AmbientLight(4473924));var y=new THREE.DirectionalLight(16777215);y.position.set(200,200,1e3).normalize(),this.camera.add(y),this.camera.add(y.target);for(var E=0;E<n.length;E++){let e=new THREE.CylinderGeometry(n[E].width,n[E].width,2,32,1,!1);n[E].wire&&n[E].wire;for(var f=e.faces.length,w=0;w<f;w++)e.faces[w].materialIndex=w<64?0:w>63&&w<96?1:2;var x=new THREE.MeshBasicMaterial({color:n[E].colorTop,transparent:!0,opacity:n[E].opacity}),g=new THREE.MeshBasicMaterial({color:n[E].colorSide,transparent:!0,opacity:n[E].opacity}),b=new THREE.MeshBasicMaterial({color:n[E].colorBottom,transparent:!0,opacity:n[E].opacity}),T=[];T.push(g),T.push(x),T.push(b);var v=new THREE.MeshFaceMaterial(T),H=new THREE.Mesh(e.clone(),v);H.position.x=n[E].x,H.position.y=n[E].y,H.position.z=n[E].z,H.rotation.x=3.15,H.name=n[E].name,this.centerCube.push(H),this.scene.add(H)}for(w=0;w<i.length;w++){var R=new THREE.BoxGeometry(i[w].length,i[w].depth,i[w].width),B=new THREE.MeshBasicMaterial({color:5789784,transparent:!0,opacity:1}),M=new THREE.Mesh(R,B);M.position.x=i[w].x,M.position.y=i[w].y,M.position.z=i[w].z,this.scene.add(M),this.indifferenceArray.push(M)}THREE.ImageUtils.crossOrigin="";var C=THREE.ImageUtils.loadTexture("http://netcreative.org/getJSON.php/Ybigh/app/getJSON.php?img=something"),z=new THREE.TorusGeometry(12,9,21,20);B=new THREE.MeshBasicMaterial({map:C,transparent:!0,opacity:.9}),this.torus=new THREE.Mesh(z,B),this.torus.name="torus tetrahedron",this.torus.position.y=1,this.torus.position.x=-7,this.torus.rotation.x=-4.716,this.torus.rotation.y=0,this.torus.rotation.z=0,this.scene.add(this.torus),this.addSkybox(),this.plane=new THREE.Mesh(new THREE.PlaneBufferGeometry(300,300,8,8),new THREE.MeshBasicMaterial({color:13426943})),this.plane.visible=!1,this.scene.add(this.plane);var k,I,j=new THREE.CylinderGeometry(3.6,3.8,1.5,20);for(E=0;E<t.length;E++){I=new THREE.MeshBasicMaterial({color:t[E].color,transparent:!0,opacity:1}),k=new THREE.Mesh(j.clone(),I),this.objects.push(k),k.position.x=t[E].x,k.position.y=t[E].y,k.position.z=t[E].z,k.rotation.x=0,k.rotation.y=1.7,k.rotation.z=0,k.name=t[E].word.replace(/\s+/g,""),this.scene.add(k);let e=this._createTextLabel("text-label",t[E].word.replace(/\s+/g,""),"block");var S=t[E].word.split(":"),L="<span class='term'>"+S[0]+"</span>";S.splice(0,1,L),e.setHTML(S.join(":")),e.setParent(k),this.textlabels.push(e),this.container.appendChild(e.element)}s.UIBlock.style.display="none"},addSkybox:function(){var e={topColor:{type:"c",value:new THREE.Color(14803442)},bottomColor:{type:"c",value:new THREE.Color(16777215)},offset:{type:"f",value:300},exponent:{type:"f",value:1.5}},t=new THREE.SphereGeometry(300,32,32);skyMat=new THREE.ShaderMaterial({vertexShader:sbVertexShader,fragmentShader:sbFragmentShader,uniforms:e,side:THREE.DoubleSide,fog:!1}),skyMesh=new THREE.Mesh(t,skyMat),this.scene.add(skyMesh)},setForCollision:function(e){let t=(new THREE.Box3).setFromObject(this.torus),o=(new THREE.Box3).setFromObject(this.centerCube[0]),n=(new THREE.Box3).setFromObject(this.centerCube[1]),i=(new THREE.Box3).setFromObject(this.centerCube[2]),r=(new THREE.Box3).setFromObject(e),a=(new THREE.Box3).setFromObject(this.indifferenceArray[0]),l=(new THREE.Box3).setFromObject(this.indifferenceArray[1]),c=(new THREE.Box3).setFromObject(this.indifferenceArray[2]),d=(new THREE.Box3).setFromObject(this.indifferenceArray[3]),m=document.createElement("LI"),h=document.createElement("LI"),p=document.createElement("LI"),u=null;if(r.isIntersectionBox(t)){let t=document.getElementById("submit");t.disabled=!1,t.style.backgroundColor="#4f87ff",t.style.cursor="pointer",s.state="torus",s.elem.style.backgroundColor="#2f96b4",e.torus=!0,this.info.style.display="block",e.tmsg="touching the torus",h.className="torus";let o=document.createTextNode(e.tmsg);h.appendChild(o),s.elem.appendChild(h),u=window.setTimeout((function(){if(e.torus){for(s.elem.style.backgroundColor="transparent";s.elem.firstChild;)s.elem.removeChild(s.elem.firstChild);s.info.style.display="none"}window.clearInterval(u)}),1e4)}if(r.isIntersectionBox(o)){s.state="very good",e.peril||(e.beauty=!0),e.msg="your are touching very good";let t=document.createTextNode(e.msg);p.appendChild(t),p.className="good",s.elem.insertBefore(p,s.elem.childNodes[0])}else if(r.isIntersectionBox(i)){s.state="very ill",e.beauty||(e.peril=!0),e.msg="you are touching very ill";let t=document.createTextNode(e.msg);p.appendChild(t),p.className="ill",s.elem.insertBefore(p,s.elem.childNodes[0])}else if(r.isIntersectionBox(n))if(r.isIntersectionBox(a)&&r.isIntersectionBox(c)&&r.isIntersectionBox(l)&&r.isIntersectionBox(d))e.beauty=!1;else{e.beauty?(s.state="beauty",e.msg="you are touching beauty",e.position.set(-7,10,1),e.material.color.setHex(16777215)):e.peril?(s.state="peril",e.msg="you are touching peril",e.position.set(-7.5,-10,1),e.material.color.setHex(0)):(e.msg="illegal operation",e.position.set(-7,20,10));let t=document.createTextNode(e.msg);p.appendChild(t),p.className="singularity",s.elem.insertBefore(p,s.elem.childNodes[0])}if(r.isIntersectionBox(a)||r.isIntersectionBox(c)||r.isIntersectionBox(l)||r.isIntersectionBox(d)){s.state="indifferent",e.indifferent=!0,this.info.style.display="block",e.tmsg1="touching indifferent",m.className="indifferent";let t=document.createTextNode(e.tmsg1);m.appendChild(t),e.material.color.setHex(8421504),s.elem.insertBefore(m,s.elem.childNodes[0])}var y=e.name.split(":");if(s.state)switch(y[1]){case"mansviewofhimself":s.selection01={symbol:y[0],x:e.position.x,y:e.position.y,z:e.position.z,category:1,message:s.state};break;case"mansconnectionwithotherthanhimself":s.selection02={symbol:y[0],x:e.position.x,y:e.position.y,z:e.position.z,category:2,message:s.state};break;case"mansviewoftheworld":s.selection08={symbol:y[0],x:e.position.x,y:e.position.y,z:e.position.z,category:8,message:s.state};break;case"mansphysicalactivities":s.selection04={symbol:y[0],x:e.position.x,y:e.position.y,z:e.position.z,category:4,message:s.state}}this.closeWindow.addEventListener("click",(function(){s.info.style.display="none"}))},_createTextLabel:function(e,t,o){var n=document.createElement("div");n.className=e,n.id=t,n.style.position="absolute",n.style.display=o,n.innerHTML="hi there!",n.style.top=-1e3,n.style.left=-1e3;var i=this;return{element:n,parent:!1,position:new THREE.Vector3(0,0,0),setHTML:function(e){this.element.innerHTML=e},setParent:function(e){this.parent=e},updatePosition:function(){parent&&this.position.copy(this.parent.position);var e=this.get2DCoords(this.position,i.camera);this.element.style.left=e.x+"px",this.element.style.top=e.y+"px"},get2DCoords:function(e,t){var o=e.project(t);return o.x=(o.x+1)/2*window.innerWidth+12,o.y=-(o.y-1)/2*window.innerHeight-20,o}}},onDocumentMouseDown:function(e){e.preventDefault();var t=e.clientX/window.innerWidth*2-1,o=-e.clientY/window.innerHeight*2+1,n=new THREE.Vector3(t,o,1);if(n.unproject(s.camera),s.raycaster.set(s.camera.position,n.sub(s.camera.position).normalize()),(i=s.raycaster.intersectObjects(s.objects)).length>0){s.controls.enabled=!1,s.selection=i[0].object,s.selection.material.opacity=.5,s.selection.beauty&&(delete s.selection.beauty,s.selection.material.color.setHex(11373872)),s.selection.peril&&(delete s.selection.peril,s.selection.material.color.setHex(11373872)),s.selection.indifferent&&(delete s.selection.indifferent,s.selection.material.color.setHex(11373872));var i=s.raycaster.intersectObject(s.plane);s.offset.copy(i[0].point).sub(s.plane.position)}},onDocumentMouseMove:function(e){e.stopPropagation(),e.preventDefault();var t=e.clientX/window.innerWidth*2-1,o=-e.clientY/window.innerHeight*2+1,n=new THREE.Vector3(t,o,1);if(n.unproject(s.camera),s.raycaster.set(s.camera.position,n.sub(s.camera.position).normalize()),s.selection){var i=s.raycaster.intersectObject(s.plane);s.selection.position.copy(i[0].point.sub(s.offset)),s.setForCollision(s.selection)}else(i=s.raycaster.intersectObjects(s.objects)).length>0&&(s.plane.position.copy(i[0].object.position),s.plane.lookAt(s.camera.position))},onDocumentMouseUp:function(e){e.preventDefault(),s.controls.enabled=!0,s.selection.material.opacity=1,s.selection=null},submit:function(e){if(s.selections.length=0,s.selection01&&s.selections.push(s.selection01),s.selection02&&s.selections.push(s.selection02),s.selection04&&s.selections.push(s.selection04),s.selection08&&s.selections.push(s.selection08),"check"===e.target.id)alert(JSON.stringify(s.selections));else{let e=document.getElementById("next");e.disabled=!1,e.style.backgroundColor="#4f87ff",e.style.cursor="pointer",console.log(s.selections)}},getSymbol:function(t){console.log(e.target.id)}};function r(){var e;requestAnimationFrame(r),function(){if(s.renderer){for(var e=0;e<s.textlabels.length;e++)s.textlabels[e].updatePosition();s.renderer.render(s.scene,s.camera)}}(),e=s.clock.getDelta(),s.controls.update(e)}function a(){s.requestData((function(){$.ajaxSetup({headers:{"Node-server":"0"}}),s.init(),r()}))}window.initializeYbigh?window.addEventListener("load",a,!1):window.attachEvent?window.attachEvent("onload",a):window.onload=a})();
(()=>{var n=n||{};n.WindowResize=function(n,i){var e=function(){n.setSize(window.innerWidth,window.innerHeight),i.aspect=window.innerWidth/window.innerHeight,i.updateProjectionMatrix()};return window.addEventListener("resize",e,!1),{stop:function(){window.removeEventListener("resize",e)}}},n.WindowResize.bind=function(i,e){return n.WindowResize(i,e)}})();
function getAbsoluteBoundingRect(t){var e=document,o=window,n=e.body,d=void 0!==o.pageXOffset?o.pageXOffset:(e.documentElement||n.parentNode||n).scrollLeft,f=void 0!==o.pageYOffset?o.pageYOffset:(e.documentElement||n.parentNode||n).scrollTop,r=t.getBoundingClientRect();if(t!==n)for(var i=t.parentNode;i!==n;)d+=i.scrollLeft,f+=i.scrollTop,i=i.parentNode;return{bottom:r.bottom+f,height:r.height,left:r.left+d,right:r.right+d,top:r.top+f,width:r.width}}
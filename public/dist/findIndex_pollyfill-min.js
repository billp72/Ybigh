(()=>{"use strict";Array.prototype.findIndex=Array.prototype.findIndex||function(r){if(null===this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof r)throw new TypeError("callback must be a function");for(var n=Object(this),t=n.length>>>0,e=arguments[1],o=0;o<t;o++)if(r.call(e,n[o],o,n))return o;return-1}})();
Ybigh={counter:0,timeoutHandle:"",paths:[],current:"",saveSelection:[],counter_hash:[],click_counter:0,blue:null,green:null,red:null,yellow:null,data:null,confirmIndex:0,to_hex:function(o){return hex=o.toString(16),2==hex.length?hex:"0"+hex},clear:function(){Ybigh.$colors.fadeOut(Ybigh.$colors.remove),Ybigh.timeoutHandle=window.setTimeout(function(){"make-bold active"===$("#"+Ybigh.current).attr("class")&&$("#removeSelections").prop("disabled",!1),Ybigh.show(),$(".cl.world").css({"background-color":"white"}),$(".cl.others").css({"background-color":"white"}),$(".cl.activities").css({"background-color":"white"}),$(".cl.himself").css({"background-color":"white"}),Ybigh.blue=null,Ybigh.green=null,Ybigh.red=null,Ybigh.yellow=null},500)},submitCleared:function(){var o={name:Ybigh.current,wordID:123};$.ajax({type:"POST",url:"/symbol",data:JSON.stringify(o),error:function(o,e,t){},success:function(o){console.log(o),$("#"+Ybigh.current).removeClass("make-bold"),$("#removeSelections").prop("disabled",!0),Ybigh.counter>3&&$("#done").prop("disabled",!1).removeClass("dis")}})},startCounter:function(){Ybigh.timeoutHandle=window.setTimeout(function(){Ybigh.show()},500)},show:function(){var o=$("#phone").html();$(".word");let e;Ybigh.$colors=$('<canvas title="Once selections are made, click whitespace to submit current and load the next word" id="can" height="552" width="552"></canvas>'),$("#container").append(Ybigh.$colors.fadeIn()),Ybigh.colorctx=Ybigh.$colors[0].getContext("2d");var t=getAbsoluteBoundingRect(Ybigh.$colors[0]),c=t.left,l=t.top;Ybigh.render(!0),Ybigh.$colors.on("touchstart mouseup",function(t){if(t.preventDefault(),!Ybigh.current)return void alert("Click a term on the right then make selection(s)");let i="true"===o?t.changedTouches[0]:t,r=i.clientX,h=i.clientY,a=parseInt(r-c),n=parseInt(h-l);var g=0;for(g=0;g<Ybigh.paths.length&&!(e=Ybigh.colorctx.isPointInPath(Ybigh.paths[g],a,n));g++);if(e){let o=Ybigh.get_color(i);if("world"==Ybigh.paths[g].objID){let e=Ybigh.colorctx.createLinearGradient(580,300,90,90);e.addColorStop(0,"#36454F"),e.addColorStop(.1,"#4f87ff"),e.addColorStop(.37,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(550,185),Ybigh.colorctx.lineTo(370,280),Ybigh.colorctx.lineTo(370,300),Ybigh.colorctx.lineTo(550,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=e,Ybigh.colorctx.strokeStyle="#D0D0D0",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=8,Ybigh.blue=o,Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(o.x-2,o.y-2,4,4),Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else if("others"==Ybigh.paths[g].objID){let e=Ybigh.colorctx.createLinearGradient(-45,120,27,323);e.addColorStop(.1,"#014421"),e.addColorStop(.37,"#0fc14e"),e.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(190,50),Ybigh.colorctx.lineTo(285,235),Ybigh.colorctx.lineTo(305,235),Ybigh.colorctx.lineTo(390,50),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=e,Ybigh.colorctx.strokeStyle="#D0D0D0",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=2,Ybigh.green=o,Ybigh.colorctx.beginPath(),Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(o.x-2,o.y-2,4,4),Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else if("activities"==Ybigh.paths[g].objID){let e=Ybigh.colorctx.createLinearGradient(-10,300,380,90);e.addColorStop(0,"#662825"),e.addColorStop(.1,"#ff5f57"),e.addColorStop(.43,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(20,185),Ybigh.colorctx.lineTo(200,280),Ybigh.colorctx.lineTo(200,300),Ybigh.colorctx.lineTo(20,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=e,Ybigh.colorctx.strokeStyle="#D0D0D0",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=4,Ybigh.red=o,Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(o.x-2,o.y-2,4,4),Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else{let e=Ybigh.colorctx.createLinearGradient(-25,485,50,250);e.addColorStop(.2,"#525100"),e.addColorStop(.4,"#c5ff52"),e.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(185,510),Ybigh.colorctx.lineTo(275,335),Ybigh.colorctx.lineTo(300,335),Ybigh.colorctx.lineTo(395,510),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=e,Ybigh.colorctx.strokeStyle="#D0D0D0",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=1,Ybigh.yellow=o,Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(o.x-2,o.y-2,4,4),Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}$(".cl."+Ybigh.paths[g].objID).css({"background-color":o.c})}else if(Ybigh.blue||Ybigh.red||Ybigh.green||Ybigh.yellow){$("#word_list li").removeClass("active");var s=parseInt($("#"+Ybigh.current).attr("data")),b=$("#word_list").find("[data='"+s+"']")[0],Y=s+1,u=$("#word_list").find("[data='"+Y+"']")[0];if(Ybigh.checkIfDone(u))$(u).addClass("active"),Ybigh.next(u,b),s>18&&$("#word_list").scrollTo("+=35",800);else{var d=Y+1,x=$("#word_list").find("[data='"+d+"']")[0];$(x).addClass("active"),Ybigh.next(x,b),d>18&&$("#word_list").scrollTo("+=35",800)}}}),Ybigh.$colors.on("mousemove",function(o){o.preventDefault();let e=parseInt(o.clientX-c),t=parseInt(o.clientY-l);for(var i=0;i<Ybigh.paths.length;i++){Ybigh.colorctx.isPointInPath(Ybigh.paths[i],e,t)&&Ybigh.$colors.css("cursor","crosshair")}})},checkIfDone:function(o){return"make-bold"!==$(o).attr("class")},bind_inputs:function(o){$("#overlay").css("display","block"),$.get("/Stage1/data",function(o){var e;Ybigh.data=o.data,Ybigh.show(),$("#clear").click(Ybigh.clear),$("#done").click(Ybigh.done),$("#removeSelections").click(Ybigh.submitCleared);var t=$("#word_list");$.each(Ybigh.data,function(o,c){var l=$('<li data="'+o+'" id="'+this+'">'+this+"</li>").on("touchstart mouseup",function(){if($("#removeSelections").prop("disabled",!0),$("#word_list li").removeClass("active"),"make-bold"===$(this).attr("class"))return Ybigh.blue||Ybigh.green||Ybigh.red||Ybigh.yellow?($(e).addClass("active"),void alert("Clear or submit active symbol before viewing another symbol")):($(this).addClass("active"),Ybigh.getPreviousState(this),void(e=this));Ybigh.current=$(this).html(),$(".word").val($(this).html().toUpperCase()),$(this).addClass("active"),(Ybigh.blue||Ybigh.green||Ybigh.red||Ybigh.yellow)&&Ybigh.current!==$(e).html()&&Ybigh.next(this,e),e=this});t.append(l)}),$("#overlay").css("display","none")})},next:function(o,e){$(".cl.world").css({"background-color":"white"}),$(".cl.others").css({"background-color":"white"}),$(".cl.activities").css({"background-color":"white"}),$(".cl.himself").css({"background-color":"white"}),Ybigh.close();let t=Ybigh.counter_hash.filter(function(o,e,t){return t.findIndex(function(e){return e.category==o.category})===e}).map(function(o){return{count:Ybigh.counter_hash.filter(function(e){return e.category==o.category}).reduce(function(o,e){return e.count<o?e.count:o}).count,category:o.category}});for(var c=0;c<t.length;c++)Ybigh.yellow&&Ybigh.yellow.category===t[c].category&&(Ybigh.yellow.clicked=t[c].count,Ybigh.saveSelection.push(Ybigh.yellow)),Ybigh.green&&Ybigh.green.category===t[c].category&&(Ybigh.green.clicked=t[c].count,Ybigh.saveSelection.push(Ybigh.green)),Ybigh.red&&Ybigh.red.category===t[c].category&&(Ybigh.red.clicked=t[c].count,Ybigh.saveSelection.push(Ybigh.red)),Ybigh.blue&&Ybigh.blue.category===t[c].category&&(Ybigh.blue.clicked=t[c].count,Ybigh.saveSelection.push(Ybigh.blue));Ybigh.saveSelection.sort(function(o,e){return o.count-e.count}),Ybigh.submit(Ybigh.saveSelection,o,e),Ybigh.saveSelection.length=0,Ybigh.blue=null,Ybigh.green=null,Ybigh.red=null,Ybigh.yellow=null},getPreviousState:function(o){for(var e=$(o).html(),t=[{c:"#81dea2",x:329,y:92,percentx:59.49367088607595,percenty:16.636528028933093,name:e,category:2,clicked:1},{c:"#cadbff",x:451,y:278,percentx:81.55515370705244,percenty:50.27124773960217,name:e,category:8,clicked:2},{c:"#ffe3e2",x:156,y:283,percentx:28.20976491862568,percenty:51.17540687160941,name:e,category:4,clicked:3},{c:"#e0ffa2",x:266,y:489,percentx:48.10126582278481,percenty:88.42676311030742,name:e,category:1,clicked:4}],c=0;c<t.length;c++)switch(Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(t[c].x-2,t[c].y-2,4,4),t[c].category){case 1:$(".cl.himself").css({"background-color":t[c].c}),Ybigh.yellow=t[c],Ybigh.counter_hash.push({count:t[c].click,category:t[c].category});break;case 2:$(".cl.others").css({"background-color":t[c].c}),Ybigh.green=t[c],Ybigh.counter_hash.push({count:t[c].click,category:t[c].category});break;case 4:$(".cl.activities").css({"background-color":t[c].c}),Ybigh.red=t[c],Ybigh.counter_hash.push({count:t[c].click,category:t[c].category});break;case 8:$(".cl.world").css({"background-color":t[c].c}),Ybigh.blue=t[c],Ybigh.counter_hash.push({count:t[c].click,category:t[c].category})}Ybigh.current=e,$(".word").val(e.toUpperCase())},done:function(o){(Ybigh.yellow||Ybigh.blue||Ybigh.red||Ybigh.green)&&Ybigh.next(),window.location.href="/Stage2"},submit:function(o,e,t){$("#overlay").css("display","block"),$.ajax({type:"POST",url:"/symbol",data:JSON.stringify(o),error:function(o,e,t){$("#overlay").css("display","none")},success:function(c){o.length=0,Ybigh.counter+=1,e&&t?(Ybigh.current=$(e).html(),$(".word").val($(e).html().toUpperCase()),$(t).addClass("make-bold")):$(t).addClass("make-bold"),Ybigh.counter>3&&$("#done").prop("disabled",!1).removeClass("dis"),$("#overlay").css("display","none")}})},close:function(){Ybigh.$colors.fadeOut(Ybigh.$colors.remove),Ybigh.startCounter()},get_color:function(o){var e=o.pageX-Ybigh.$colors.offset().left,t=o.pageY-Ybigh.$colors.offset().top,c=Ybigh.colorctx.getImageData(e,t,1,1).data,l=e/$("#can").width()*100,i=t/$("#can").height()*100;return{c:"#"+Ybigh.to_hex(c[0])+Ybigh.to_hex(c[1])+Ybigh.to_hex(c[2]),x:e,y:t,percentx:l,percenty:i}},render:function(o){var e,t=[{nameID:"others",col1:"white",col2:"#0fc14e",col0:"#014421",x:190,y:50,xlt:285,ylt:235,xlt1:305,ylt1:235,xlt2:390,ylt2:50,sy:120,fy:323,sx:-45,fx:27,stop1:.1,stop2:.37,stop3:1,labelX:185,labelY:35,label:"Man's Connections with Other than Himself"},{nameID:"activities",col1:"white",col2:"#ff5f57",col0:"#772d29",x:20,y:185,xlt:200,ylt:280,xlt1:200,ylt1:300,xlt2:20,ylt2:400,sy:300,fy:90,sx:-10,fx:380,stop1:0,stop2:.1,stop3:.43,labelX:20,labelY:170,label:"Man's Physical Activities"},{nameID:"world",col1:"white",col2:"#4f87ff",col0:"#36454F",x:550,y:185,xlt:370,ylt:280,xlt1:370,ylt1:300,xlt2:550,ylt2:400,sy:300,fy:90,sx:580,fx:90,stop1:0,stop2:.1,stop3:.37,labelX:405,labelY:170,label:"Man's View of the World"},{nameID:"himself",col1:"white",col2:"#c5ff52",col0:"#525100",x:185,y:510,xlt:275,ylt:335,xlt1:300,ylt1:335,xlt2:395,ylt2:510,sy:485,fy:250,sx:-25,fx:50,stop1:.2,stop2:.4,stop3:1,labelX:220,labelY:540,label:"Man's View of Himself"}];Path2D.prototype.getID=function(o){this.objID=o};for(var c=0;c<t.length;c++){(e=("others"==t[c].nameID||t[c].nameID,Ybigh.colorctx.createLinearGradient(t[c].sx,t[c].sy,t[c].fx,t[c].fy))).addColorStop(t[c].stop1,t[c].col0),e.addColorStop(t[c].stop2,t[c].col2),e.addColorStop(t[c].stop3,t[c].col1);var l=new Path2D;l.moveTo(t[c].x,t[c].y),l.lineTo(t[c].xlt,t[c].ylt),l.lineTo(t[c].xlt1,t[c].ylt1),l.lineTo(t[c].xlt2,t[c].ylt2),l.closePath(),l.getID(t[c].nameID),Ybigh.colorctx.fillStyle=e,Ybigh.colorctx.strokeStyle="#D0D0D0",Ybigh.colorctx.stroke(l),Ybigh.colorctx.fill(l),o&&(Ybigh.paths.push(l),Ybigh.colorctx.strokeStyle="black",Ybigh.colorctx.font="11px verdana",Ybigh.colorctx.strokeText(t[c].label,t[c].labelX,t[c].labelY))}}},Ybigh.bind_inputs();
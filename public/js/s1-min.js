Ybigh={counter:0,timeoutHandle:"",paths:[],current:"",saveSelection:[],counter_hash:[],click_counter:0,blue:null,green:null,red:null,yellow:null,data:null,rectPosition:null,hasclicked:!1,to_hex:function(o){return hex=o.toString(16),2==hex.length?hex:"0"+hex},clear:function(){Ybigh.$colors.fadeOut(Ybigh.$colors.remove),Ybigh.timeoutHandle=window.setTimeout(function(){"make-bold active"===$("#"+Ybigh.current).attr("class")&&$("#removeSelections").prop("disabled",!1),Ybigh.show(),$(".cl.world").css({"background-color":"white"}),$(".cl.others").css({"background-color":"white"}),$(".cl.activities").css({"background-color":"white"}),$(".cl.himself").css({"background-color":"white"}),Ybigh.blue=null,Ybigh.green=null,Ybigh.red=null,Ybigh.yellow=null},500)},submitCleared:function(){var o={name:Ybigh.current,wordID:123};$.ajax({type:"POST",url:"/symbol",data:JSON.stringify(o),error:function(o,t,e){},success:function(o){console.log(o),$("#"+Ybigh.current).removeClass("make-bold"),$("#removeSelections").prop("disabled",!0),Ybigh.counter>3&&$("#done").prop("disabled",!1).removeClass("dis")}})},startCounter:function(){Ybigh.timeoutHandle=window.setTimeout(function(){Ybigh.show()},500)},show:function(){var o=$("#phone").html();$(".word");let t;Ybigh.$colors=$('<canvas title="Once selections are made, click whitespace to submit current and load the next word" id="can" height="552" width="552"></canvas>'),$("#container").append(Ybigh.$colors.fadeIn()),Ybigh.colorctx=Ybigh.$colors[0].getContext("2d");var e=getAbsoluteBoundingRect(Ybigh.$colors[0]),c=e.left,i=e.top;Ybigh.render(!0),Ybigh.$colors.on("touchstart mousedown",function(e){if(e.preventDefault(),!Ybigh.current)return void alert("Click a term on the right then make selection(s)");let l="true"===o?e.changedTouches[0]:e,r=l.clientX,h=l.clientY,a=parseInt(r-c),g=parseInt(h-i);var n=0;for(n=0;n<Ybigh.paths.length&&!(t=Ybigh.colorctx.isPointInPath(Ybigh.paths[n],a,g));n++);if(t){let o=Ybigh.get_color(l);if(Ybigh.hasclicked=!0,"world"==Ybigh.paths[n].objID){let t=Ybigh.colorctx.createRadialGradient(585,265,150,90,190,20);t.addColorStop(.15,"#36454F"),t.addColorStop(.29,"#4f87ff"),t.addColorStop(.51,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(550,185),Ybigh.colorctx.lineTo(370,285),Ybigh.colorctx.lineTo(370,295),Ybigh.colorctx.lineTo(550,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=t,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=8,Ybigh.blue=o,Ybigh.rectPosition={x:o.x,y:o.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else if("others"==Ybigh.paths[n].objID){let t=Ybigh.colorctx.createRadialGradient(220,140,150,300,240,20);t.addColorStop(0,"#1f6b36"),t.addColorStop(.4,"#0fc14e"),t.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(175,50),Ybigh.colorctx.lineTo(287,235),Ybigh.colorctx.lineTo(297,235),Ybigh.colorctx.lineTo(400,50),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=t,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=2,Ybigh.green=o,Ybigh.rectPosition={x:o.x,y:o.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else if("activities"==Ybigh.paths[n].objID){let t=Ybigh.colorctx.createRadialGradient(135,330,160,200,290,30);t.addColorStop(0,"#84342f"),t.addColorStop(.25,"#ff5f57"),t.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(20,185),Ybigh.colorctx.lineTo(200,285),Ybigh.colorctx.lineTo(200,295),Ybigh.colorctx.lineTo(20,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=t,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=4,Ybigh.red=o,Ybigh.rectPosition={x:o.x,y:o.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}else{let t=Ybigh.colorctx.createRadialGradient(310,520,150,370,230,20);t.addColorStop(.157,"#8c7d38"),t.addColorStop(.35,"#ffe539"),t.addColorStop(.685,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(175,510),Ybigh.colorctx.lineTo(285,335),Ybigh.colorctx.lineTo(295,335),Ybigh.colorctx.lineTo(400,510),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=t,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,o.name=Ybigh.current,o.category=1,Ybigh.yellow=o,Ybigh.rectPosition={x:o.x,y:o.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:o.category})}$(".cl."+Ybigh.paths[n].objID).css({"background-color":o.c})}else if(Ybigh.blue||Ybigh.red||Ybigh.green||Ybigh.yellow){$("#word_list li").removeClass("active");var b=parseInt($("#"+Ybigh.current).attr("data")),s=$("#word_list").find("[data='"+b+"']")[0],Y=b+1,d=$("#word_list").find("[data='"+Y+"']")[0];if(Ybigh.checkIfDone(d))$(d).addClass("active"),Ybigh.next(d,s),b>18&&$("#word_list").scrollTo("+=35",800);else{var u=Y+1,x=$("#word_list").find("[data='"+u+"']")[0];$(x).addClass("active"),Ybigh.next(x,s),u>18&&$("#word_list").scrollTo("+=35",800)}}}),Ybigh.$colors.on("touchmove mousemove",function(t){t.preventDefault();var e,l,r=0;if(Ybigh.hasclicked){let h="true"===o?t.changedTouches[0]:t,a=parseInt(t.clientX-c),g=parseInt(t.clientY-i);for(e=Ybigh.get_color(h),r=0;r<Ybigh.paths.length&&!(l=Ybigh.colorctx.isPointInPath(Ybigh.paths[r],a,g));r++);if(l){if("world"==Ybigh.paths[r].objID){let o=Ybigh.colorctx.createRadialGradient(585,265,150,90,190,20);o.addColorStop(.15,"#36454F"),o.addColorStop(.29,"#4f87ff"),o.addColorStop(.51,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(550,185),Ybigh.colorctx.lineTo(370,285),Ybigh.colorctx.lineTo(370,295),Ybigh.colorctx.lineTo(550,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=o,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,e.name=Ybigh.current,e.category=8,Ybigh.blue=e,Ybigh.rectPosition={x:e.x,y:e.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:e.category})}else if("others"==Ybigh.paths[r].objID){let o=Ybigh.colorctx.createRadialGradient(220,140,150,300,240,20);o.addColorStop(0,"#1f6b36"),o.addColorStop(.4,"#0fc14e"),o.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(175,50),Ybigh.colorctx.lineTo(287,235),Ybigh.colorctx.lineTo(297,235),Ybigh.colorctx.lineTo(400,50),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=o,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,e.name=Ybigh.current,e.category=2,Ybigh.green=e,Ybigh.rectPosition={x:e.x,y:e.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:e.category})}else if("activities"==Ybigh.paths[r].objID){let o=Ybigh.colorctx.createRadialGradient(135,330,160,200,290,30);o.addColorStop(0,"#84342f"),o.addColorStop(.25,"#ff5f57"),o.addColorStop(1,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(20,185),Ybigh.colorctx.lineTo(200,285),Ybigh.colorctx.lineTo(200,295),Ybigh.colorctx.lineTo(20,400),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=o,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,e.name=Ybigh.current,e.category=4,Ybigh.red=e,Ybigh.rectPosition={x:e.x,y:e.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:e.category})}else{let o=Ybigh.colorctx.createRadialGradient(310,520,150,370,230,20);o.addColorStop(.157,"#8c7d38"),o.addColorStop(.35,"#ffe539"),o.addColorStop(.685,"white"),Ybigh.colorctx.beginPath(),Ybigh.colorctx.moveTo(175,510),Ybigh.colorctx.lineTo(285,335),Ybigh.colorctx.lineTo(295,335),Ybigh.colorctx.lineTo(400,510),Ybigh.colorctx.closePath(),Ybigh.colorctx.fillStyle=o,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(),Ybigh.colorctx.fill(),Ybigh.click_counter+=1,e.name=Ybigh.current,e.category=1,Ybigh.yellow=e,Ybigh.rectPosition={x:e.x,y:e.y},Ybigh.counter_hash.push({count:Ybigh.click_counter,category:e.category})}$(".cl."+Ybigh.paths[r].objID).css({"background-color":e.c})}}}),$("body").mouseup(function(){Ybigh.hasclicked=!1,Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(Ybigh.rectPosition.x,Ybigh.rectPosition.y,4,4)})},checkIfDone:function(o){return"make-bold"!==$(o).attr("class")},bind_inputs:function(o){$("#overlay").css("display","block"),$.get("/Stage1/data",function(o){var t;Ybigh.data=o.data,Ybigh.show(),$("#clear").click(Ybigh.clear),$("#done").click(Ybigh.done),$("#removeSelections").click(Ybigh.submitCleared);var e=$("#word_list");$.each(Ybigh.data,function(o,c){var i=$('<li data="'+o+'" id="'+this+'">'+this+"</li>").on("touchstart mouseup",function(){if($("#removeSelections").prop("disabled",!0),$("#word_list li").removeClass("active"),"make-bold"===$(this).attr("class"))return Ybigh.blue||Ybigh.green||Ybigh.red||Ybigh.yellow?($(t).addClass("active"),void alert("Clear or submit active symbol before viewing another symbol")):($(this).addClass("active"),Ybigh.getPreviousState(this),void(t=this));Ybigh.current=$(this).html(),$(".word").val($(this).html().toUpperCase()),$(this).addClass("active"),(Ybigh.blue||Ybigh.green||Ybigh.red||Ybigh.yellow)&&Ybigh.current!==$(t).html()&&Ybigh.next(this,t),t=this});e.append(i)}),$("#overlay").css("display","none")})},next:function(o,t){$(".cl.world").css({"background-color":"white"}),$(".cl.others").css({"background-color":"white"}),$(".cl.activities").css({"background-color":"white"}),$(".cl.himself").css({"background-color":"white"}),Ybigh.close();let e=Ybigh.counter_hash.filter(function(o,t,e){return e.findIndex(function(t){return t.category==o.category})===t}).map(function(o){return{count:Ybigh.counter_hash.filter(function(t){return t.category==o.category}).reduce(function(o,t){return t.count<o?t.count:o}).count,category:o.category}});for(var c=0;c<e.length;c++)Ybigh.yellow&&Ybigh.yellow.category===e[c].category&&(Ybigh.yellow.clicked=e[c].count,Ybigh.saveSelection.push(Ybigh.yellow)),Ybigh.green&&Ybigh.green.category===e[c].category&&(Ybigh.green.clicked=e[c].count,Ybigh.saveSelection.push(Ybigh.green)),Ybigh.red&&Ybigh.red.category===e[c].category&&(Ybigh.red.clicked=e[c].count,Ybigh.saveSelection.push(Ybigh.red)),Ybigh.blue&&Ybigh.blue.category===e[c].category&&(Ybigh.blue.clicked=e[c].count,Ybigh.saveSelection.push(Ybigh.blue));Ybigh.saveSelection.sort(function(o,t){return o.count-t.count}),Ybigh.submit(Ybigh.saveSelection,o,t),Ybigh.saveSelection.length=0,Ybigh.blue=null,Ybigh.green=null,Ybigh.red=null,Ybigh.yellow=null},getPreviousState:function(o){for(var t=$(o).html(),e=[{c:"#81dea2",x:329,y:92,percentx:59.49367088607595,percenty:16.636528028933093,name:t,category:2,clicked:1},{c:"#cadbff",x:451,y:278,percentx:81.55515370705244,percenty:50.27124773960217,name:t,category:8,clicked:2},{c:"#ffe3e2",x:156,y:283,percentx:28.20976491862568,percenty:51.17540687160941,name:t,category:4,clicked:3},{c:"#e0ffa2",x:266,y:489,percentx:48.10126582278481,percenty:88.42676311030742,name:t,category:1,clicked:4}],c=0;c<e.length;c++)switch(Ybigh.colorctx.setTransform(1,0,0,1,0,0),Ybigh.colorctx.fillStyle="#000000",Ybigh.colorctx.fillRect(e[c].x-2,e[c].y-2,4,4),e[c].category){case 1:$(".cl.himself").css({"background-color":e[c].c}),Ybigh.yellow=e[c],Ybigh.counter_hash.push({count:e[c].click,category:e[c].category});break;case 2:$(".cl.others").css({"background-color":e[c].c}),Ybigh.green=e[c],Ybigh.counter_hash.push({count:e[c].click,category:e[c].category});break;case 4:$(".cl.activities").css({"background-color":e[c].c}),Ybigh.red=e[c],Ybigh.counter_hash.push({count:e[c].click,category:e[c].category});break;case 8:$(".cl.world").css({"background-color":e[c].c}),Ybigh.blue=e[c],Ybigh.counter_hash.push({count:e[c].click,category:e[c].category})}Ybigh.current=t,$(".word").val(t.toUpperCase())},done:function(o){(Ybigh.yellow||Ybigh.blue||Ybigh.red||Ybigh.green)&&Ybigh.next(),window.location.href="/Stage2"},submit:function(o,t,e){$("#overlay").css("display","block"),$.ajax({type:"POST",url:"/symbol",data:JSON.stringify(o),error:function(o,t,e){$("#overlay").css("display","none")},success:function(c){o.length=0,Ybigh.counter+=1,t&&e?(Ybigh.current=$(t).html(),$(".word").val($(t).html().toUpperCase()),$(e).addClass("make-bold")):$(e).addClass("make-bold"),Ybigh.counter>3&&$("#done").prop("disabled",!1).removeClass("dis"),$("#overlay").css("display","none")}})},close:function(){Ybigh.$colors.fadeOut(Ybigh.$colors.remove),Ybigh.startCounter()},get_color:function(o){var t=o.pageX-Ybigh.$colors.offset().left,e=o.pageY-Ybigh.$colors.offset().top,c=Ybigh.colorctx.getImageData(t,e,1,1).data,i=t/$("#can").width()*100,l=e/$("#can").height()*100;return{c:"#"+Ybigh.to_hex(c[0])+Ybigh.to_hex(c[1])+Ybigh.to_hex(c[2]),x:t,y:e,percentx:i,percenty:l}},render:function(o){var t,e=[{nameID:"others",col1:"white",col2:"#0fc14e",col0:"#1f6b36",x:175,y:50,xlt:287,ylt:235,xlt1:297,ylt1:235,xlt2:400,ylt2:50,sy:140,fy:240,sx:220,fx:300,stop1:0,stop2:.4,stop3:1,r1:150,r2:20,labelX:185,labelY:35,label:"Man's Connections with Other than Himself"},{nameID:"activities",col1:"white",col2:"#ff5f57",col0:"#84342f",x:20,y:185,xlt:200,ylt:285,xlt1:200,ylt1:295,xlt2:20,ylt2:400,sy:330,fy:290,sx:135,fx:200,stop1:0,stop2:.25,stop3:1,r1:160,r2:30,labelX:20,labelY:170,label:"Man's Physical Activities"},{nameID:"world",col1:"white",col2:"#4f87ff",col0:"#36454F",x:550,y:185,xlt:370,ylt:285,xlt1:370,ylt1:295,xlt2:550,ylt2:400,sy:265,fy:190,sx:585,fx:90,stop1:.15,stop2:.29,stop3:.51,r1:150,r2:20,labelX:405,labelY:170,label:"Man's View of the World"},{nameID:"himself",col1:"white",col2:"#ffe539",col0:"#8c7d38",x:175,y:510,xlt:285,ylt:335,xlt1:295,ylt1:335,xlt2:400,ylt2:510,sy:520,fy:230,sx:310,fx:370,stop1:.157,stop2:.35,stop3:.685,r1:150,r2:20,labelX:220,labelY:540,label:"Man's View of Himself"}];Path2D.prototype.getID=function(o){this.objID=o};for(var c=0;c<e.length;c++){(t=Ybigh.colorctx.createRadialGradient(e[c].sx,e[c].sy,e[c].r1,e[c].fx,e[c].fy,e[c].r2)).addColorStop(e[c].stop1,e[c].col0),t.addColorStop(e[c].stop2,e[c].col2),t.addColorStop(e[c].stop3,e[c].col1);var i=new Path2D;i.moveTo(e[c].x,e[c].y),i.lineTo(e[c].xlt,e[c].ylt),i.lineTo(e[c].xlt1,e[c].ylt1),i.lineTo(e[c].xlt2,e[c].ylt2),i.closePath(),i.getID(e[c].nameID),Ybigh.colorctx.fillStyle=t,Ybigh.colorctx.strokeStyle="#b0aaa6",Ybigh.colorctx.stroke(i),Ybigh.colorctx.fill(i),o&&(Ybigh.paths.push(i),Ybigh.colorctx.strokeStyle="black",Ybigh.colorctx.font="11px verdana",Ybigh.colorctx.strokeText(e[c].label,e[c].labelX,e[c].labelY))}}},Ybigh.bind_inputs();
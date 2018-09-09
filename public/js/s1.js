

Ybigh = {
    counter:0,
    timeoutHandle:'',
    paths:[],
    current:'',
    saveSelection:[],
    counter_hash:[],
    click_counter:0,
    blue:null,
    green:null,
    red:null,
    yellow:null,
    data:null,
    confirmIndex:0,
    
    to_hex: function (dec) {
        hex = dec.toString(16);
        return hex.length == 2 ? hex : '0' + hex;
    },
    clear: function(){

        Ybigh.$colors.fadeOut(Ybigh.$colors.remove);

        Ybigh.timeoutHandle = window.setTimeout(function(){
            if($("#"+Ybigh.current).attr("class") === "make-bold active"){
                $("#removeSelections").prop("disabled", false);
            }
            
            Ybigh.show();
            $(".cl.world").css({'background-color':'white'});
            $(".cl.others").css({'background-color':'white'});
            $(".cl.activities").css({'background-color':'white'});
            $(".cl.himself").css({'background-color':'white'});
            
            Ybigh.blue=null;
            Ybigh.green=null; 
            Ybigh.red=null;
            Ybigh.yellow=null;

        },500);
    },
    submitCleared: function(){
        var obj = {name:Ybigh.current, wordID:123};
        
        $.ajax({
            type: "POST",
            url: "/symbol",
            data: JSON.stringify(obj),
            error: function(jqXHR, textStatus, errorThrown){

            },
            success: function(res){
                console.log(res);

                $("#"+Ybigh.current).removeClass('make-bold');
                $("#removeSelections").prop("disabled", true);

                if(Ybigh.counter > 3){
                    $("#done").prop("disabled", false).removeClass("dis");
                }

            }
        });

    },
    startCounter: function(){
       
        Ybigh.timeoutHandle = window.setTimeout(function(){
            Ybigh.show();
     
        },500);
        //Ybigh.next();
    },
    show: function () {
        var isMobile = $("#phone").html(),
            input = $('.word'),
            paths = [];

        let insideCL;
    
        Ybigh.$colors  = $('<canvas title="Once selections are made, click whitespace to submit current and load the next word" id="can" height="552" width="552"></canvas>');
        
        $('#container').append(Ybigh.$colors.fadeIn());
 
        Ybigh.colorctx = Ybigh.$colors[0].getContext('2d');

        var canvasOffset= getAbsoluteBoundingRect(Ybigh.$colors[0]),
            offsetX=canvasOffset.left,
            offsetY=canvasOffset.top;

        Ybigh.render(true);
        
        Ybigh.$colors
            .on('touchstart mouseup',function (e) {
                e.preventDefault();
               
                if(!Ybigh.current){
                    alert('Click a term on the right then make selection(s)');

                    return;
                }

                let touchEvent = (isMobile==="true" ? e.changedTouches[0] : e);
                
                let x = touchEvent.clientX,
                    y = touchEvent.clientY,
                    mouseX=parseInt(x-offsetX),
                    mouseY=parseInt(y-offsetY);

                var i=0;
                for(i=0; i<Ybigh.paths.length; i++){

                    insideCL=Ybigh.colorctx.isPointInPath(Ybigh.paths[i], mouseX,mouseY);

                    if(insideCL){
                        break
                    }
                } 
                if(insideCL){
                    
                        let new_color = Ybigh.get_color(touchEvent);

                        if(Ybigh.paths[i].objID == "world"){//done done done

                            let gradient = Ybigh.colorctx.createRadialGradient(585, 265, 150, 90, 190, 20);

                            gradient.addColorStop(0.15,    "#36454F");//0
                            gradient.addColorStop(0.29,    "#4f87ff");//2
                            gradient.addColorStop(0.51,    "white");//1

                            Ybigh.colorctx.beginPath()
                            Ybigh.colorctx.moveTo(550, 185);
                            Ybigh.colorctx.lineTo(370, 285);
                            Ybigh.colorctx.lineTo(370, 295);
                            Ybigh.colorctx.lineTo(550, 400);
                            Ybigh.colorctx.closePath();
                            Ybigh.colorctx.fillStyle = gradient;
                            Ybigh.colorctx.strokeStyle = "#D0D0D0"; 
                            Ybigh.colorctx.stroke();
                            Ybigh.colorctx.fill();

                            Ybigh.click_counter += 1;
                            new_color.name = Ybigh.current; //Ybigh.data[Ybigh.index-1];
                            new_color.category = 0x08;
                            Ybigh.blue = new_color;
                                
                            Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
                            Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-2, new_color.y-2, 4, 4);
                            Ybigh.counter_hash.push({count:Ybigh.click_counter, category: new_color.category});
                            
                        }else if(Ybigh.paths[i].objID == "others"){//done done done yay

                            let gradient = Ybigh.colorctx.createRadialGradient(220, 120, 150, 300, 220, 20);

                            gradient.addColorStop(0,     "#1f6b36"); 
                            gradient.addColorStop(0.49,  "#0fc14e");
                            gradient.addColorStop(1,     "white");                        
                            Ybigh.colorctx.beginPath();
                            Ybigh.colorctx.moveTo(175, 50);
                            Ybigh.colorctx.lineTo(287, 235);
                            Ybigh.colorctx.lineTo(297, 235);
                            Ybigh.colorctx.lineTo(400, 50);
                            Ybigh.colorctx.closePath();
                            Ybigh.colorctx.fillStyle = gradient;
                            Ybigh.colorctx.strokeStyle = "#D0D0D0"; 
                            Ybigh.colorctx.stroke();
                            Ybigh.colorctx.fill();

                            Ybigh.click_counter += 1;
                            new_color.name = Ybigh.current;
                            new_color.category = 0x02; //
                            Ybigh.green = new_color;

                            Ybigh.colorctx.beginPath();
                            Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
                            Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-2, new_color.y-2, 4, 4);
                            Ybigh.counter_hash.push({count:Ybigh.click_counter, category: new_color.category});
                          
                        }else if(Ybigh.paths[i].objID == "activities"){//done done done yay

                            let gradient = Ybigh.colorctx.createRadialGradient(105, 235, 160, 300, 310, 30);

                            gradient.addColorStop(0.1,    "#84342f");
                            gradient.addColorStop(0.25, "#ff5f57");
                            gradient.addColorStop(0.75,  "white");

                            Ybigh.colorctx.beginPath();
                            Ybigh.colorctx.moveTo(20, 185);
                            Ybigh.colorctx.lineTo(200, 285);
                            Ybigh.colorctx.lineTo(200, 295);
                            Ybigh.colorctx.lineTo(20, 400);
                            Ybigh.colorctx.closePath();
                            Ybigh.colorctx.fillStyle = gradient;
                            Ybigh.colorctx.strokeStyle = "#D0D0D0"; 
                            Ybigh.colorctx.stroke();
                            Ybigh.colorctx.fill();

                            Ybigh.click_counter += 1;
                            new_color.name = Ybigh.current;
                            new_color.category = 0x04;
                            Ybigh.red = new_color;

                            Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
                            Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-2, new_color.y-2, 4, 4);
                            Ybigh.counter_hash.push({count:Ybigh.click_counter, category: new_color.category});
                            //Ybigh.colorctx.fillText(mouseX+","+mouseY, mouseX-2, mouseY-2);
                            //console.log(new_color);
                        }else{ //done done

                            let gradient = Ybigh.colorctx.createRadialGradient(210, 450, 160, 290, 320, 30); //x,y,x,y

                            gradient.addColorStop(0,    "#66753d");
                            gradient.addColorStop(0.5, "#c5ff52");
                            gradient.addColorStop(1,  "white");

                            Ybigh.colorctx.beginPath();
                            Ybigh.colorctx.moveTo(175, 510);
                            Ybigh.colorctx.lineTo(285, 335);
                            Ybigh.colorctx.lineTo(295, 335);
                            Ybigh.colorctx.lineTo(400, 510);
                            Ybigh.colorctx.closePath();
                            Ybigh.colorctx.fillStyle = gradient;
                            Ybigh.colorctx.strokeStyle = "#D0D0D0"; 
                            Ybigh.colorctx.stroke();
                            Ybigh.colorctx.fill();

                            Ybigh.click_counter += 1;
                            new_color.name = Ybigh.current;
                            new_color.category = 0x01;
                            Ybigh.yellow = new_color;

                            Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
                            Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-2, new_color.y-2, 4, 4);
                            Ybigh.counter_hash.push({count:Ybigh.click_counter, category: new_color.category});
                            //Ybigh.colorctx.fillText(mouseX+","+mouseY, mouseX-2, mouseY-2);
                            //console.log(new_color);
                        }

                        $(".cl"+"."+Ybigh.paths[i].objID).css({'background-color': new_color.c});
                        
                        //.trigger('change').removeClass('color-picker-binded');
              }else{

                if(Ybigh.blue || Ybigh.red || Ybigh.green || Ybigh.yellow){

                        $("#word_list li").removeClass("active");

                        var Ind = parseInt($("#"+Ybigh.current).attr("data"));
                        var _this = $("#word_list").find("[data='"+Ind+"']")[0];
                        var added = Ind+1;
                        var next = $("#word_list").find("[data='"+added+"']")[0];


                       if(Ybigh.checkIfDone(next)){
                              
                            $(next).addClass("active");

                            Ybigh.next(next,_this);
                  
                            if(Ind > 18){
                                $('#word_list').scrollTo('+=35', 800);
                            }
                                
                        }else{

                            var bytwo = added+1;
                            var skipped= $("#word_list").find("[data='"+bytwo+"']")[0];
                            
                            $(skipped).addClass("active");

                            Ybigh.next(skipped,_this);
                  
                            if(bytwo > 18){
                                $('#word_list').scrollTo('+=35', 800);
                            }
                            
                        }
                            
                }
                
              }
            });
            Ybigh.$colors.on('mousemove',function (e) {
                e.preventDefault();
             
                let mouseX=parseInt(e.clientX-offsetX);
                let mouseY=parseInt(e.clientY-offsetY);
                for(var j=0; j<Ybigh.paths.length; j++){   

                    let inside=Ybigh.colorctx.isPointInPath(Ybigh.paths[j], mouseX,mouseY);
                    if(inside){
                        Ybigh.$colors.css('cursor','crosshair');
                    }
                }

            });

        /*$("body").mouseup(function () {
            //if (!Ybigh.mouse_is_inside) Ybigh.close();
        });*/
      
    },
    checkIfDone: function(next){

        if($(next).attr('class') === 'make-bold'){

            return false;
                                   
        }else{
            return true;
        }   
                
    },
    bind_inputs: function (userID) {
        //$('input[type="color-picker"]').not('.color-picker-binded').each(function () {
            $("#overlay").css("display","block");
         
            $.get("/Stage1/data", function(response){

                Ybigh.data = response.data;
                Ybigh.show();

                //$("#next").click(Ybigh.next);
                $("#clear").click(Ybigh.clear);
                $("#done").click(Ybigh.done);
                $("#removeSelections").click(Ybigh.submitCleared);
         
                
                var prev;
                var dataList = $('#word_list');
       
                $.each(Ybigh.data, function (index, val) {
                    var element = $("<li data=\"" +index+ "\" id=\"" + this +"\">" + this + "</li>")
                         .on('touchstart mouseup', function () { 
                                //TODO check for bold class and retireve previous state
                               $("#removeSelections").prop("disabled", true);
                               $("#word_list li").removeClass("active");
                               
                               if($(this).attr('class') === 'make-bold'){

                                    if(!Ybigh.blue && !Ybigh.green && !Ybigh.red && !Ybigh.yellow){

                                        $(this).addClass("active");
                                        Ybigh.getPreviousState(this);
                                        prev = this;
                                        return;

                                    }else{
                                        $(prev).addClass("active");
                                        alert("Clear or submit active symbol before viewing another symbol");
                                        return;
                                    }
                                    
                                   
                                }

                                Ybigh.current = $(this).html();
                                $(".word").val($(this).html().toUpperCase());
                                $(this).addClass("active");

                                if(Ybigh.blue || Ybigh.green || Ybigh.red || Ybigh.yellow){
                                    if(Ybigh.current !== $(prev).html()){
                                        Ybigh.next(this, prev);
                                    }
                                }
                                
                                //$(prev).removeClass("active");
                                
                                prev = this;
                             
                            });
                    dataList.append(element);
                });

                $("#overlay").css("display","none");

            });
        
        //}).addClass('color-picker-binded');
    },
    next: function(cur, prev){

        $(".cl.world").css({'background-color':'white'});
        $(".cl.others").css({'background-color':'white'});
        $(".cl.activities").css({'background-color':'white'});
        $(".cl.himself").css({'background-color':'white'});
        //$("#block").remove();

        Ybigh.close();

        //Ybigh.saveSelection = Object.values(Ybigh.saveSelection.reduce((c, v) => Object.assign(c, {[v.category]: v}), {}));
        let result = Ybigh.counter_hash.filter(function(value, index, self){
            return self.findIndex(function(innerValue){
                return innerValue.category == value.category}) === index;
            }).map(function(item){
                return { 
                    count: Ybigh.counter_hash.filter(function(innerItem){
                    return innerItem.category == item.category
                    }).reduce(function(min, item){
                    return (item.count < min) ? item.count : min; }).count, 
                    category: item.category
                };
            });

        for(var i=0; i<result.length;i++){

            if(Ybigh.yellow && Ybigh.yellow.category === result[i].category){//0x01
                Ybigh.yellow.clicked = result[i].count;
                Ybigh.saveSelection.push(Ybigh.yellow);
            }

            if(Ybigh.green && Ybigh.green.category === result[i].category){//0x02
                Ybigh.green.clicked = result[i].count;
                Ybigh.saveSelection.push(Ybigh.green);
            }

            if(Ybigh.red && Ybigh.red.category === result[i].category){//0x04
                Ybigh.red.clicked = result[i].count;
                Ybigh.saveSelection.push(Ybigh.red);
            }

            if(Ybigh.blue && Ybigh.blue.category === result[i].category){//0x08
                Ybigh.blue.clicked = result[i].count;
                Ybigh.saveSelection.push(Ybigh.blue);
            }
            
        }

        Ybigh.saveSelection.sort(function(a, b) {
            return (a.count - b.count);
        });

        Ybigh.submit(Ybigh.saveSelection, cur, prev);

        Ybigh.saveSelection.length = 0;
        Ybigh.blue = null;
        Ybigh.green = null;
        Ybigh.red = null;
        Ybigh.yellow = null;
     
    },
    getPreviousState: function(t){
        var name = $(t).html()
        var state = [
                    {"c":"#81dea2","x":329,"y":92,"percentx":59.49367088607595,"percenty":16.636528028933093,"name":name,"category":2,"clicked":1},
                    {"c":"#cadbff","x":451,"y":278,"percentx":81.55515370705244,"percenty":50.27124773960217,"name":name,"category":8,"clicked":2},
                    {"c":"#ffe3e2","x":156,"y":283,"percentx":28.20976491862568,"percenty":51.17540687160941,"name":name,"category":4,"clicked":3},
                    {"c":"#e0ffa2","x":266,"y":489,"percentx":48.10126582278481,"percenty":88.42676311030742,"name":name,"category":1,"clicked":4}
        ]
        

        for(var i=0; i<state.length; i++){

            Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
            Ybigh.colorctx.fillStyle = "#000000";  
            Ybigh.colorctx.fillRect(state[i].x-2, state[i].y-2, 4, 4);

            switch(state[i].category){
                case 1:
                    $(".cl.himself").css({'background-color': state[i].c});
                    Ybigh.yellow  = state[i];
                    Ybigh.counter_hash.push({count:state[i].click, category: state[i].category});
                    break;
                case 2:
                    $(".cl.others").css({'background-color': state[i].c});
                    Ybigh.green  = state[i];
                    Ybigh.counter_hash.push({count:state[i].click, category: state[i].category});
                    break;
                case 4:
                    $(".cl.activities").css({'background-color': state[i].c});
                    Ybigh.red  = state[i];
                    Ybigh.counter_hash.push({count:state[i].click, category: state[i].category});
                    break;
                case 8:
                    $(".cl.world").css({'background-color': state[i].c});
                    Ybigh.blue  = state[i];
                    Ybigh.counter_hash.push({count:state[i].click, category: state[i].category});
                    break;
            }
            
        }

        Ybigh.current = name;
        $(".word").val(name.toUpperCase());
    },
    done: function(e){
        if(!!Ybigh.yellow || !!Ybigh.blue || !!Ybigh.red || !!Ybigh.green){
            Ybigh.next();
        }
        window.location.href='/Stage2';    
    },
    submit: function(obj, cur, prev){
         $("#overlay").css("display","block");

        $.ajax({
            type: "POST",
            url: "/symbol",
            data: JSON.stringify(obj),
            error: function(jqXHR, textStatus, errorThrown){
                $("#overlay").css("display","none");
            },
            success: function(res){
                
                obj.length = 0;
                Ybigh.counter += 1;

                if(!!cur && !!prev){

                    Ybigh.current = $(cur).html();
                    $(".word").val($(cur).html().toUpperCase());
                    $(prev).addClass('make-bold');
                }else{
                    $(prev).addClass('make-bold');
                }
                if(Ybigh.counter > 3){
                    $("#done").prop("disabled", false).removeClass("dis");
                }
                 $("#overlay").css("display","none");
            }
        });
        
    },
    close: function () {
        Ybigh.$colors.fadeOut(Ybigh.$colors.remove);
        Ybigh.startCounter();

    },
    get_color: function (e) {

        var pos_x = e.pageX - Ybigh.$colors.offset().left;
        var pos_y = e.pageY - Ybigh.$colors.offset().top;
        var data = Ybigh.colorctx.getImageData(pos_x, pos_y, 1, 1).data;

        var percentX = (pos_x / $('#can').width()) * 100;
        var percentY = (pos_y / $('#can').height()) * 100;
    
        return {
            c: '#' + Ybigh.to_hex(data[0]) + Ybigh.to_hex(data[1]) + Ybigh.to_hex(data[2]),
            x: pos_x,
            y: pos_y,
            percentx: percentX,
            percenty: percentY
        }
    },
   
  // Build Color palette

  /*
        sy: -300,
                    fy: 380,
                    sx: 270,
                    fx: 290,
  */
    render: function (renderFont) {
        var colors = [
                {   
                    nameID: "others",
                    col1: "white", //green
                    col2: "#0fc14e",
                    col0: "#1f6b36",//  014421
                    x: 175,//190
                    y: 50,
                    xlt:287,//225
                    ylt:235,//
                    xlt1:297,//350
                    ylt1:235,//
                    xlt2:400,//390
                    ylt2:50,//
                    sy: 120,
                    fy: 220,
                    sx: 220,
                    fx: 300,
                    stop1:0,
                    stop2:0.49,
                    stop3:1,
                    r1:150,
                    r2:20,
                    labelX: 185,
                    labelY: 35,
                    label: "Man\'s Connections with Other than Himself"
                },
                {
                    nameID: "activities",
                    col1: "white", //red 
                    col2: "#ff5f57",
                    col0: "#84342f",
                    x: 20,//20
                    y: 185,//
                    xlt:200,//200
                    ylt:285,//narrow
                    xlt1:200,//200
                    ylt1:295,//chg
                    xlt2:20,//20
                    ylt2:400,//narrow
                    sy:235,
                    fy:310,
                    sx: 105,
                    fx: 300,
                    stop1:0.1,
                    stop2:0.25,
                    stop3:0.75,
                    r1:160,
                    r2:30,
                    labelX: 20,
                    labelY: 170,
                    label: "Man\'s Physical Activities"
                },
                {
                    nameID: "world",
                    col1: "white", //blue
                    col2: "#4f87ff",
                    col0: "#36454F",
                    x: 550,//550
                    y: 185,//
                    xlt:370,//370
                    ylt:285,//chg
                    xlt1:370,//370
                    ylt1:295,//chg
                    xlt2:550,//550
                    ylt2:400,//
                    sy:265,  //x0, y0, x1, y1
                    fy:190,
                    sx: 585,
                    fx: 90,
                    stop1:0.15,
                    stop2:0.29,
                    stop3:0.51,
                    r1:150,
                    r2:20,
                    labelX: 405,
                    labelY: 170,
                    label: "Man\'s View of the World"
                },
                {
                    nameID: "himself",
                    col1: "white", //yellow done
                    col2: "#c5ff52",
                    col0: "#66753d", //938200  86942A
                    x: 175,//190
                    y: 510,
                    xlt:285,//225
                    ylt:335,
                    xlt1:295,//350
                    ylt1:335,
                    xlt2:400,//390
                    ylt2:510,
                    sy: 450,
                    fy: 320,
                    sx: 210,
                    fx: 290,
                    stop1:0,
                    stop2:0.5,
                    stop3:1,
                    r1:160,
                    r2:30,
                    labelX: 220,
                    labelY: 540,
                    label: "Man\'s View of Himself"
                }
        ];
  

        Path2D.prototype.getID = function(id){
            this.objID = id;
        }

       var gradient;
        //Ybigh.colorctx.translate(Ybigh.$colors.width()/2, Ybigh.$colors.height()/2);
       for(var i=0; i<colors.length; i++){

            gradient = Ybigh.colorctx.createRadialGradient(colors[i].sx, colors[i].sy, colors[i].r1, colors[i].fx, colors[i].fy, colors[i].r2);
            gradient.addColorStop(colors[i].stop1,    colors[i].col0);
            gradient.addColorStop(colors[i].stop2,    colors[i].col2);
            gradient.addColorStop(colors[i].stop3,    colors[i].col1);

            var path1 = new Path2D();

            path1.moveTo(colors[i].x, colors[i].y);
            path1.lineTo(colors[i].xlt, colors[i].ylt);
            path1.lineTo(colors[i].xlt1, colors[i].ylt1);
            path1.lineTo(colors[i].xlt2, colors[i].ylt2);
            path1.closePath();
            path1.getID(colors[i].nameID);

            Ybigh.colorctx.fillStyle = gradient;
            Ybigh.colorctx.strokeStyle = "#D0D0D0"; 
            Ybigh.colorctx.stroke(path1);
            Ybigh.colorctx.fill(path1);

            if(renderFont){
                Ybigh.paths.push(path1);
                Ybigh.colorctx.strokeStyle = "black";
                Ybigh.colorctx.font="11px verdana";
                Ybigh.colorctx.strokeText(colors[i].label, colors[i].labelX, colors[i].labelY);
             
            }
            

       } 
        
    }
};
Ybigh.bind_inputs();


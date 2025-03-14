Ybigh = {
  counter: 0,
  timeoutHandle: "",
  paths: [],
  current: "",
  saveSelection: [],
  counter_hash: [],
  click_counter: 0,
  blue: null,
  green: null,
  red: null,
  yellow: null,
  data: null,
  rectPosition: null,
  hasclicked: false,
  copylength: 0,
  symbol: false,
  clickwhite: false,

  to_hex: function (dec) {
    hex = dec.toString(16);
    return hex.length == 2 ? hex : "0" + hex;
  },
  clear: function () {
    Ybigh.$colors.fadeOut(Ybigh.$colors.remove);

    Ybigh.timeoutHandle = window.setTimeout(function () {
      if ($("#" + Ybigh.current).attr("class") === "make-bold active") {
        $("#removeSelections").prop("disabled", false);
      }

      Ybigh.show();
      $(".cl.world").css({ "background-color": "white" });
      $(".cl.others").css({ "background-color": "white" });
      $(".cl.activities").css({ "background-color": "white" });
      $(".cl.himself").css({ "background-color": "white" });

      Ybigh.blue = null;
      Ybigh.green = null;
      Ybigh.red = null;
      Ybigh.yellow = null;
    }, 500);
  },
  submitCleared: function () {
    $("#overlay").css("display", "block");
    var obj = { name: Ybigh.current, wordID: 123 };

    $.ajax({
      type: "POST",
      url: "/symbol",
      data: JSON.stringify(obj),
      error: function (jqXHR, textStatus, errorThrown) {
        $("#overlay").css("display", "none");
      },
      success: function (res, textStatus) {
        if (res) {
          $("#" + Ybigh.current).removeClass("make-bold");
          $("#removeSelections").prop("disabled", true);

          if (Ybigh.counter > 3) {
            $("#done").prop("disabled", false).removeClass("dis");
          }
        } else {
          window.location.href = "/n-signup";
        }

        $("#overlay").css("display", "none");
      },
    });
  },
  startCounter: function () {
    Ybigh.timeoutHandle = window.setTimeout(function () {
      Ybigh.show();
    }, 500);
    //Ybigh.next();
  },
  show: function () {
    var isMobile = $("#phone").html(),
      input = $(".word"),
      paths = [];

    let insideCL;

    Ybigh.$colors = $('<canvas id="can" height="552" width="552"></canvas>');

    $("#container").append(Ybigh.$colors.fadeIn());

    Ybigh.colorctx = Ybigh.$colors[0].getContext("2d");

    var canvasOffset = getAbsoluteBoundingRect(Ybigh.$colors[0]),
      offsetX = canvasOffset.left,
      offsetY = canvasOffset.top;

    Ybigh.render(true);

    Ybigh.$colors.on("touchstart mousedown", function (e) {
      e.preventDefault();

      if (!Ybigh.current) {
        alert("Click a term on the right then make selection(s)");

        return;
      }

      let touchEvent = isMobile === "true" ? e.changedTouches[0] : e;

      let x = touchEvent.clientX,
        y = touchEvent.clientY,
        mouseX = parseInt(x - offsetX),
        mouseY = parseInt(y - offsetY);

      var i = 0;
      for (i = 0; i < Ybigh.paths.length; i++) {
        insideCL = Ybigh.colorctx.isPointInPath(Ybigh.paths[i], mouseX, mouseY);

        if (insideCL) {
          break;
        }
      }
      if (insideCL) {
        console.log(this);
        $(this).css("cursor", "crosshair");
        let new_color = Ybigh.get_color(touchEvent);
        Ybigh.hasclicked = true;

        if (Ybigh.paths[i].objID == "world") {
          //done done done

          let gradient = Ybigh.colorctx.createRadialGradient(
            585,
            265,
            150,
            90,
            190,
            20
          );
          //done
          gradient.addColorStop(0.15, "#36454F"); //0
          gradient.addColorStop(0.29, "#4f87ff"); //2
          gradient.addColorStop(0.51, "white"); //1

          Ybigh.colorctx.beginPath();
          Ybigh.colorctx.moveTo(550, 175);
          Ybigh.colorctx.lineTo(365, 289);
          Ybigh.colorctx.lineTo(365, 289);
          Ybigh.colorctx.lineTo(550, 401);
          Ybigh.colorctx.closePath();
          Ybigh.colorctx.fillStyle = gradient;
          Ybigh.colorctx.strokeStyle = "#b0aaa6";
          Ybigh.colorctx.stroke();
          Ybigh.colorctx.fill();

          Ybigh.click_counter += 1;
          new_color.name = Ybigh.current; //Ybigh.data[Ybigh.index-1];
          new_color.category = 0x08;
          Ybigh.blue = new_color;

          //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
          /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-5, new_color.y-5, 3, 3);*/
          Ybigh.rectPosition = { x: new_color.x, y: new_color.y };
          Ybigh.counter_hash.push({
            count: Ybigh.click_counter,
            category: new_color.category,
          });
        } else if (Ybigh.paths[i].objID == "others") {
          //done done done yay
          //done
          let gradient = Ybigh.colorctx.createRadialGradient(
            220,
            140,
            150,
            300,
            240,
            20
          );

          gradient.addColorStop(0, "#1f6b36");
          gradient.addColorStop(0.4, "#0fc14e");
          gradient.addColorStop(1, "white");
          Ybigh.colorctx.beginPath();
          Ybigh.colorctx.moveTo(175, 50);
          Ybigh.colorctx.lineTo(288, 235);
          Ybigh.colorctx.lineTo(288, 235);
          Ybigh.colorctx.lineTo(401, 50);
          Ybigh.colorctx.closePath();
          Ybigh.colorctx.fillStyle = gradient;
          Ybigh.colorctx.strokeStyle = "#b0aaa6";
          Ybigh.colorctx.stroke();
          Ybigh.colorctx.fill();

          Ybigh.click_counter += 1;
          new_color.name = Ybigh.current;
          new_color.category = 0x02; //
          Ybigh.green = new_color;

          //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
          /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-5, new_color.y-5, 3, 3);*/
          Ybigh.rectPosition = { x: new_color.x, y: new_color.y };
          Ybigh.counter_hash.push({
            count: Ybigh.click_counter,
            category: new_color.category,
          });
        } else if (Ybigh.paths[i].objID == "activities") {
          //done done done yay

          let gradient = Ybigh.colorctx.createRadialGradient(
            135,
            330,
            160,
            200,
            290,
            30
          );
          //done
          gradient.addColorStop(0, "#84342f");
          gradient.addColorStop(0.25, "#ff5f57");
          gradient.addColorStop(1, "white");

          Ybigh.colorctx.beginPath();
          Ybigh.colorctx.moveTo(15, 175);
          Ybigh.colorctx.lineTo(200, 289);
          Ybigh.colorctx.lineTo(200, 289);
          Ybigh.colorctx.lineTo(15, 401);
          Ybigh.colorctx.closePath();
          Ybigh.colorctx.fillStyle = gradient;
          Ybigh.colorctx.strokeStyle = "#b0aaa6";
          Ybigh.colorctx.stroke();
          Ybigh.colorctx.fill();

          Ybigh.click_counter += 1;
          new_color.name = Ybigh.current;
          new_color.category = 0x04;
          Ybigh.red = new_color;

          //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
          /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-5, new_color.y-5, 3, 3);*/
          Ybigh.rectPosition = { x: new_color.x, y: new_color.y };
          Ybigh.counter_hash.push({
            count: Ybigh.click_counter,
            category: new_color.category,
          });
        } else {
          //done done

          let gradient = Ybigh.colorctx.createRadialGradient(
            310,
            525,
            150,
            370,
            230,
            20
          ); //x,y,x,y

          gradient.addColorStop(0.157, "#8c7d38");
          gradient.addColorStop(0.4, "#ffe539");
          gradient.addColorStop(0.685, "white");

          Ybigh.colorctx.beginPath();
          Ybigh.colorctx.moveTo(175, 515);
          Ybigh.colorctx.lineTo(288, 330);
          Ybigh.colorctx.lineTo(288, 330);
          Ybigh.colorctx.lineTo(401, 515);
          Ybigh.colorctx.closePath();
          Ybigh.colorctx.fillStyle = gradient;
          Ybigh.colorctx.strokeStyle = "#b0aaa6";
          Ybigh.colorctx.stroke();
          Ybigh.colorctx.fill();

          Ybigh.click_counter += 1;
          new_color.name = Ybigh.current;
          new_color.category = 0x01;
          Ybigh.yellow = new_color;

          //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
          /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(new_color.x-5, new_color.y-5, 3, 3);*/
          Ybigh.rectPosition = { x: new_color.x, y: new_color.y };
          Ybigh.counter_hash.push({
            count: Ybigh.click_counter,
            category: new_color.category,
          });
        }

        $(".cl" + "." + Ybigh.paths[i].objID).css({
          "background-color": new_color.c,
        });

        //.trigger('change').removeClass('color-picker-binded');
      } else {
        Ybigh.clickwhite = true;

        if (Ybigh.blue || Ybigh.red || Ybigh.green || Ybigh.yellow) {
          let Ind = parseInt($("#" + Ybigh.current).attr("data")),
            _this = $("#word_list").find("[data='" + Ind + "']")[0],
            added = Ind + 1,
            next = $("#word_list").find("[data='" + added + "']")[0],
            hasClassNext = $("#word_list").find("[data='" + added + "']");

          if (!Ybigh.symbol && !hasClassNext.hasClass("make-bold")) {
            $("#word_list li").removeClass("active");

            $(next).addClass("active");

            Ybigh.next(next, _this);

            if (Ind > 18) {
              $("#word_list").scrollTo("+=35", 800);
            }
          }
        }
      }
    });

    Ybigh.$colors.on("touchmove mousemove", function (evt) {
      evt.preventDefault();
      var move_color,
        insideCL,
        i = 0;

      if (Ybigh.hasclicked) {
        let te = isMobile === "true" ? evt.changedTouches[0] : evt;
        let mouseX = parseInt(evt.clientX - offsetX);
        let mouseY = parseInt(evt.clientY - offsetY);
        move_color = Ybigh.get_color(te);

        for (i = 0; i < Ybigh.paths.length; i++) {
          insideCL = Ybigh.colorctx.isPointInPath(
            Ybigh.paths[i],
            mouseX,
            mouseY
          );

          if (insideCL) {
            break;
          }
        }

        if (insideCL) {
          //$(this).css("cursor","crosshair");
          if (Ybigh.paths[i].objID == "world") {
            //done done done

            let gradient = Ybigh.colorctx.createRadialGradient(
              585,
              265,
              150,
              90,
              190,
              20
            );

            gradient.addColorStop(0.15, "#36454F"); //0
            gradient.addColorStop(0.29, "#4f87ff"); //2
            gradient.addColorStop(0.51, "white"); //1

            Ybigh.colorctx.beginPath();
            Ybigh.colorctx.moveTo(550, 175);
            Ybigh.colorctx.lineTo(365, 289);
            Ybigh.colorctx.lineTo(365, 289);
            Ybigh.colorctx.lineTo(550, 401);
            Ybigh.colorctx.closePath();
            Ybigh.colorctx.fillStyle = gradient;
            Ybigh.colorctx.strokeStyle = "#b0aaa6";
            Ybigh.colorctx.stroke();
            Ybigh.colorctx.fill();

            Ybigh.click_counter += 1;
            move_color.name = Ybigh.current; //Ybigh.data[Ybigh.index-1];
            move_color.category = 0x08;
            Ybigh.blue = move_color;

            //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
            /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(move_color.x-5, move_color.y-5, 3, 3);*/
            Ybigh.rectPosition = { x: move_color.x, y: move_color.y };
            Ybigh.counter_hash.push({
              count: Ybigh.click_counter,
              category: move_color.category,
            });
          } else if (Ybigh.paths[i].objID == "others") {
            //done done done yay

            let gradient = Ybigh.colorctx.createRadialGradient(
              220,
              140,
              150,
              300,
              240,
              20
            );

            gradient.addColorStop(0, "#1f6b36");
            gradient.addColorStop(0.4, "#0fc14e");
            gradient.addColorStop(1, "white");
            Ybigh.colorctx.beginPath();
            Ybigh.colorctx.moveTo(175, 50);
            Ybigh.colorctx.lineTo(288, 235);
            Ybigh.colorctx.lineTo(288, 235);
            Ybigh.colorctx.lineTo(401, 50);
            Ybigh.colorctx.closePath();
            Ybigh.colorctx.fillStyle = gradient;
            Ybigh.colorctx.strokeStyle = "#b0aaa6";
            Ybigh.colorctx.stroke();
            Ybigh.colorctx.fill();

            Ybigh.click_counter += 1;
            move_color.name = Ybigh.current;
            move_color.category = 0x02; //
            Ybigh.green = move_color;

            //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
            /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(move_color.x-5, move_color.y-5, 3, 3);*/
            Ybigh.rectPosition = { x: move_color.x, y: move_color.y };
            Ybigh.counter_hash.push({
              count: Ybigh.click_counter,
              category: move_color.category,
            });
          } else if (Ybigh.paths[i].objID == "activities") {
            //done done done yay

            let gradient = Ybigh.colorctx.createRadialGradient(
              135,
              330,
              160,
              200,
              290,
              30
            );

            gradient.addColorStop(0, "#84342f");
            gradient.addColorStop(0.25, "#ff5f57");
            gradient.addColorStop(1, "white");

            Ybigh.colorctx.beginPath();
            Ybigh.colorctx.moveTo(15, 175);
            Ybigh.colorctx.lineTo(200, 289);
            Ybigh.colorctx.lineTo(200, 289);
            Ybigh.colorctx.lineTo(15, 401);
            Ybigh.colorctx.closePath();
            Ybigh.colorctx.fillStyle = gradient;
            Ybigh.colorctx.strokeStyle = "#b0aaa6";
            Ybigh.colorctx.stroke();
            Ybigh.colorctx.fill();

            Ybigh.click_counter += 1;
            move_color.name = Ybigh.current;
            move_color.category = 0x04;
            Ybigh.red = move_color;

            //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
            /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(move_color.x-5, move_color.y-5, 3, 3);*/
            Ybigh.rectPosition = { x: move_color.x, y: move_color.y };
            Ybigh.counter_hash.push({
              count: Ybigh.click_counter,
              category: move_color.category,
            });
          } else {
            //done done

            let gradient = Ybigh.colorctx.createRadialGradient(
              310,
              525,
              150,
              370,
              230,
              20
            ); //x,y,x,y

            gradient.addColorStop(0.157, "#8c7d38");
            gradient.addColorStop(0.4, "#ffe539");
            gradient.addColorStop(0.685, "white");

            Ybigh.colorctx.beginPath();
            Ybigh.colorctx.moveTo(175, 515);
            Ybigh.colorctx.lineTo(288, 330);
            Ybigh.colorctx.lineTo(288, 330);
            Ybigh.colorctx.lineTo(401, 515);
            Ybigh.colorctx.closePath();
            Ybigh.colorctx.fillStyle = gradient;
            Ybigh.colorctx.strokeStyle = "#b0aaa6";
            Ybigh.colorctx.stroke();
            Ybigh.colorctx.fill();

            Ybigh.click_counter += 1;
            move_color.name = Ybigh.current;
            move_color.category = 0x01;
            Ybigh.yellow = move_color;

            //Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
            /*Ybigh.colorctx.fillStyle = "#000000";  
                            Ybigh.colorctx.fillRect(move_color.x-5, move_color.y-5, 3, 3);*/
            Ybigh.rectPosition = { x: move_color.x, y: move_color.y };
            Ybigh.counter_hash.push({
              count: Ybigh.click_counter,
              category: move_color.category,
            });
          }

          $(".cl" + "." + Ybigh.paths[i].objID).css({
            "background-color": move_color.c,
          });
        } else {
          $(this).css("cursor", "default");
          Ybigh.hasclicked = false;
        }
      }
    });

    Ybigh.$colors.on("mouseup", function () {
      $(this).css("cursor", "default");
      Ybigh.hasclicked = false;

      if (!Ybigh.clickwhite) {
        Ybigh.colorctx.fillStyle = "#000000";
        Ybigh.colorctx.fillRect(
          Ybigh.rectPosition.x,
          Ybigh.rectPosition.y,
          3,
          3
        );
      }

      Ybigh.clickwhite = false;
    });
  },

  bind_inputs: function (userID) {
    //$('input[type="color-picker"]').not('.color-picker-binded').each(function () {
    $("#overlay").css("display", "block");
    $.ajaxSetup({
      headers: { "Node-server": "0" },
    });
    $.get("/stage1/data", function (response) {
      Ybigh.data = response.data;
      Ybigh.show();

      //$("#next").click(Ybigh.next);
      $("#clear").click(Ybigh.clear);
      $("#done").click(Ybigh.done);
      $("#removeSelections").click(Ybigh.submitCleared);
      //TODO this must display the actual done which is different from the total array
      Ybigh.copylength = Ybigh.data.length;
      $("#done").val(Ybigh.data.length + " of " + Ybigh.data.length);
      var prev;
      var dataList = $("#word_list");

      $.each(Ybigh.data, function (index, val) {
        var element = $(
          '<li data="' + index + '" id="' + this + '">' + this + "</li>"
        ).on("touchstart mouseup", function () {
          //TODO check for bold class and retireve previous state
          $("#removeSelections").prop("disabled", true);
          $("#word_list li").removeClass("active");

          if ($(this).attr("class") === "make-bold") {
            if (!Ybigh.blue && !Ybigh.green && !Ybigh.red && !Ybigh.yellow) {
              $(this).addClass("active");
              Ybigh.getPreviousState(this);
              prev = this;
              return;
            } else {
              $(prev).addClass("active");
              alert(
                "Clear or submit active symbol before viewing another symbol"
              );
              return;
            }
          }

          Ybigh.current = $(this).html();
          $(".word").val($(this).html().toUpperCase());
          $(this).addClass("active");

          if (Ybigh.blue || Ybigh.green || Ybigh.red || Ybigh.yellow) {
            if (Ybigh.current !== $(prev).html()) {
              Ybigh.next(this, prev);
            }
          }

          //$(prev).removeClass("active");

          prev = this;
        });
        dataList.append(element);
      });

      $("#overlay").css("display", "none");
    });

    //}).addClass('color-picker-binded');
  },
  next: function (cur, prev) {
    $(".cl.world").css({ "background-color": "white" });
    $(".cl.others").css({ "background-color": "white" });
    $(".cl.activities").css({ "background-color": "white" });
    $(".cl.himself").css({ "background-color": "white" });
    //$("#block").remove();

    Ybigh.close();

    //Ybigh.saveSelection = Object.values(Ybigh.saveSelection.reduce((c, v) => Object.assign(c, {[v.category]: v}), {}));
    let result = Ybigh.counter_hash
      .filter(function (value, index, self) {
        return (
          self.findIndex(function (innerValue) {
            return innerValue.category == value.category;
          }) === index
        );
      })
      .map(function (item) {
        return {
          count: Ybigh.counter_hash
            .filter(function (innerItem) {
              return innerItem.category == item.category;
            })
            .reduce(function (min, item) {
              return item.count < min ? item.count : min;
            }).count,
          category: item.category,
        };
      });

    for (var i = 0; i < result.length; i++) {
      if (Ybigh.yellow && Ybigh.yellow.category === result[i].category) {
        //0x01
        Ybigh.yellow.clicked = result[i].count;
        Ybigh.saveSelection.push(Ybigh.yellow);
      }

      if (Ybigh.green && Ybigh.green.category === result[i].category) {
        //0x02
        Ybigh.green.clicked = result[i].count;
        Ybigh.saveSelection.push(Ybigh.green);
      }

      if (Ybigh.red && Ybigh.red.category === result[i].category) {
        //0x04
        Ybigh.red.clicked = result[i].count;
        Ybigh.saveSelection.push(Ybigh.red);
      }

      if (Ybigh.blue && Ybigh.blue.category === result[i].category) {
        //0x08
        Ybigh.blue.clicked = result[i].count;
        Ybigh.saveSelection.push(Ybigh.blue);
      }
    }

    Ybigh.saveSelection.sort(function (a, b) {
      return a.count - b.count;
    });

    Ybigh.submit(Ybigh.saveSelection, cur, prev);

    Ybigh.saveSelection.length = 0;
    Ybigh.blue = null;
    Ybigh.green = null;
    Ybigh.red = null;
    Ybigh.yellow = null;
  },
  getPreviousState: function (t) {
    var name = $(t).html();
    var state = [
      {
        c: "#81dea2",
        x: 329,
        y: 92,
        percentx: 59.49367088607595,
        percenty: 16.636528028933093,
        name: name,
        category: 2,
        clicked: 1,
      },
      {
        c: "#cadbff",
        x: 451,
        y: 278,
        percentx: 81.55515370705244,
        percenty: 50.27124773960217,
        name: name,
        category: 8,
        clicked: 2,
      },
      {
        c: "#ffe3e2",
        x: 156,
        y: 283,
        percentx: 28.20976491862568,
        percenty: 51.17540687160941,
        name: name,
        category: 4,
        clicked: 3,
      },
      {
        c: "#e0ffa2",
        x: 266,
        y: 489,
        percentx: 48.10126582278481,
        percenty: 88.42676311030742,
        name: name,
        category: 1,
        clicked: 4,
      },
    ];

    for (var i = 0; i < state.length; i++) {
      Ybigh.colorctx.setTransform(1, 0, 0, 1, 0, 0);
      Ybigh.colorctx.fillStyle = "#000000";
      Ybigh.colorctx.fillRect(state[i].x - 2, state[i].y - 2, 4, 4);

      switch (state[i].category) {
        case 1:
          $(".cl.himself").css({ "background-color": state[i].c });
          Ybigh.yellow = state[i];
          Ybigh.counter_hash.push({
            count: state[i].click,
            category: state[i].category,
          });
          break;
        case 2:
          $(".cl.others").css({ "background-color": state[i].c });
          Ybigh.green = state[i];
          Ybigh.counter_hash.push({
            count: state[i].click,
            category: state[i].category,
          });
          break;
        case 4:
          $(".cl.activities").css({ "background-color": state[i].c });
          Ybigh.red = state[i];
          Ybigh.counter_hash.push({
            count: state[i].click,
            category: state[i].category,
          });
          break;
        case 8:
          $(".cl.world").css({ "background-color": state[i].c });
          Ybigh.blue = state[i];
          Ybigh.counter_hash.push({
            count: state[i].click,
            category: state[i].category,
          });
          break;
      }
    }
    Ybigh.symbol = true;
    Ybigh.current = name;
    $(".word").val(name.toUpperCase());
  },
  done: function (e) {
    if (!!Ybigh.yellow || !!Ybigh.blue || !!Ybigh.red || !!Ybigh.green) {
      Ybigh.next();
    }
    window.location.href = "/n-stage2";
  },
  submit: function (obj, cur, prev) {
    $("#overlay").css("display", "block");

    $.ajax({
      type: "POST",
      url: "/symbol",
      data: JSON.stringify(obj),
      error: function (jqXHR, textStatus, errorThrown) {
        $("#overlay").css("display", "none");
      },
      success: function (res) {
        if (res) {
          obj.length = 0;
          Ybigh.counter += 1;

          if (!!cur && !!prev) {
            Ybigh.current = $(cur).html();
            $(".word").val($(cur).html().toUpperCase());
            $(prev).addClass("make-bold");
          } else {
            $(prev).addClass("make-bold");
          }
          if (Ybigh.counter > 3) {
            $("#done").prop("disabled", false).removeClass("dis");
          }

          if (!Ybigh.symbol) {
            Ybigh.copylength -= 1;
          }
          Ybigh.symbol = false;
          $("#done").val(Ybigh.copylength + " of " + Ybigh.data.length);
        } else {
          window.location.href = "/n-signup";
        }
        $("#overlay").css("display", "none");
        if (Ybigh.counter === 1) {
          $("#reminder").modal();
        }
      },
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

    var percentX = (pos_x / $("#can").width()) * 100;
    var percentY = (pos_y / $("#can").height()) * 100;

    return {
      c:
        "#" +
        Ybigh.to_hex(data[0]) +
        Ybigh.to_hex(data[1]) +
        Ybigh.to_hex(data[2]),
      x: pos_x,
      y: pos_y,
      percentx: percentX,
      percenty: percentY,
    };
  },

  // Build Color palette

  render: function (renderFont) {
    var colors = [
      {
        nameID: "others",
        col1: "white", //green
        col2: "#0fc14e",
        col0: "#1f6b36", //  014421
        x: 175, //190
        y: 50,
        xlt: 288, //225
        ylt: 235, //
        xlt1: 288, //350
        ylt1: 235, //
        xlt2: 401, //390
        ylt2: 50, //
        sy: 140,
        fy: 240,
        sx: 220,
        fx: 300,
        stop1: 0,
        stop2: 0.4,
        stop3: 1,
        r1: 150,
        r2: 20,
        labelX: 185,
        labelY: 35,
        label: "Man's Connections with Other than himself",
      },
      {
        nameID: "activities", //YAY
        col1: "white", //red
        col2: "#ff5f57",
        col0: "#84342f",
        x: 15, //20
        y: 175, //
        xlt: 200, //200
        ylt: 289, //narrow
        xlt1: 200, //200
        ylt1: 289, //chg
        xlt2: 15, //20
        ylt2: 401, //narrow
        sy: 330,
        fy: 290,
        sx: 135,
        fx: 200,
        stop1: 0,
        stop2: 0.25,
        stop3: 1,
        r1: 160,
        r2: 30,
        labelX: 20,
        labelY: 170,
        label: "Man's Physical Activities",
      },
      {
        nameID: "world",
        col1: "white", //blue
        col2: "#4f87ff",
        col0: "#36454F",
        x: 550, //550
        y: 175, //
        xlt: 365, //370
        ylt: 289, //chg
        xlt1: 365, //370
        ylt1: 289, //chg
        xlt2: 550, //550
        ylt2: 401, //
        sy: 265, //x0, y0, x1, y1
        fy: 190,
        sx: 585,
        fx: 90,
        stop1: 0.15,
        stop2: 0.29,
        stop3: 0.51,
        r1: 150,
        r2: 20,
        labelX: 405,
        labelY: 170,
        label: "Man's View of the World",
      },
      {
        nameID: "himself",
        col1: "white", //yellow done
        col2: "#ffe539", //  c5ff52
        col0: "#8c7d38", //938200  86942A
        x: 175, //190
        y: 515,
        xlt: 288, //225
        ylt: 330,
        xlt1: 288, //350
        ylt1: 330,
        xlt2: 401, //390
        ylt2: 515,
        sy: 525,
        fy: 230,
        sx: 310,
        fx: 370,
        stop1: 0.157,
        stop2: 0.4,
        stop3: 0.685,
        r1: 150,
        r2: 20,
        labelX: 220,
        labelY: 540,
        label: "Man's View of Himself",
      },
    ];

    Path2D.prototype.getID = function (id) {
      this.objID = id;
    };

    var gradient;
    //Ybigh.colorctx.translate(Ybigh.$colors.width()/2, Ybigh.$colors.height()/2);
    for (var i = 0; i < colors.length; i++) {
      gradient = Ybigh.colorctx.createRadialGradient(
        colors[i].sx,
        colors[i].sy,
        colors[i].r1,
        colors[i].fx,
        colors[i].fy,
        colors[i].r2
      );
      gradient.addColorStop(colors[i].stop1, colors[i].col0);
      gradient.addColorStop(colors[i].stop2, colors[i].col2);
      gradient.addColorStop(colors[i].stop3, colors[i].col1);

      var path1 = new Path2D();

      path1.moveTo(colors[i].x, colors[i].y);
      path1.lineTo(colors[i].xlt, colors[i].ylt);
      path1.lineTo(colors[i].xlt1, colors[i].ylt1);
      path1.lineTo(colors[i].xlt2, colors[i].ylt2);
      path1.closePath();
      path1.getID(colors[i].nameID);

      Ybigh.colorctx.fillStyle = gradient;
      Ybigh.colorctx.strokeStyle = "#b0aaa6"; //
      Ybigh.colorctx.stroke(path1);
      Ybigh.colorctx.fill(path1);

      if (renderFont) {
        Ybigh.paths.push(path1);
        Ybigh.colorctx.strokeStyle = "black";
        Ybigh.colorctx.font = "11px verdana";
        Ybigh.colorctx.strokeText(
          colors[i].label,
          colors[i].labelX,
          colors[i].labelY
        );
      }
    }
  },
};
Ybigh.bind_inputs();

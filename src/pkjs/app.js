
//function iconFromWeatherId(weatherId) {
//  if (weatherId < 600) {
//    return 2;
//  } else if (weatherId < 700) {
//    return 3;
//  } else if (weatherId > 800) {
//    return 1;
//  } else {
//    return 0;
//  }
//}
var Clay = require('pebble-clay');
var clayConfig = require('./config.js');
var clay = new Clay(clayConfig, null, {autoHandleEvents: false});

String.prototype.isEmpty = function() {
  return (this.length === 0 || !this.trim());
};

function cisNaN(x) { return (typeof x == 'number' && x !== 0 && !x); }

var status;
var isface = true;
var options = {};
var initialized = false;
var transferInProgress = false;
//var imagetransfered = false;
var val;
var val2;
var val3;
var updateinterval;
var twtext, twdate, offset;

console.log("PebbleJS Line 32");


//function locationSuccess(pos) {
//  var coordinates = pos.coords;
//  fetchWeather(coordinates.latitude, coordinates.longitude);
//}

//function locationError(err) {
//  console.warn('location error (' + err.code + '): ' + err.message);
//  Pebble.sendAppMessage({
//    "city":"Loc Unavailable",
//    "temperature":"N/A"
//  });
//}

//var locationOptions = { "timeout": 15000, "maximumAge": 60000 }; 



Pebble.addEventListener("ready",
                        //function(e) {
                        //  console.log("connect!" + e.ready);
                        //  locationWatcher = window.navigator.geolocation.watchPosition(locationSuccess, locationError, locationOptions);
                        //  console.log(e.type);
                        //});
                        function(e){
                          //console.log(e.type);
                          //console.log("Got message: " + JSON.stringify(e));
                          //Wir wollen hier eine leicht veränderte oder noch eine Funktion aufrufen um das Twitterbild zu laden.
                          //get_show_status();
                          if(initialized !== true){
                            if(localStorage.getItem("twitch")===null){
                              localStorage.setItem("twitch", "ffstv");
                            }
                            if(localStorage.getItem("twitter")===null){
                              localStorage.setItem("twitter", "ffstv");
                            }
                            if(localStorage.getItem("timezone2")===null){
                              localStorage.setItem("timezone2", "Canada Pacific");
                            }
                            if(localStorage.getItem("updateinterval")===null){
                              localStorage.setItem("updateinterval", 60);
                            }
                            if(cisNaN(parseInt(localStorage.getItem("color")))===true){
                              localStorage.setItem("color", 0x000000);
                            }
                            if(localStorage.getItem("color")===null){
                              localStorage.setItem("color", 0x000000);
                            }
                            if(localStorage.getItem("rotate")===null){
                              localStorage.setItem("rotate", 0);
                            }
                            if(localStorage.getItem("subscribe")===null){
                              localStorage.setItem("subscribe", false);
                            }
                            initialized = true;
                          }
                          options = {"twitch":localStorage.getItem("twitch"),"twitter":localStorage.getItem("twitter"),"timezone2":localStorage.getItem("timezone2"),"color":parseInt(localStorage.getItem("color")),"updateinterval":localStorage.getItem("updateinterval"),"subscribe":localStorage.getItem("subscribe")};  
                          options.color = parseInt(localStorage.getItem("color"));


                          Pebble.timelineSubscriptions(
                            function (topics) {
                              console.log('Subscribed to ' + topics.join(', '));

                            },
                            function (errorString) {
                              console.log('Error getting subscriptions: ' + errorString);
                            }
                          );
                          Pebble.sendAppMessage({"ready": 1 }, null, null);
                        });

//Test
Pebble.addEventListener("appmessage",
                        //function(e) {
                        //  window.navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
                        //  console.log(e.type);
                        //  console.log(e.payload.temperature);
                        //  console.log("message!");
                        //});
                        function(e){
                          //console.log("Got message: " + JSON.stringify(e));
                          console.log("appmessage:");
                          
                          console.log(e.payload.opentwitch);
                          //if(imagetransfered == false){
                          if ('NETDL_URL' in e.payload) {
                            if (transferInProgress === false) {
                              transferInProgress = true;
                              downloadBinaryResource(e.payload.NETDL_URL, 
                                                     function(bytes) {
                                                       transferImageBytes(bytes, e.payload.NETDL_CHUNK_SIZE,
                                                                          function() { console.log("Done!"); transferInProgress = false; get_show_status();},
                                                                          function(e) { console.log("Failed! " + e); transferInProgress = false; get_show_status();}
                                                                         );

                                                     },
                                                     function(e) {
                                                       console.log("Download failed: " + e); transferInProgress = false; get_show_status();
                                                     });
                            }
                            else {
                              console.log("Ignoring request to download " + e.payload.NETDL_URL + " because another download is in progress.");
                            }
                          }
                          // }
                          else if('opentwitch' in e.payload){
                            //var req = new XMLHttpRequest();
                            console.log("Opening Twitch Javascript");
                            //Intent intent = new Intent(Intent.ACTION_VIEW);
                            //intent.setData(Uri.parse("pebble://appstore/530575df480b04cee900013e"));
                            //intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            //intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            //startActivity(intent);
                            //Pebble.openURL("http://steveway.pythonanywhere.com/view_twitch/spacemoneyoctagon.html");
                            
                            Pebble.openURL("http://www.twitch.tv/" + localStorage.getItem("twitch") + "/popout");
                          }
                          else{
                            console.log("Updating Info.");
                            get_show_status();
                          }
                        });
//TestEnde

Pebble.addEventListener("signalAppMessageAck",
                        function(){});
Pebble.addEventListener("signalNewAppMessageData",
                        function(){});

Pebble.addEventListener('showConfiguration', function(e) {

  // This is an example of how you might load a different config based on platform.
  //var platform = clay.meta.activeWatchInfo.platform || 'aplite';
  //if (platform === 'aplite') {
  //  clay.config = clayConfigAplite;
  //}

  Pebble.openURL(clay.generateUrl());
});

/*
Pebble.addEventListener("showConfiguration", 
                        function() {
                        //console.log("showing configuration");
                          console.log("is_colorwatch");
                          console.log(localStorage.getItem("is_colorwatch"));

                        if(initialized === true){
                           // options
                            var is_colorwatch = parseInt(localStorage.getItem("is_colorwatch"));
                          //localStorage.setItem("color", "#"+localStorage.getItem("color"));
                          options['color'] = '#'+localStorage.getItem("color");
                          if(is_colorwatch==1){
                            console.log('http://steveway.pythonanywhere.com/config_color_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                            Pebble.openURL('http://steveway.pythonanywhere.com/config_color_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                          }
                          else  if(is_colorwatch==2){
                            console.log('http://steveway.pythonanywhere.com/config_color_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                            Pebble.openURL('http://steveway.pythonanywhere.com/config_color_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                          }
                          else  if(is_colorwatch==3){
                            console.log('http://steveway.pythonanywhere.com/config_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                            Pebble.openURL('http://steveway.pythonanywhere.com/config_timeline.html?'+encodeURIComponent(JSON.stringify(options)));
                          }
                            else{
                          console.log('http://steveway.pythonanywhere.com/config.html?'+encodeURIComponent(JSON.stringify(options)));
                          Pebble.openURL('http://steveway.pythonanywhere.com/config.html?'+encodeURIComponent(JSON.stringify(options)));
                            }
                        }
                        });

*/                  


Pebble.addEventListener("webviewclosed",
                        function(e) {
                          if (e && !e.response) {
                            console.log("Config Aborted.");
                            return;
                          }

                          // Get the keys and values from each config item
                          var cdict = clay.getSettings(e.response);

                          for(var test in cdict){
                            console.log("ABZ:" + test.value);
                          }
                          //console.log(key + " und " + key.value);

                          console.log(cdict);
                          console.log("webview closed");
                          console.log(decodeURIComponent(e.response));
                          if(e.response !== false){
                            //if (e.response.charAt(0) == "{" && e.response.slice(-1) == "}" && e.response.length > 5) {
                            options = JSON.parse(decodeURIComponent(e.response));

                            console.log("Options = " + JSON.stringify(options));

                            for(var key in options) {
                              localStorage.setItem(key, options[key].value);
                              console.log(key + "=" + localStorage.getItem(key));
                            }
                            //                             var temprotate;
                            //                             temprotate = localStorage.getItem("rotate");
                            //                             console.log("Before rotate is currently:" + localStorage.getItem("rotate"));

                            //                             if(temprotate=="True"){
                            //                               localStorage.setItem("rotate", 1);
                            //                             }
                            //                             else{
                            //                               localStorage.setItem("rotate", 0);
                            //                             }
                            console.log("After rotate is currently:" + localStorage.getItem("rotate"));
                            var timelinetoken;
                            var substat;
                            substat = localStorage.getItem("subscribe");
                            console.log("status "+substat);
                            substat = JSON.parse(substat.toLowerCase());
                            if(substat===true){
                              console.log("HierSubstat");
                              Pebble.getTimelineToken(
                                function (token) {
                                  timelinetoken = token;
                                  console.log('My timeline token is ' + token);
                                  var unsubreq = new XMLHttpRequest();
                                  console.log("http://steveway.pythonanywhere.com/unsubscribe_from/"+timelinetoken);
                                  unsubreq.open('GET', "http://steveway.pythonanywhere.com/unsubscribe_from/"+timelinetoken, false);
                                  unsubreq.send();  
                                  unsubreq.onload = function(e) {
                                    if (unsubreq.readyState == 4) {
                                      if(unsubreq.status == 200) {
                                        console.log(unsubreq.responseText);
                                        //Justatest
                                        console.log("Resubscribe to "+localStorage.getItem("twitch"));
                                        var subreq = new XMLHttpRequest();
                                        if(isface === true){
                                          console.log("http://steveway.pythonanywhere.com/subscribe_to/face/"+localStorage.getItem("twitch")+"/"+timelinetoken);
                                          subreq.open('GET', "http://steveway.pythonanywhere.com/subscribe_to/face/"+localStorage.getItem("twitch")+"/"+timelinetoken, false);
                                        }
                                        else{
                                          console.log("http://steveway.pythonanywhere.com/subscribe_to/app/"+localStorage.getItem("twitch")+"/"+timelinetoken);
                                          subreq.open('GET', "http://steveway.pythonanywhere.com/subscribe_to/app/"+localStorage.getItem("twitch")+"/"+timelinetoken, false);
                                        }
                                        subreq.send();
                                        subreq.onload = function(e) {
                                          if (subreq.readyState == 4) {
                                            if(subreq.status == 200) {
                                              console.log(subreq.responseText);
                                            }
                                            else{
                                              console.log(subreq.responseText);
                                            }
                                          }
                                        };
                                        //Endtest
                                      }

                                    }                                     
                                  };


                                },
                                function (error) { 
                                  console.log('Error getting timeline token: ' + error);
                                }
                              );
                              /*
                                          Pebble.timelineSubscriptions(
                                          function (topics) {
                                            console.log('Subscribed to ' + topics.join(', '));
                                            topics.forEach(function(entry) {

                                              Pebble.timelineUnsubscribe(entry, 
                                          function sucess() { 
                                            console.log('Unsubscribed from '+entry);
                                          }, 
                                          function error(errorString) { 
                                            console.log('Error unsubscribing from topic: ' + errorString);
                                          }
                                        );
                                            });



                                          },
                                          function (errorString) {
                                            console.log('Error getting subscriptions: ' + errorString);
                                          }
                                        );*/


                              Pebble.getTimelineToken(
                                function (token) {
                                  timelinetoken = token;
                                  console.log('My timeline token is ' + token);
                                  var subreq = new XMLHttpRequest();
                                  if(isface === true){
                                    console.log("http://steveway.pythonanywhere.com/subscribe_to/face/"+localStorage.getItem("twitch")+"/"+timelinetoken);
                                    subreq.open('GET', "http://steveway.pythonanywhere.com/subscribe_to/face/"+localStorage.getItem("twitch")+"/"+timelinetoken, false);
                                  }
                                  else{
                                    console.log("http://steveway.pythonanywhere.com/subscribe_to/app/"+localStorage.getItem("twitch")+"/"+timelinetoken);
                                    subreq.open('GET', "http://steveway.pythonanywhere.com/subscribe_to/app/"+localStorage.getItem("twitch")+"/"+timelinetoken, false);
                                  }
                                  subreq.send();
                                  subreq.onload = function(e) {
                                    if (subreq.readyState == 4) {
                                      if(subreq.status == 200) {
                                        console.log(subreq.responseText);
                                      }
                                    }
                                  };
                                },
                                function (error) { 
                                  console.log('Error getting timeline token: ' + error);
                                }
                              );
                              Pebble.timelineSubscriptions(
                                function (topics) {
                                  console.log('Subscribed to ' + topics.join(', '));
                                  topics.forEach(function(entry) {

                                    Pebble.timelineUnsubscribe(entry, 
                                                               function sucess() { 
                                                                 console.log('Unsubscribed from '+entry);

                                                               }, 
                                                               function error(errorString) { 
                                                                 console.log('Error unsubscribing from topic: ' + errorString);
                                                               }
                                                              );
                                  });


                                  var twitchchannel;
                                  twitchchannel = localStorage.getItem("twitch");
                                  Pebble.timelineSubscribe(twitchchannel, 
                                                           function succes() { 
                                                             console.log('Subscribed to '+localStorage.getItem("twitch"));
                                                           }, 
                                                           function error(errorString) { 
                                                             console.log('Error subscribing to topic: ' + errorString);
                                                           }
                                                          ); 
                                },
                                function (errorString) {
                                  console.log('Error getting subscriptions: ' + errorString);
                                  var twitchchannel;
                                  twitchchannel = localStorage.getItem("twitch");
                                  Pebble.timelineSubscribe(twitchchannel, 
                                                           function succes() { 
                                                             console.log('Subscribed to '+localStorage.getItem("twitch"));
                                                           }, 
                                                           function error(errorString) { 
                                                             console.log('Error subscribing to topic: ' + errorString);
                                                           }
                                                          );
                                }
                              );
                              /*var twitchchannel;
                                          twitchchannel = localStorage.getItem("twitch");
                                        Pebble.timelineSubscribe(twitchchannel, 
                                          function succes() { 
                                            console.log('Subscribed to '+localStorage.getItem("twitch"));
                                          }, 
                                          function error(errorString) { 
                                            console.log('Error subscribing to topic: ' + errorString);
                                          }
                                        );*/


                            }
                            else{
                              Pebble.getTimelineToken(
                                function (token) {
                                  timelinetoken = token;
                                  console.log('My timeline token is ' + token);
                                  var unsubreq = new XMLHttpRequest();
                                  console.log("http://steveway.pythonanywhere.com/unsubscribe_from/"+timelinetoken);
                                  unsubreq.open('GET', "http://steveway.pythonanywhere.com/unsubscribe_from/"+timelinetoken, true);
                                  unsubreq.send();  
                                  unsubreq.onload = function(e) {
                                    if (unsubreq.readyState == 4) {
                                      if(unsubreq.status == 200) {
                                        console.log(unsubreq.responseText);

                                      }
                                    }
                                  };
                                },
                                function (error) { 
                                  console.log('Error getting timeline token: ' + error);
                                }
                              );

                              Pebble.timelineSubscriptions(
                                function (topics) {
                                  console.log('Subscribed to ' + topics.join(', '));
                                  topics.forEach(function(entry) {

                                    Pebble.timelineUnsubscribe(entry, 
                                                               function sucess() { 
                                                                 console.log('Unsubscribed from '+entry);
                                                               }, 
                                                               function error(errorString) { 
                                                                 console.log('Error unsubscribing from topic: ' + errorString);
                                                               }
                                                              );
                                  });
                                },
                                function (errorString) {
                                  console.log('Error getting subscriptions: ' + errorString);
                                }
                              );



                            }



                          } else {
                            console.log("Cancelled");
                            //options = JSON.parse(decodeURIComponent("%7B%22twitch%22%3A%22ffstv%22%2C%22twitter%22%3A%22ffstv%22%2C%22timezone2%22%3A%22Canada%20Pacific%22%2C%22color%22%3A%22%23000000%22%2C%22updateinterval%22%3A%2260%22%7D"));
                            //for(var key in options) {
                            //       localStorage.setItem(key, options[key]);
                            //   }
                          }
                          Pebble.timelineSubscriptions(
                            function (topics) {
                              console.log('Currently Subscribed to ' + topics.join(', '));

                            },
                            function (errorString) {
                              console.log('Error getting subscriptions: ' + errorString);
                            }
                          );
                          //                           var colortemp = localStorage.getItem("color");
                          //                           if( colortemp.charAt( 0 ) == '#' ){
                          //                             colortemp = colortemp.slice( 1 );
                          //                           }
                          //                           localStorage.setItem("color",colortemp);
                          //console.log(e.type);
                          //console.log(e.response);
                          if(transferInProgress===false){
                            get_show_status();
                          }
                        });


function get_show_status() {
  var response;
  var req = new XMLHttpRequest();
  val = localStorage.getItem("twitch");
  val2 = localStorage.getItem("twitter");
  val3 = localStorage.getItem("timezone2");
  updateinterval = localStorage.getItem("updateinterval");
  if(cisNaN(parseInt(localStorage.getItem("color")))===true){
    localStorage.setItem("color", 0x000000);
  }
  if(localStorage.getItem("color")===null){
    localStorage.setItem("color", 0x000000);
  }
  if(val !== null) {
    //console.log(val);
  }
  if(val2 !== null) {
    //console.log(val2);
  }
  if(val3 !== null) {
    //console.log(val3);
  }
  //req.open('GET', "http://api.openweathermap.org/data/2.1/find/city?" +
  //  "lat=" + latitude + "&lon=" + longitude + "&cnt=1", true);
  var offsetMinutes = new Date().getTimezoneOffset() * 60;
  if(val !== null){
    req.open('GET', "http://steveway.pythonanywhere.com"+"/twitteruser/"+val2+"/twitchuser/"+val+"/timezone/"+val3, false);
    console.log("http://steveway.pythonanywhere.com"+"/twitteruser/"+val2+"/twitchuser/"+val+"/timezone/"+val3);
  }
  else{
    req.open('GET', "http://steveway.pythonanywhere.com", false);

  }
  req.onload = function(e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        //console.log(req.responseText);
        response = JSON.parse(req.responseText);

        updateinterval = localStorage.getItem("updateinterval");
        //var temperature, icon, city;
        // if(req.status == 200) {
        //console.log(response);
        status = response.Data.Status;
        //console.log(status);
        //temp fix until twitch works on the server
        /*if (status == 3){
            console.log("Here");
            var statreq = new XMLHttpRequest();
            var statresponse;
            if(val !== null){
            statreq.open('GET',"https://api.twitch.tv/kraken/streams/"+val+"?client_id=lon3uoexanvfafu0wqhek7sr50m77k7",false);
            }
            else{
                  statreq.open('GET',"https://api.twitch.tv/kraken/streams/ffstv?client_id=lon3uoexanvfafu0wqhek7sr50m77k7",false);
            }
            console.log(statreq.responseText);

            statreq.onload = function(e2){
              console.log(statreq.responseText);
              if(statreq.readyState == 4){
                if(statreq.status == 200){
                  console.log(statreq.responseText);
                  statresponse = JSON.parse(statreq.responseText);
                  console.log(statresponse.stream);
                  if(statresponse.stream === null){
                    status = 1;
                  }
                  else{
                    status = 0;
                  }
                }
                else {
                  console.log("Error");
                }
              }
            };
            statreq.onreadystatechange = function(){
            console.log("request.onreadystatechange called. readyState: " + this.readyState);
        };
           statreq.send(null); 
          }*/

        twtext = response.Data.Text;
        twdate = response.Data.Time;
        offset = (response.Data.Offset + (offsetMinutes));
        //updateinterval = response.Data.updateinterval;
        //var weatherResult = response.list[0];
        //temperature = Math.round(weatherResult.main.temp - 273.15);
        //icon = iconFromWeatherId(weatherResult.weather[0].id);
        //city = weatherResult.name;

        //console.log(temperature);
        //console.log(icon);
        //console.log(city);
        //console.log(status);
        //console.log(twtext);
        //console.log(twdate);
        //console.log(offset);
        updateinterval = localStorage.getItem("updateinterval");

        if(twtext === null){
          twtext = localStorage.getItem("oldtwtext");
        }
        if(status === null){
          status = localStorage.getItem("oldstatus");
        }
        if(twdate === null){
          twdate = localStorage.getItem("oldtwdate");
        }
        if(offset === null){
          offset = localStorage.getItem("oldoffset");
        }
        if(updateinterval === null){
          updateinterval = localStorage.getItem("updateinterval");
        }
        localStorage.setItem("oldstatus", status);
        if (typeof twtext == 'string' || twtext instanceof String){
          //if(!twtext.isEmpty){
          localStorage.setItem("oldtwtext", twtext);
          //}
        }
        if(cisNaN(parseInt(localStorage.getItem("color")))===true){
          localStorage.setItem("color", 0x000000);
        }
        if(localStorage.getItem("color")===null){
          localStorage.setItem("color", 0x000000);
        }
        //           var colortemp = localStorage.getItem("color");
        //           if( colortemp.charAt( 0 ) == '#' ){
        //             colortemp = colortemp.slice( 1 );
        //           }
        //           localStorage.setItem("color",colortemp);
        twtext = localStorage.getItem("oldtwtext");
        localStorage.setItem("oldtwdate", twdate);
        localStorage.setItem("oldoffset", offset);
        localStorage.setItem("updateinterval", updateinterval);
        //console.log("updateinterval");
        //console.log(updateinterval);  
        console.log("Color is:");
        console.log(localStorage.getItem("color"));

        Pebble.sendAppMessage({
          "status":parseInt(status),
          "twtext":twtext,
          "twdate":twdate,
          "offset":offset,
          "updateinterval":parseInt(updateinterval),
          "bgcolor":parseInt(localStorage.getItem("color")),
          "rotate" : parseInt(localStorage.getItem("rotate")),
        });
        //}

      } else {
        var status2 = localStorage.getItem("oldstatus");
        var twtext2 = localStorage.getItem("oldtwtext");
        var twdate2 = localStorage.getItem("oldtwdate");
        var offset2 = localStorage.getItem("oldoffset");
        var updateinterval2 = localStorage.getItem("updateinterval");
        console.log(localStorage.getItem("color"));
        Pebble.sendAppMessage({
          "status":parseInt(status2),
          "twtext":twtext2,
          "twdate":twdate2,
          "offset":offset2,
          "updateinterval":parseInt(updateinterval2),
          "bgcolor":parseInt(localStorage.getItem("color")),
          "rotate" : parseInt(localStorage.getItem("rotate")),
        });

        console.log("Error");
      }
    }else {
      var status3 = localStorage.getItem("oldstatus");
      var twtext3 = localStorage.getItem("oldtwtext");
      var twdate3 = localStorage.getItem("oldtwdate");
      var offset3 = localStorage.getItem("oldoffset");
      var updateinterval3 = localStorage.getItem("updateinterval");
      console.log(localStorage.getItem("color"));
      Pebble.sendAppMessage({
        "status":parseInt(status3),
        "twtext":twtext3,
        "twdate":twdate3,
        "offset":offset3,
        "updateinterval":parseInt(updateinterval3),
        "bgcolor":parseInt(localStorage.getItem("color")),
        "rotate" : parseInt(localStorage.getItem("rotate")),
      });

      console.log("Error");
    }
  };
  req.send(null);
}


function downloadBinaryResource(color, callback, errorCallback) {
  console.log(color+" hier1234!!!!");
  var req2 = new XMLHttpRequest();
  if(localStorage.getItem("twitter") === null){
    localStorage.setItem("twitter", "ffstv");
  }
  var imageURL = "";
  console.log(color+" hier!!!!");
  if(color == "color"){
    imageURL = "http://steveway.pythonanywhere.com/twitterimage/color/"+localStorage.getItem("twitter")+".png";
    localStorage.setItem("is_colorwatch", 1);
    console.log(color+" hier1!!!!");
    //colorwatch = true;

  }
  else if(color == "color_basalt"){
    imageURL = "http://steveway.pythonanywhere.com/twitterimage/color/"+localStorage.getItem("twitter")+".png";
    localStorage.setItem("is_colorwatch", 2);
    console.log(color+" hier2!!!!");
    //colorwatch = true;

  }
  else if(color == "bw_basalt"){
    imageURL = "http://steveway.pythonanywhere.com/twitterimage/"+localStorage.getItem("twitter")+".png";
    localStorage.setItem("is_colorwatch", 3);
    console.log(color+" hier3!!!!");
    //colorwatch = true;

  }
  else{
    imageURL = "http://steveway.pythonanywhere.com/twitterimage/"+localStorage.getItem("twitter")+".png";
    localStorage.setItem("is_colorwatch", 0);
    console.log(color+" hier4!!!!");
  }
  console.log("ImageURL:");
  console.log(imageURL);
  req2.open("GET", imageURL, true); //would love to use false, but responseType get's disabled in that case, because stupid.
  req2.responseType = "arraybuffer";
  req2.onload = function(e) {
    console.log("loaded");
    var buf = req2.response;
    if(req2.status == 200 && buf) {
      var byteArray = new Uint8Array(buf);
      var arr = [];
      for(var i=0; i<byteArray.byteLength; i++) {
        arr.push(byteArray[i]);
      }

      console.log("Downloaded file with " + byteArray.length + " bytes.");
      callback(arr);
    }
    else {
      errorCallback("Request status is " + req2.status);
    }
  };
  req2.onerror = function(e) {
    errorCallback(e);
  };
  req2.send(null);
}

function transferImageBytes(bytes, chunkSize, successCb, failureCb) {
  var retries = 0;
  var failure;
  var success;
  var sendChunk;

  success = function() {
    console.log("Success cb=" + successCb);
    if (successCb !== undefined) {
      successCb();
    }
  };
  failure = function(e) {
    console.log("Failure cb=" + failureCb);
    if (failureCb !== undefined) {
      failureCb(e);
    }
  };

  // This function sends chunks of data.
  sendChunk = function(start) {
    var txbuf = bytes.slice(start, start + chunkSize);
    // console.log("Sending " + txbuf.length + " bytes - starting at offset " + start);
    Pebble.sendAppMessage({ "NETDL_DATA": txbuf },
                          function(e) {
                            // If there is more data to send - send it.
                            if (bytes.length > start + chunkSize) {
                              sendChunk(start + chunkSize);
                            }
                            // Otherwise we are done sending. Send closing message.
                            else {
                              Pebble.sendAppMessage({"NETDL_END": "done" }, success, failure);
                            }
                          },
                          // Failed to send message - Retry a few times.
                          function (e) {
                            if (retries++ < 3) {
                              console.log("Got a nack for chunk #" + start + " - Retry...");

                              sendChunk(start);
                            }
                            else {
                              failure(e);
                            }
                          }
                         );
  };

  // Let the pebble app know how much data we want to send.
  Pebble.sendAppMessage({"NETDL_BEGIN": bytes.length },
                        function (e) {
                          // success - start sending
                          console.log("Begin Datatransfer!");
                          sendChunk(0);
                        }, failure);

}

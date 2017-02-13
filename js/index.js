var users = ["ESL_SC2", "OgamingSC2", "freecodecamp", "marcodiversi", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var clientId = 'xa9wdmqvtxv0oy4wwmo649nstymm0u';

function offline(num) {

var url = "https://api.twitch.tv/kraken/channels/" + users[num] + "?client_id=" + clientId;

  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(twitch) {

        var usericon = twitch.logo;
        var username = twitch.display_name;
        var userlink = twitch.url;
        var offline = "OFFLINE";

        if (usericon == undefined) {
          usericon = "http://bit.ly/1WGY3Uw";
        }

        if (username == undefined) {
          username = users[num];
        }

        console.log(users[num] + twitch.status);

        if (twitch.status == 422) {
          offline = "ACCOUNT CLOSED";
        }

        document.getElementById("userblock").innerHTML += "<a href=" + userlink + "><div class='row'><div class='col-xs-3'></div><div class='col-xs-1 icon-box showred'><img src='" + usericon + "' class='icon' height='50'></div><div class='col-xs-1 username showred'><p>" + username + "</p></div><div class='col-xs-4 info showred'><p>" + offline + "</p></div><div class='col-xs-3'></div></div></a>";

      } 
  }); 
}   

function getStreams() {

  for (var i = 0; i < users.length; i++) {

  var url = "https://api.twitch.tv/kraken/streams/" + users[i] + "?client_id=" + clientId;

    $.ajax({
      url: url,
      dataType: 'json',
      async: false,
      success: function(twitch) {

        if (twitch.stream === null) {

          offline(i);

        } else {

          var usericon = twitch.stream.channel.logo;
          var username = twitch.stream.channel.name;
          var userlink = twitch.stream.channel.url;
          var userstatus = twitch.stream.channel.status;

          if (usericon == undefined) {
            usericon = "http://bit.ly/1WGY3Uw";
          }

          document.getElementById("userblock").innerHTML += "<a href=" + userlink + "><div class='row'><div class='col-xs-3'></div><div class='col-xs-1 icon-box showgreen'><img src='" + usericon + "' class='icon' height='50'></div><div class='col-xs-1 username showgreen'><p>" + username + "</p></div><div class='col-xs-4 info showgreen'><p>" + userstatus + "</p></div><div class='col-xs-3'></div></div></a>";

        } 

      }, 
      error: function(twitch) {
        console.log(users[i]);
        offline(i);
      }

    }); 
  }; 
}
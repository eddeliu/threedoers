(function(){$(document).ready(function(){var t;try{return console.log(user),$.post("/getNotifications").done(function(t){var e;try{if(0!==t.notifications.length)return $("#notifID").addClass("fluo-3doers")}catch(n){return e=n,console.log(e)}}).fail(function(){return console.log("error")}),$("#list-group-notif").click(function(){return $.post("/notification/read/"+event.target.id).done(function(t){return console.log("read "+t)}).fail(function(){return console.log("error")})})}catch(e){return t=e,console.log(t)}})}).call(this);
(function(){$(document).ready(function(){var e,t;return e=$("#address"),e.bind("keypress",function(e){return 13===e.which?e.preventDefault():void 0}),e.val(""),t=new google.maps.places.Autocomplete(e.get(0)),google.maps.event.addListener(t,"place_changed",function(){var n,r,o,a,i,s,c,l;for(a=t.getPlace(),n=!1,o=!1,i=!1,l=a.address_components,s=0,c=l.length;c>s;s++)r=l[s],"locality"===r.types[0]&&(n=r.long_name),"country"===r.types[0]&&(o=r.long_name);return a.geometry&&a.geometry.location&&(i=[a.geometry.location.lng(),a.geometry.location.lat()]),n&&o&&i?($("#city").val(n),$("#country").val(o),$("#location").val(i)):(e.siblings(".help-block").remove(),e.parent().append($("<span>").addClass("help-block").text("Is not a valid address.")),e.closest(".form-group").addClass("has-error"))})})}).call(this);
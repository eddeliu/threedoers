(function(){var a,b,c,d,e;e=function(a){var b,c,d;d=[];for(c in a)b=$("#"+c),1===b.length&&b.text(a[c]),"status"===c&&("processing"===a[c]?($(".object-volume").addClass("hide"),$(".processing-volume").removeClass("hide")):($(".object-volume").removeClass("hide"),$(".processing-volume").addClass("hide"))),d.push("order"===c?$("#order-placed-order").text(a[c].price):void 0);return d},a={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00"},b=function(a){return d[a]||a},c=function(a){return a.replace(/[&<>]/g,b)},d={"&":"&amp;","<":"&lt;",">":"&gt;"},$(document).ready(function(){var b,d,f,g;return b="X-CSRF-Token",d=function(a){return jQuery.ajaxPrefilter(function(c,d,e){return e.crossDomain?void 0:e.setRequestHeader(b,a)})},d($('meta[name="csrf-token"]').attr("content")),f=io.connect(":"+port+"/project?project="+project.id),f.on("error",function(a){return console.log(a.msg)}),f.on("update",function(a){return f.emit("order-price",{ammount:$("#ammount").val()}),e(a)}),f.on("update-price-order",function(a){return $("#order-price").text(a.price)}),$(".selectpicker").selectpicker(),Modernizr.canvas||$("#message-canvas").removeClass("hide"),g=new JSC3D.Viewer($("#cv")),g.setDefinition("high"),g.setParameter("SceneUrl","/"+project.filename),g.setParameter("ModelColor",""+a[project.color]),g.setParameter("BackgroundColor1","#00CC00"),g.setParameter("BackgroundColor2","#ffCC00"),g.setParameter("RenderMode","smooth"),g.setDefinition("high"),g.init(),g.update(),$("#color-chooser").selectpicker("val",""+project.color),$("#color-chooser").val(""+project.color).change(function(){return $.post("/project/color/"+project.id,{value:$(this).val()},function(){return location.reload()})}),$("#density-chooser").selectpicker("val",""+project.density),$("#density-chooser").val(""+project.density).change(function(){return $.post("/project/density/"+project.id,{value:$(this).val()})}),$("#title").editable({type:"text",pk:""+project.id,url:"/project/title"}),$("#ammount").keyup(function(a){return(/\D/g.test(this.value)||/^0$/.test(this.value))&&(this.value=this.value.replace(/\D/g,""),this.value=this.value.replace(/^0$/,"")),/^[1-9][0-9]*$/.test(this.value)||/^\s*$/.test(this.value)?($("#order-price").text("Processing"),f.emit("order-price",{ammount:$("#ammount").val()})):a.preventDefault()}),$("#comment-button").click(function(a){return a.preventDefault(),$.ajax({url:"/project/comment/"+project.id,method:"post",dataType:"json",data:{message:$("#comment-text").val()},success:function(a){var b;return b="<li class='list-group-item'> <div class='row'> <div class='col-xs-2 col-md-1'><img src='http://placehold.it/80' alt='' class='img-circle img-responsive'></div> <div class='col-xs-10 col-md-11'> <div> <div class='mic-info'>By: &nbsp; &nbsp;<a href='#'>"+a.username+"</a>&nbsp;on "+Date(a.createdAt)+"</div> </div><br> <div class='comment-text'>"+c(a.content)+"</div> </div> </div> </li>",$("#comment-list").append($(b)),$("#comment-text").val("")},statusCode:{400:function(a){return a=JSON.parse(a.responseText),alert(a.msg)}}})})})}).call(this);
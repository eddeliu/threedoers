(function(){var e,t,n,r,a;a=function(e){var t,n,r;r=[];for(n in e)t=$("#"+n),1===t.length&&t.text(e[n]),"status"===n&&("processing"===e[n]?($(".object-volume").addClass("hide"),$(".processing-volume").removeClass("hide")):($(".object-volume").removeClass("hide"),$(".processing-volume").addClass("hide"))),"order"===n?r.push($("#order-placed-order").text(e[n].price)):r.push(void 0);return r},e={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00"},t=function(e){return r[e]||e},n=function(e){return e.replace(/[&<>]/g,t)},r={"&":"&amp;","<":"&lt;",">":"&gt;"},$(document).ready(function(){var t,r,o,i;return t="X-CSRF-Token",r=function(e){return jQuery.ajaxPrefilter(function(n,r,a){return a.crossDomain?void 0:a.setRequestHeader(t,e)})},r($('meta[name="csrf-token"]').attr("content")),o=io.connect(":"+port+"/project?project="+project.id),o.on("error",function(e){return console.log(e.msg)}),o.on("update",function(e){return o.emit("order-price",{ammount:$("#ammount").val()}),a(e)}),o.on("update-price-order",function(e){return $("#order-price").text(e.price)}),$(".selectpicker").selectpicker(),Modernizr.canvas||$("#message-canvas").removeClass("hide"),i=new JSC3D.Viewer($("#cv").get(0)),i.setParameter("SceneUrl","/"+project.filename),i.setParameter("ModelColor",""+e[project.color]),i.setParameter("BackgroundColor1","#E5D7BA"),i.setParameter("InitRotationX","25"),i.setParameter("InitRotationY","25"),i.setParameter("InitRotationZ","25"),i.setParameter("BackgroundColor2","#383840"),i.setParameter("RenderMode","smooth"),i.setParameter("Definition","high"),i.setParameter("MipMapping","on"),i.setParameter("CreaseAngle","30"),i.init(),i.update(),$("#color-chooser").selectpicker("val",""+project.color),$("#color-chooser").val(""+project.color).change(function(){return $.post("/project/color/"+project.id,{value:$(this).val()},function(){return location.reload()})}),$("#density-chooser").selectpicker("val",""+project.density),$("#density-chooser").val(""+project.density).change(function(){return $.post("/project/density/"+project.id,{value:$(this).val()})}),$("#title").editable({type:"text",pk:""+project.id,url:"/project/title"}),$("#ammount").keyup(function(e){return(/\D/g.test(this.value)||/^0$/.test(this.value))&&(this.value=this.value.replace(/\D/g,""),this.value=this.value.replace(/^0$/,"")),/^[1-9][0-9]*$/.test(this.value)||/^\s*$/.test(this.value)?($("#order-price").text("Processing"),o.emit("order-price",{ammount:$("#ammount").val()})):e.preventDefault()}),$("#comment-button").click(function(e){return e.preventDefault(),$.ajax({url:"/project/comment/"+project.id,method:"post",dataType:"json",data:{message:$("#comment-text").val()},success:function(e){var t;return t="<li class='list-group-item'>              <div class='row'>                <div class='col-xs-2 col-md-1'><img src='http://placehold.it/80' alt='' class='img-circle img-responsive'></div>                <div class='col-xs-10 col-md-11'>                  <div>                   <div class='mic-info'>By: &nbsp; &nbsp;<a href='#'>"+e.username+"</a>&nbsp;on "+Date(e.createdAt)+"</div>                  </div><br>                  <div class='comment-text'>"+n(e.content)+"</div>                </div>              </div>            </li>",$("#comment-list").append($(t)),$("#comment-text").val("")},statusCode:{400:function(e){return e=JSON.parse(e.responseText),alert(e.msg)}}})})})}).call(this);
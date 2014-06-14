(function(){var t,e,n,a,r;r=function(t){var e,n,a;a=[];for(n in t)e=$("#"+n),1===e.length&&e.text(" "+t[n]),"status"===n&&("processing"===t[n]?($(".object-volume").addClass("hide"),$(".processing-volume").removeClass("hide")):($(".object-volume").removeClass("hide"),$(".processing-volume").addClass("hide"))),"order"===n?a.push($("#order-placed-order").text(" "+t[n].price)):a.push(void 0);return a},t={black:"#000000",white:"#FFFFFF",red:"#FF0000",green:"#00FF00",blue:"#0000FF",yellow:"#FFFF00"},e=function(t){return a[t]||t},n=function(t){return t.replace(/[&<>]/g,e)},a={"&":"&amp;","<":"&lt;",">":"&gt;"},$(document).ready(function(){var e,a,i,o;return e="X-CSRF-Token",a=function(t){return jQuery.ajaxPrefilter(function(n,a,r){return r.crossDomain?void 0:r.setRequestHeader(e,t)})},a($('meta[name="csrf-token"]').attr("content")),i=io.connect(":"+port+"/project?project="+project.id),i.on("error",function(t){return console.log(t.msg)}),i.on("update",function(t){return i.emit("order-price",{ammount:$("#ammount").val()}),r(t)}),i.on("update-price-order",function(t){return $("#order-price").text(t.price)}),Modernizr.canvas||$("#message-canvas").removeClass("hide"),o=new JSC3D.Viewer($("#cv").get(0)),o.setParameter("SceneUrl","/"+project.filename),o.setParameter("ModelColor",""+t[project.color]),o.setParameter("BackgroundColor1","#E5D7BA"),o.setParameter("InitRotationX","25"),o.setParameter("InitRotationY","25"),o.setParameter("InitRotationZ","25"),o.setParameter("BackgroundColor2","#383840"),o.setParameter("RenderMode","smooth"),o.setParameter("Definition","high"),o.setParameter("MipMapping","on"),o.setParameter("CreaseAngle","30"),o.init(),o.update(),$("#color-chooser").val(""+project.color),$("#color-chooser").val(""+project.color).change(function(){return $.post("/project/color/"+project.id,{value:$(this).val()},function(){return location.reload()})}),$("#density-chooser").val(""+project.density),$("#density-chooser").val(""+project.density).change(function(){return $.post("/project/density/"+project.id,{value:$(this).val()})}),$("#title").editable("/project/title/"+project.id),$("#ammount").keyup(function(t){return(/\D/g.test(this.value)||/^0$/.test(this.value))&&(this.value=this.value.replace(/\D/g,""),this.value=this.value.replace(/^0$/,"")),/^[1-9][0-9]*$/.test(this.value)||/^\s*$/.test(this.value)?($("#order-price").text("Processing"),i.emit("order-price",{ammount:$("#ammount").val()})):t.preventDefault()}),$("#comment-button").click(function(t){return t.preventDefault(),$.ajax({url:"/project/comment/"+project.id,method:"post",dataType:"json",data:{message:$("#comment-text").val()},success:function(t){var e;return e="<li class='list-group-item'>              <div class='row'>                <div class='col-xs-2 col-md-1'><img src='http://placehold.it/80' alt='' class='img-circle img-responsive'></div>                <div class='col-xs-10 col-md-11'>                  <div>                   <div class='mic-info'>By: &nbsp; &nbsp;<a href='#'>"+t.username+"</a>&nbsp;on "+Date(t.createdAt)+"</div>                  </div><br>                  <div class='comment-text'>"+n(t.content)+"</div>                </div>              </div>            </li>",$("#comment-list").append($(e)),$("#comment-text").val("")},statusCode:{400:function(t){return t=JSON.parse(t.responseText),alert(t.msg)}}})})})}).call(this);
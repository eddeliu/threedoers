(function(){var t,e,n,i,r,o;e=function(t){return o[t]||t},n=function(t){return t.replace(/[&<>]/g,e)},o={"&":"&amp;","<":"&lt;",">":"&gt;"},t=null,r=null,i=null,$(document).ready(function(){var t,e;return t="X-CSRF-Token",e=function(e){return jQuery.ajaxPrefilter(function(n,i,r){return r.crossDomain?void 0:r.setRequestHeader(t,e)})},e($('meta[name="csrf-token"]').attr("content")),$("#comment-button").click(function(t){return t.preventDefault(),$.ajax({url:"/design/project/comment/"+project.id,method:"post",dataType:"json",data:{message:$("#comment-text").val()},success:function(t){var e;return e="<div class='media'><a href='#' class='pull-left'><img src='/"+t.photo+"' alt='' class='media-object' height='78' width='78'></a>              <div class='media-body'>                <p>"+n(t.content)+"</p>              </div>              <div class='media-meta'>by <span class='author'>"+t.username+"</span> <span class='date'>"+Date(t.createdAt)+"</span></div>            </div>",$("#comment-list").append($(e)),$("#comment-text").val("")},statusCode:{400:function(t){return t=JSON.parse(t.responseText),alert(t.msg)}}})})})}).call(this);
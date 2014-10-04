(function() {
  var address, colors, replaceTag, safe_tags_replace, shippingMethod, shippingRate, tagsToReplace, updateFrontEnd;

  updateFrontEnd = function(data) {
    var element, key, _results;
    _results = [];
    for (key in data) {
      element = $("#" + key);
      if (element.length === 1) {
        element.text(" " + data[key]);
      }
      if (key === 'status') {
        if (data[key] === 'processing') {
          $('.object-volume-unit').addClass('hide');
          $('.object-volume').text('processing');
        } else {
          $('.object-volume-unit').removeClass('hide');
        }
      }
      if (key === 'order') {
        $('#order-placed-order').text(" " + data[key].price + "  ");
      }
      if (key === 'status_image') {
        _results.push($('#status-image').attr("src", "/img/icons_" + data[key] + "_second.png"));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  colors = {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    yellow: '#FFFF00'
  };

  replaceTag = function(tag) {
    return tagsToReplace[tag] || tag;
  };

  safe_tags_replace = function(str) {
    return str.replace(/[&<>]/g, replaceTag);
  };

  tagsToReplace = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;"
  };

  address = null;

  shippingRate = null;

  shippingMethod = null;

  $(document).ready(function() {
    /*
    # CSRF Protection
    */

    var CSRF_HEADER, setCSRFToken, socket, updatePayDiv, viewer;
    CSRF_HEADER = "X-CSRF-Token";
    setCSRFToken = function(securityToken) {
      return jQuery.ajaxPrefilter(function(options, _, xhr) {
        if (!xhr.crossDomain) {
          return xhr.setRequestHeader(CSRF_HEADER, securityToken);
        }
      });
    };
    setCSRFToken($("meta[name=\"csrf-token\"]").attr("content"));
    /*
    # Socket IO
    */

    socket = io.connect(":" + port + "/project?project=" + project.id);
    socket.on('error', function(data) {
      return console.log(data.msg);
    });
    socket.on('update', function(data) {
      socket.emit('order-price', {
        ammount: $("#ammount").val()
      });
      return updateFrontEnd(data);
    });
    socket.on('update-price-order', function(data) {
      return $('#order-price').text(data.price);
    });
    if (!Modernizr.canvas) {
      $("#message-canvas").removeClass('hide');
    }
    /*
    # JSC3D.Viewer
    */

    viewer = new JSC3D.Viewer($('#cv').get(0));
    viewer.setParameter('SceneUrl', "/" + project.filename);
    viewer.setParameter('ModelColor', "" + colors[project.color]);
    viewer.setParameter('BackgroundColor1', '#E5D7BA');
    viewer.setParameter('InitRotationX', '25');
    viewer.setParameter('InitRotationY', '25');
    viewer.setParameter('InitRotationZ', '25');
    viewer.setParameter('BackgroundColor2', '#383840');
    viewer.setParameter('RenderMode', 'smooth');
    viewer.setParameter('Definition', 'high');
    viewer.setParameter('MipMapping', 'on');
    viewer.setParameter('CreaseAngle', '30');
    viewer.onloadingcomplete = function() {
      if (!project.hasImage) {
        return setTimeout(function() {
          return $.post("/project/" + project.id + "/image/", {
            image: $("#cv")[0].toDataURL()
          });
        }, 15000);
      }
    };
    viewer.init();
    viewer.update();
    /*
    # Some controllers
    */

    $("#color-chooser").val("" + project.color);
    $("#color-chooser").val("" + project.color).change(function() {
      return $.post("/project/color/" + project.id, {
        value: $(this).val()
      }, function() {
        return location.reload();
      });
    });
    $("#density-chooser").val("" + project.density);
    $("#density-chooser").val("" + project.density).change(function() {
      return $.post("/project/density/" + project.id, {
        value: $(this).val()
      });
    });
    $("#title").editable("/project/title/" + project.id);
    $("#ammount").keyup(function(event) {
      if (/\D/g.test(this.value) || /^0$/.test(this.value)) {
        this.value = this.value.replace(/\D/g, '');
        this.value = this.value.replace(/^0$/, '');
      }
      if (/^[1-9][0-9]*$/.test(this.value) || /^\s*$/.test(this.value)) {
        $("#order-price").text("Processing");
        return socket.emit('order-price', {
          ammount: $("#ammount").val()
        });
      } else {
        return event.preventDefault();
      }
    });
    $("#comment-button").click(function(e) {
      e.preventDefault();
      return $.ajax({
        url: "/project/comment/" + project.id,
        method: "post",
        dataType: "json",
        data: {
          message: $("#comment-text").val()
        },
        success: function(data) {
          var template;
          template = "<div class='media'><a href='#' class='pull-left'><img src='/" + data.photo + "' alt='' class='media-object' height='78' width='78'></a>              <div class='media-body'>                <p>" + (safe_tags_replace(data.content)) + "</p>              </div>              <div class='media-meta'>by <span class='author'>" + data.username + "</span> <span class='date'>" + (Date(data.createdAt)) + "</span></div>            </div>";
          $("#comment-list").append($(template));
          return $("#comment-text").val("");
        },
        statusCode: {
          400: function(data) {
            data = JSON.parse(data.responseText);
            return alert(data.msg);
          }
        }
      });
    });
    updatePayDiv = function() {
      if (address) {
        return $.ajax({
          url: "/validate-address-and-rate/" + project.id,
          data: address,
          dataType: 'json',
          success: function(data) {
            var error;
            if (data.errors) {
              for (error in data.errors) {
                alert("" + data.errors[error].param + ": " + data.errors[error].msg);
              }
            }
            if (data.message) {
              alert(data.message);
            }
            if (data.ok) {
              address = data.address;
              shippingRate = parseFloat(data.charge);
              $('#address-selection').hide();
              $('#pay-values').show();
              $('#pay-product-price').html("" + project.orderPrice);
              $('#pay-shipping-price').html("" + shippingRate);
              return $('#pay-total-price').html("" + ((project.orderPrice + shippingRate).toFixed(2)));
            } else {
              return alert("Something was wrong please try again.");
            }
          },
          error: function() {
            return alert("Something was wrong please try again.");
          }
        });
      } else {
        return alert("Please select and address or add new one.");
      }
    };
    $('a.select-saved-address').click(function(event) {
      event.preventDefault();
      address = {
        id: $(this).attr('data-id')
      };
      return updatePayDiv();
    });
    $('button#validate-address').click(function(event) {
      var a;
      event.preventDefault();
      address = {};
      a = $(this).closest('form').serializeArray();
      $.each(a, function() {
        if (address[this.name]) {
          if (!address[this.name].push) {
            address[this.name] = [address[this.name]];
          }
          address[this.name].push(this.value || "");
        } else {
          address[this.name] = this.value || "";
        }
      });
      return updatePayDiv();
    });
    $('#payment-form').submit(function(event) {
      var $form;
      event.preventDefault();
      $form = $('#payment-form');
      shippingMethod = $form.find('input[name=shipping]:checked').val();
      if (shippingMethod === 'shipping') {
        return $('#payment-modal').modal('show');
      } else {
        $("#hidden-pay-form #shippingMethod").val(shippingMethod);
        return $("#hidden-pay-form").submit();
      }
    });
    $('.close-payment-modal').click(function(event) {
      return $('#payment-modal').modal('hide');
    });
    $('#payment-modal').on('hidden.bs.modal', function(event) {
      $('#address-selection').show();
      $('#pay-values').hide();
      address = null;
      shippingMethod = null;
      return shippingRate = null;
    });
    return $('#pay-payment-modal').click(function(event) {
      $("#hidden-pay-form #shippingRate").val(shippingRate);
      $("#hidden-pay-form #shippingMethod").val(shippingMethod);
      $("#hidden-pay-form #shippingAddress").val(JSON.stringify(address));
      return $("#hidden-pay-form").submit();
    });
  });

}).call(this);

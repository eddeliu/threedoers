(function() {
    var t, e, n, i, r, o, a, s;
    s = function(t) {
        var e, n, i;
        0 === t.volume && $("#message-error").removeClass("hide"), i = [];
        for (n in t) e = $("#" + n), 1 === e.length && e.text(" " + t[n]), "status" === n && ("processing" === t[n] ? ($(".object-volume-unit").addClass("hide"), $(".object-volume").text("processing")) : ($(".object-volume-unit").removeClass("hide"), 0 !== t.volume ? $("#order-button").prop("disabled", !1) : $("#order-button").prop("disabled", !0))), "order" === n && $("#order-placed-order").text(" " + t[n].price + "  "), "status_image" === n ? i.push($("#status-image").attr("src", "/img/icons_" + t[n] + "_second.png")) : i.push(void 0);
        return i
    }, e = {
        black: "#000000",
        white: "#FFFFFF",
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF",
        yellow: "#FFFF00"
    }, n = function(t) {
        return a[t] || t
    }, i = function(t) {
        return t.replace(/[&<>]/g, n)
    }, a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, t = null, o = null, r = null, $(document).ready(function() {
        var n, a, l, c, u, d, p, f;
        n = "X-CSRF-Token", u = function(t) {
            return jQuery.ajaxPrefilter(function(e, i, r) {
                return r.crossDomain ? void 0 : r.setRequestHeader(n, t)
            })
        }, u($('meta[name="csrf-token"]').attr("content"));
        try {
            d = io.connect(site + "/project", {
                query: "project=" + project.id
            })
        } catch (h) {
            a = h, console.log({
                query: {
                    project: window.location.pathname.split("/").pop()
                }
            }), d = io.connect(site + "/project", {
                query: "project=" + window.location.pathname.split("/").pop()
            })
        }
        return d.on("error", function(t) {
            return console.log(t.msg)
        }), d.on("update", function(t) {
            return d.emit("order-price", {
                ammount: $("#ammount").val()
            }), s(t)
        }), d.on("update-price-order", function(t) {
            return $("#order-price").text(t.price)
        }), Modernizr.canvas || $("#message-canvas").removeClass("hide"), $("#cv").get(0) && (f = new JSC3D.Viewer($("#cv").get(0)), f.setParameter("SceneUrl", "/" + project.filename), f.setParameter("ModelColor", "" + e[project.color]), f.setParameter("BackgroundColor1", "#E5D7BA"), f.setParameter("BackgroundColor2", "#383840"), f.setParameter("RenderMode", "smooth"), f.setParameter("Definition", "high"), f.setParameter("MipMapping", "on"), f.setParameter("CreaseAngle", "30"), f.onloadingcomplete = function() {
            return project.hasImage ? void 0 : setTimeout(function() {
                return $.post("/project/" + project.id + "/image/", {
                    image: $("#cv")[0].toDataURL()
                })
            }, 15e3)
        }, f.init(), f.update()), $("#color-chooser").val("" + project.color), $("#color-chooser").val("" + project.color).change(function() {
            return $.post("/project/color/" + project.id, {
                value: $(this).val()
            }, function() {
                return location.reload()
            })
        }), $("#material-chooser").val("" + project.material), $("#material-chooser").val("" + project.material).change(function() {
            return $.post("/project/material/" + project.id, {
                value: $(this).val()
            })
        }), $("#title").editable("/project/title/" + project.id), $("#ammount").keyup(function(t) {
            return (/\D/g.test(this.value) || /^0$/.test(this.value)) && (this.value = this.value.replace(/\D/g, ""), this.value = this.value.replace(/^0$/, "")), /^[1-9][0-9]*$/.test(this.value) || /^\s*$/.test(this.value) ? ($("#order-price").text("Processing"), d.emit("order-price", {
                ammount: $("#ammount").val()
            })) : t.preventDefault()
        }), l = function(t) {
            var e, n, i, r, o, a, s;
            return n = new Date(t), e = n.getDate(), a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], r = a[n.getMonth()], s = n.getFullYear(), i = n.getHours(), o = n.getMinutes(), e + "/" + r + "/" + s
        }, c = function(t) {
            var e, n, i, r, o, a, s;
            return n = new Date(t), e = n.getDate(), a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], r = a[n.getMonth()], s = n.getFullYear(), i = n.getHours(), o = n.getMinutes(), i + ":" + o
        }, $("#comment-button").click(function(t) {
            return t.preventDefault(), $.ajax({
                url: "/project/comment/" + project.id,
                method: "post",
                dataType: "json",
                data: {
                    message: $("#comment-text").val()
                },
                success: function(t) {
                    var e;
                    return e = "<div class='mine-chat media'>          <div class='media-body text-right'>            <div class='message'>" + i(t.content) + "</div>            <p class='meta'> By<strong> you</strong> at<strong> " + l(t.createdAt) + "</strong> at<strong> " + c(t.createdAt) + " pm</strong></p>          </div>          <div class='media-right'><a href='#'><img src='/" + t.photo + "' style='width:50px; height:50px' class='media-object'></a></div>        </div>", $("#comment-list").append($(e)), $("#comment-text").val("")
                },
                statusCode: {
                    400: function(t) {
                        return t = JSON.parse(t.responseText), alert(t.msg)
                    }
                }
            })
        }), p = function() {
            return t ? $.ajax({
                url: "/validate-address-and-rate/" + project.id,
                data: t,
                dataType: "json",
                success: function(e) {
                    var n;
                    if (e.errors)
                        for (n in e.errors) alert("" + e.errors[n].param + ": " + e.errors[n].msg);
                    return e.message && alert(e.message), e.ok ? (t = e.address, o = parseFloat(e.charge), $("#address-selection").hide(), $("#pay-values").show(), $("#pay-product-price").html("" + project.orderPrice), $("#pay-shipping-price").html("" + o), $("#pay-total-price").html("" + (project.orderPrice + o).toFixed(2))) : alert("Something was wrong please try again.")
                },
                error: function() {
                    return alert("Something was wrong please try again.")
                }
            }) : alert("Please select and address or add new one.")
        }, $("a.select-saved-address").click(function(e) {
            return e.preventDefault(), t = {
                id: $(this).attr("data-id")
            }, p()
        }), $("button#validate-address").click(function(e) {
            var n;
            return e.preventDefault(), t = {}, n = $(this).closest("form").serializeArray(), $.each(n, function() {
                t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]), t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
            }), p()
        }), $("#payment-form").submit(function(t) {
            var e;
            return t.preventDefault(), e = $("#payment-form"), r = "shipping", "shipping" === r ? $("#payment-modal").modal("show") : ($("#hidden-pay-form #shippingMethod").val(r), $("#hidden-pay-form").submit())
        }), $(".close-payment-modal").click(function() {
            return $("#payment-modal").modal("hide")
        }), $("#payment-modal").on("hidden.bs.modal", function() {
            return $("#address-selection").show(), $("#pay-values").hide(), t = null, r = null, o = null
        }), $("#pay-payment-modal").click(function() {
            return $("#hidden-pay-form #shippingRate").val(o), $("#hidden-pay-form #shippingMethod").val(r), $("#hidden-pay-form #shippingAddress").val(JSON.stringify(t)), $("#hidden-pay-form").submit()
        }), $("#printer-input").val("").blur(function() {
            var t;
            return t = $("#printer-input").typeahead("getActive"), t ? ($("#printer-input").val("" + t.username), $("#printer-input").closest("div").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>")) : void 0
        }), $("#printer-input").typeahead({
            delay: 300,
            source: function(t, e) {
                var n;
                return n = $("#printer-input").typeahead("getActive"), n && "" + n.username === t ? void 0 : $.get("/api/printers?q=" + t).done(function(t) {
                    return e(t), $("#printer-input").closest("div").find(".glyphicon").remove()
                })
            },
            matcher: function(t) {
                return ~(t.username.toLowerCase().indexOf(this.query.toLowerCase()) && t.email.toLowerCase().indexOf(this.query.toLowerCase()))
            },
            afterSelect: function() {
                var t;
                return $("#printer-input").closest("div").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>"), t = $("#printer-input").typeahead("getActive"), $("#printer-hidden").val(t._id)
            },
            displayText: function(t) {
                return "" + t.username
            }
        })
    })
}).call(this);

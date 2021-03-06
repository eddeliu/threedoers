(function() {
    $(document).ready(function() {
        var t, e;
        try {
            if (user.id) return e = io.connect(site + "/notification", {
                query: "user=" + user.id + ("undefined" != typeof project && null !== project ? "&project=" + project.id : "")
            }), e.on("new", function(t) {
                return $.growl({
                    title: "" + (t.title || "") + "<br>",
                    message: t.message
                }, {
                    type: t.type
                })
            })
        } catch (n) {
            return t = n, console.log(t)
        }
    })
}).call(this),
    function() {
        var t;
        t = function() {
            function t(t, e) {
                var n = this;
                this.form = t, this.validations = e, this.form = $(this.form), this.form.submit(function() {
                    return n.validate()
                })
            }
            return t.prototype._required = function(t, e) {
                var n, i;
                return i = t.val(), n = t.siblings("label").text(), this.message = e.message || "This field is required.", i ? !0 : !1
            }, t.prototype._regexp = function(t, e) {
                var n, i;
                return i = t.val(), n = t.siblings("label").text(), this.message = e.message || "This field is not valid.", i.match(e.test) ? !0 : !1
            }, t.prototype._match = function(t, e) {
                var n, i, r;
                return i = t.val(), r = $(e.test).val(), n = t.siblings("label").text(), this.message = e.message || "Value didn't match", i === r ? !0 : !1
            }, t.prototype.formatOptions = function(t) {
                return t.test || (t = {
                    tests: t
                }), t
            }, t.prototype.validate = function() {
                var t, e, n, i;
                n = !0;
                for (i in this.validations) {
                    t = this.form.find(i);
                    for (e in this.validations[i])
                        if (this["_" + e]) {
                            if (!this["_" + e](t, this.formatOptions(this.validations[i][e]))) {
                                this.form.trigger("error", [t, this.message]), n = !1;
                                break
                            }
                            this.form.trigger("valid", [t])
                        } else this.form.trigger("error", [t, "Validator '" + e + "' is not implemented"]), n = !1
                }
                return n
            }, t
        }(), this.Validator = t
    }.call(this);

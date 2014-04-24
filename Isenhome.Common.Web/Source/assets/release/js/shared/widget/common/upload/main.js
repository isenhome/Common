define("shared/widget/common/upload/main", ["jquery", "troopjs-core/component/widget", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "jquery.form"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this;
		b.html(e, {}, a)
	}
	function h(a) {
		var b = this,
		c = b.$element;
		b.config.multiple && b.$element.find('input[name="file"]').attr("multiple", "multiple"),
		b.$btnFile = c.find(".btn-file"),
		b.$progress = c.find(".progress"),
		b.$bar = c.find(".bar"),
		a.resolve()
	}
	var i = "/rest/file/upload";
	return b.extend(function (a, b, c, d) {
		var e = this;
		e.config = c,
		e.validate = d
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"sig/stop" : function (a, b) {
			var c = this;
			c.timeId && clearTimeout(c.timeId),
			b.resolve()
		},
		"dom/action.change.click" : a.noop,
		"dom/action/fileupload.change.click" : function (b, c) {
			var d = this,
			e = a(c.target),
			g = e[0].files,
			h = c.namespace,
			j = d.config,
			k = !0;
			if ("click" === h) {
				if (c.stopPropagation(), d.$element.find(".btn-file").hasClass("disabled"))
					return !1;
				if (j.beforeUpload)
					return j.beforeUpload()
			} else if ("change" === h) {
				if (j.validate) {
					for (var l = 0, m = g.length; m > l; l++)
						if (!j.validate(g[l]))
							return j.onValidateError && j.onValidateError(), k = !1, void 0;
					if (!k)
						return
				}
				var n = e.closest("form"),
				o = {
					url : i,
					type : "post",
					beforeSubmit : function (a, b, c) {
						d.$btnFile.addClass("hide"),
						d.$progress.removeClass("hide"),
						j.beforeSubmit && j.beforeSubmit(a, b, c)
					},
					uploadProgress : function (a, b, c, e) {
						d.$bar.css("width", e + "%"),
						j.uploadProgress && j.uploadProgress(a, b, c, e)
					},
					success : function (a) {
						d.timeId = setTimeout(function () {
								d.$btnFile.removeClass("hide"),
								d.$progress.addClass("hide"),
								d.$bar.css("width", 0)
							}, 500),
						j.success && (e.val(""), j.success(a))
					},
					error : function (a) {
						d.$btnFile.removeClass("hide"),
						d.$progress.addClass("hide"),
						f.alert("error", JSON.parse(a.responseText).message),
						j.error && j.error(a)
					}
				};
				j.data && a.extend(o, {
					data : {
						data : JSON.stringify(j.data)
					}
				}),
				j.model && a.extend(o, {
					data : {
						data : JSON.stringify({
							model : j.model
						})
					}
				}),
				j.url && a.extend(o, {
					url : j.url
				}),
				n.ajaxSubmit(o)
			}
		}
	})
})
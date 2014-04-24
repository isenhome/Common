define("app/widget/modal/add-floating-attachments/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "template!./items.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(c) {
		var d = this,
		g = function () {
			var a = [];
			return c.forEach(function (b) {
				a.push(b.id)
			}),
			a.join()
		}
		(),
		h = function (f) {
			var g;
			c.forEach(function (c) {
				g = f.filter(function (a) {
						return a.external_id === c.id
					});
				var h = a(e({
							title : c.name,
							items : g
						}));
				h.find("[data-weave]").weave(b().done(function () {
						d.$pane.append(h)
					}))
			})
		},
		i = function (a, b) {
			f.alert("error", "Load attachments error: " + b)
		};
		d.publish("ajax", {
			url : k.FILE_LIST.replace("<id>", g)
		}, b().done(h).fail(i))
	}
	function h() {
		var a = this;
		a.$pane.empty()
	}
	function i(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function j(a) {
		var b = this;
		b.$pane = b.$element.find(".tab-pane"),
		a.resolve()
	}
	var k = {
		FILE_LIST : "/rest/file/list/candidate/<id>"
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub:memory/context" : function (a, b) {
			this._user = b.user
		},
		"hub/modal/floating-attachments/show" : function (a, b, c, d) {
			var e = this,
			f = e.$element;
			e._hasAttachment = !c,
			e._modal = d,
			e._hasAttachment || (h.call(e), g.call(e, b)),
			e.$element.off("hidden"),
			e.$element.on("hidden", function () {
				e.publish(e._modal, {}, !0)
			}),
			f.modal("show")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/confirm.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = d.$element,
			f = [];
			d.attachmentArr ? f = d.attachmentArr : e.find("input:checked").each(function () {
					var b = this,
					c = a(b);
					f.push({
						id : b.value,
						name : c.parent().find(".file-type-icon").text().trim(),
						type : c.parent().find(".label")[0].outerHTML,
						external_id : c.data("external"),
						ext : c.data("ext")
					})
				}),
			d.publish("receive/floating-attachments", f),
			d.publish(d._modal, {}, !0),
			d._hasAttachment = !0,
			e.modal("hide")
		},
		"dom/action/attachment.change" : function (b, c) {
			var d = this,
			e = a(c.target),
			f = e.val();
			d.attachmentArr && (e.is(":checked") ? d.attachmentArr.push({
					id : f,
					name : e.parent().text().trim()
				}) : d.attachmentArr = a.grep(d.attachmentArr, function (a) {
						return a.id != f
					}))
		}
	})
})
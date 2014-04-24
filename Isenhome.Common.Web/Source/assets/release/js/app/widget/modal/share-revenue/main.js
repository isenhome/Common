define("app/widget/modal/share-revenue/main", ["compose", "jquery", "troopjs-utils/deferred", "troopjs-utils/when", "shared/widget/modal/base", "template!./main.html", "template!./user.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g, h, i) {
	function j(a, b) {
		for (var c, d = [], e = 0, f = b.length; f > e; e++)
			c = b[e].name || b[e].englishName, d.push("<option value='" + b[e].id + "'>" + c + "</option>");
		a.append(d.join(""))
	}
	function k(a) {
		var b = this;
		b.html(f, b._json, a)
	}
	function l(a) {
		var c = this,
		d = c.$element.find("form");
		c.$client = c.$element.find('[name="client"]'),
		c.$remaining = c.$element.find(".m-remaining"),
		c.$note = c.$element.find("[name=note]"),
		c.$tbody = c.$element.find("tbody"),
		b.get(m.CLIENT).done(function (a) {
			for (var b, d = [], e = 0, f = a.list.length; f > e; e++)
				b = a.list[e].name || a.list[e].englishName, d.push("<option value='" + a.list[e].id + "'>" + b + "</option>");
			c.$client.append(d.join(""))
		}),
		b.get(m.USER).done(function (a) {
			c._user = a,
			j(c.$element.find('select[name="user"]'), a)
		}),
		i(d, {
			rules : {
				client : {
					required : !0
				}
			}
		}),
		a.resolve()
	}
	var m = {
		CLIENT : "/rest/client/list?paginate_by=9999",
		USER : "/rest/data/userlist"
	};
	return e.extend(function () {}, {
		"sig/initialize" : function (a, b) {
			k.call(this, b)
		},
		"sig/start" : function (a, b) {
			l.call(this, b)
		},
		"hub/modal/share-revenue/show" : function (a, b) {
			var c = this;
			c._saveUrl = b.saveUrl,
			c._onSuccess = b.onSuccess,
			c.$element.modal("show")
		},
		"dom/action.click.change" : b.noop,
		"dom/action/save.click" : function (a, d) {
			d.preventDefault();
			var e = this,
			f = b(d.target),
			g = e.$element.find("form"),
			i = function () {
				var a = [];
				return e.$element.find('select[name="user"]').each(function () {
					var c = b(this).val();
					if (c) {
						var d = b(this).closest("td").next().find('input[name="revenue"]').val().trim();
						d && a.push({
							user_id : c,
							revenue : d,
							type : ""
						})
					}
				}),
				a
			}
			();
			if (!g.valid())
				return !1;
			var j = {
				client : {
					id : e.$client.val()
				},
				note : e.$note.val().trim(),
				assignments : i
			};
			e.$element.modal("hide"),
			e.publish("ajax", {
				url : e._saveUrl,
				data : {
					data : JSON.stringify(j)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e._onSuccess(a) : h.alert("error", "Share revenue error: " + a.message)
				}), f)
		},
		"dom/action/client.change" : function (a, c) {
			var d = this,
			e = b(c.target);
			d.$remaining.text(d.formatCurrency(e.find("option:selected").attr("data-remaining")) || "")
		},
		"dom/action/add/user.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = d.$element.find('select[name="user"]').prop("disabled", !0);
			d.$tbody.append(g());
			var f = d.$tbody.find('select[name="user"]').last();
			j(f, d._user),
			e.each(function () {
				var a = b(this).val();
				a && f.find('[value="' + b(this).val() + '"]').remove()
			})
		},
		"dom/action/remove/user.click" : function (a, c) {
			c.preventDefault();
			var d = this,
			e = b(c.target);
			e.closest("tr").remove(),
			d.$element.find('select[name="user"]').last().prop("disabled", !1)
		}
	})
})
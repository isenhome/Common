define("app/widget/modal/mass-edit/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/blurb"], function (a, b, c, d, e, f) {
	function g(a) {
		var c = this;
		c.publish("ajax", {
			url : i.STATUS
		}, b().done(function (b) {
				c._json.status = b,
				c.html(d, c._json, a)
			}))
	}
	function h(a) {
		var b = this,
		c = b.$element.find("form");
		b.$gender = c.find('[name="gender"]:radio'),
		b.$tags = c.find('[name="tags"]'),
		b.$mpc = c.find('[name="mpc"]'),
		b.$city = c.find('[name="city"]'),
		b.$location = c.find('[name="location"]'),
		b.$owner = c.find('[name="owner"]'),
		b.$folder = c.find('[name="folder"]'),
		b.$status = c.find('[name="status"]'),
		b.$function = c.find('[name="function"]'),
		b.$function.woven()[0],
		b.$city.woven()[0],
		b.$location.woven()[0],
		b.$folder.woven()[0],
		b.$element.on("hidden", function () {
			b.$owner.val("").trigger("change")
		}),
		a.resolve()
	}
	var i = {
		EDIT : "/rest/candidate/batch_edit",
		STATUS : "/rest/data/options?type=candidate_status"
	},
	j = {
		SUCCESSFUL : f.t("Operate successfully")
	};
	return c.extend({
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			h.call(this, b)
		},
		"hub/modal/mass-edit/show" : function (a, b, c) {
			var d = this;
			d._ids = b,
			d._onSuccess = c,
			d.$element.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = a(d.target),
			h = function () {
				var b = [];
				return f.$element.find('[name="share_with"]').each(function () {
					var c = a(this),
					d = c.val(),
					e = function () {
						var a;
						return c.next().find("select").length ? a = c.next().find("select").val() : c.next().find("input").length && (a = c.next().find("input").val()),
						a
					}
					();
					b.push({
						type : d,
						value : e
					})
				}),
				b
			}
			(),
			k = function () {
				var a = null;
				return f.$gender.filter(":checked").length && (a = "true" === f.$gender.filter(":checked").val()),
				a
			}
			(),
			l = parseInt(f.$mpc.filter(":checked").val(), 10),
			m = {
				gender : k,
				tags : f.$tags.val(),
				location : f.$location.val(),
				city : f.$city.val(),
				owner : f.$owner.val(),
				shares : h,
				is_mpc : "number" == typeof l ? l : null,
				folder_id : f.$folder.val(),
				status : f.$status.val(),
				"function" : f.$function.val()
			};
			f.publish("ajax", {
				url : i.EDIT,
				data : {
					data : JSON.stringify({
						ids : f._ids,
						data : m
					})
				},
				type : "post"
			}, b().done(function (a) {
					f.$element.modal("hide"),
					a.status ? (f._onSuccess && f._onSuccess(), e.alert("success", j.SUCCESSFUL)) : e.alert("error", a.message)
				}), g)
		}
	})
})
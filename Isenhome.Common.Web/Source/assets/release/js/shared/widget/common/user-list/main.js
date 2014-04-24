define("shared/widget/common/user-list/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e, f) {
	function g(a) {
		var b = this,
		e = i.USER_LIST;
		b.role && (e += "?role=" + b.role),
		b._list ? (b._json = b._list, b.html(d, b._json, a)) : b.publish("ajax", {
			url : e
		}, c().done(function (a) {
				a.length && (b._json = a)
			}).then(function () {
				b.html(d, b._json, a)
			}))
	}
	var h,
	i = {
		USER_LIST : "/rest/data/userlist"
	},
	j = {
		PLACEHOLDER : f.t("Please select")
	};
	return b.extend(function (b, c, d, e) {
		var f = this;
		f.role = f.$element.data("role"),
		"number" == typeof d && (f._id = d, f._list = e),
		a.isArray(d) && (f._list = d)
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$element.select2("destroy"),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			c._id !== h ? c.$element.val(c._id || "").select2({
				placeholder : j.PLACEHOLDER,
				allowClear : !0
			}) : c.$element.val(c._userId).select2({
				placeholder : j.PLACEHOLDER,
				allowClear : !0
			})
		}
	})
})
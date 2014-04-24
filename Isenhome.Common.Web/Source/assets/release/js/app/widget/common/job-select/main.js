define("app/widget/common/job-select/main", ["jquery", "shared/widget/modal/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e) {
	function f(b) {
		var c = b.element,
		d = "",
		f = a(c).data("type");
		return !f || "client" !== f && "bding" !== f || (d = ' (<span class="red">' + e.t(f + " company") + "</span>)"),
		b.text + d
	}
	function g(a) {
		var b = this,
		d = j.JOBLIST.replace("<type>", b._type);
		b._id && (d += b._id),
		b.publish("ajax", {
			url : d
		}, c().done(function (c) {
				b._json = c,
				h.call(b, a)
			}))
	}
	function h(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function i(a) {
		var b = this;
		b.$element.select2({
			placeholder : e.t("Please select"),
			allowClear : !0,
			formatResult : f,
			formatSelection : f,
			escapeMarkup : function (a) {
				return a
			}
		}),
		a.resolve()
	}
	var j = {
		JOBLIST : "rest/joborder/livejobs?<type>="
	};
	return b.extend(function (b) {
		this._type = a(b).data("type"),
		this._id = a(b).data("typeId")
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$element.select2("destroy"),
			b.resolve()
		}
	})
})
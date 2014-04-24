define("app/widget/system/route", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b) {
	function c() {
		var a = this,
		b = a.$element;
		b.html(""),
		b.append("<div></div>"),
		b.find("div").attr("data-weave", "app/widget/system/" + a.type + "/main").weave()
	}
	var d = /^type=[-a-zA-Z]+$/i;
	return b.extend({
		"hub:memory/route" : function (a, b) {
			var e = this;
			b.source && d.test(b.source) ? (e.type = b.source.split("=")[1], c.call(e)) : window.location.hash = "type=company-info"
		}
	})
})
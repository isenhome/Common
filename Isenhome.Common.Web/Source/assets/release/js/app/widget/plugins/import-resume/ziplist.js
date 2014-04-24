define("app/widget/plugins/import-resume/ziplist", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./ziplist.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.publish("ajax", {
			url : f.ZIP
		}, c().done(function (a) {
				b._json.zip = a
			}).done(function () {
				b.html(d, b._json, a)
			}))
	}
	var f = {
		ZIP : "/rest/importer/listzip"
	};
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"hub:memory/plugins/import-resume/ziplist/reload" : function () {
			var a = c(),
			b = this;
			a.done(function () {
				b.$element.find(":radio").eq(1).trigger("click")
			}),
			e.call(b, a)
		},
		"dom/action.change" : a.noop,
		"dom/action/zip/select.change" : function (a, b, c) {
			var d = this;
			d.publish("plugins/import-resume/change/zip", c)
		}
	})
})
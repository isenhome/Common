define("app/widget/system/attachment-type/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, a)
	}
	function f(a) {
		var b = this,
		c = b.$element;
		c.find('a[href="#company-tab"]').one("show", function () {
			c.find("#company-tab").attr("data-weave", g + '("client_attachment_category")').weave()
		}),
		c.find('a[href="#job-tab"]').one("show", function () {
			c.find("#job-tab").attr("data-weave", g + '("joborder_attachment_category")').weave()
		}),
		a.resolve()
	}
	var g = "app/widget/system/attachment-type/tab/main";
	return b.extend({
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		}
	})
})
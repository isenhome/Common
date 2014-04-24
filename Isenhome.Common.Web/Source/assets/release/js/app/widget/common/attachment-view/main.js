define("app/widget/common/attachment-view/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "template!./item.html", "shared/helper/utils", "bootstrap.editable"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	return b.extend(function (b, c, d, e, f, g) {
		var h = this;
		h._json.attachment_count = d,
		h._type = e,
		h._id = f,
		h._readOnly = g,
		h._paste = a(b).data("paste")
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			var c = this;
			c.$count = c.$element.find(".count"),
			b.resolve()
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			c._allowDownload = "1" === b.config.attachment_allow_download
		},
		"dom/action.click" : a.noop,
		"dom/action/show/attachments.click" : function (b, c) {
			var d = this;
			a(c.target);
			var e = a("body"),
			f = e.find(".dropdown-resume"),
			g = c.originalEvent.pageX,
			h = c.originalEvent.pageY;
			f.length && f.remove(),
			e.append('<div class="dropdown-menu dropdown-resume"></div>'),
			f = e.find(".dropdown-resume"),
			f.css({
				positon : "absolute",
				left : g,
				top : h,
				display : "block"
			}),
			f.data("$count", d.$count).data("paste", d._paste).data("userId", d._userId).data("type", d._type).data("id", d._id).data("readOnly", d._readonly).data("allowDownload", d._allowDownload).attr("data-weave", "app/widget/common/attachment-view/resume").weave()
		}
	})
})
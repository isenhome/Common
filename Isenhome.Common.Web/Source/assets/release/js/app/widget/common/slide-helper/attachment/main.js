define("app/widget/common/slide-helper/attachment/main", ["jquery", "shared/widget/common/slide-helper/base", "troopjs-utils/deferred", "template!./main.html", "hilitor"], function (a, b, c, d) {
	function e(a) {
		var b = this;
		b.html(d, b._json, a)
	}
	function f(a) {
		var b = this,
		c = b.$element;
		b.$content = c.find(".slide-content"),
		b.$frame = c.find("#attachment-frame"),
		b.$countInfo = b.$element.find(".count-info"),
		b.$count = b.$countInfo.find("strong"),
		b.$frame.on("load", function () {
			c.addClass("open max").removeClass("min"),
			b.$content.removeClass("widget-spin")
		}),
		a.resolve()
	}
	var g = {
		PREVIEW : "/rest/file/preview/<uuidname>",
		IMPORTER_PREVIEW : "/rest/importer/preview?f=<filename>",
		FULL_PREVIEW : "/document/preview#file=<uuidname>",
		FIND : "/rest/document/find_candidate?uuidname=<uuidname>",
		DOWNLOAD : "/rest/file/download/<uuidname>",
		PREVIEW_PDF : "/rest/file/download/<uuidname>?as_attachment=0"
	};
	return b.extend(function (a, b, c) {
		this._json.hasCheck = c
	}, {
		"sig/initialize" : function (a, b) {
			e.call(this, b)
		},
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"hub/slide-helper/attachment/reload" : function (a, b, c, d) {
			var e,
			f = this,
			h = f.$element;
			f._uuidname = b,
			f._ext = d,
			f.publish("slide/helper/close"),
			h.removeClass("hide"),
			f.$content.addClass("widget-spin"),
			f.$countInfo.addClass("hide"),
			e = c && "importer" === c ? g.IMPORTER_PREVIEW.replace("<filename>", b) : d && "pdf" === d.toLowerCase() ? g.PREVIEW_PDF.replace("<uuidname>", b) : g.PREVIEW.replace("<uuidname>", b),
			f.$frame.attr("src", e)
		},
		"dom/action/attachment/helper/print.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$frame.get(0).contentWindow.print()
		},
		"dom/action/attachment/helper/popup.click" : function (a, b) {
			b.preventDefault();
			var c,
			d = this;
			c = d._ext && "pdf" === d._ext.toLowerCase() ? g.PREVIEW_PDF.replace("<uuidname>", d._uuidname) : g.FULL_PREVIEW.replace("<uuidname>", d._uuidname),
			this.$element.addClass("hide"),
			window.open(c, "taget=_blank")
		},
		"dom/action/attachment/helper/find.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = new Hilitor("attachment-frame", null, !0);
			e.publish("ajax", {
				url : g.FIND.replace("<uuidname>", e._uuidname)
			}, c().done(function (b) {
					var c,
					d = [];
					if (b.email)
						for (c in b.email)
							d.push(c);
					if (b.mobile)
						for (c in b.mobile)
							d.push(c);
					e.$countInfo.removeClass("hide"),
					e.$count.text(b.count),
					f.apply(d.join(" ")),
					a(".hilitor", frames[0].document).on("click", function (c) {
						c.preventDefault(),
						c.stopPropagation();
						var d = a(this).text();
						b.email[d] && window.open("/candidate#detail!id=" + b.email[d], 'target="_blank"'),
						b.mobile[d] && window.open("/candidate#detail!id=" + b.mobile[d], 'target="_blank"')
					})
				}))
		}
	})
})
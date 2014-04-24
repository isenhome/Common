define("app/widget/document/preview/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "troopjs-utils/when", "template!./main.html", "shared/helper/utils", "hilitor"], function (a, b, c, d, e) {
	function f() {
		var a = this,
		b = i.PREVIEW.replace("<uuidname>", a._uuidname);
		a.$element.addClass("widget-spin"),
		a.$frame.attr("src", b)
	}
	function g(a) {
		var b = this;
		c(function (a) {
			b.html(e, a)
		}).done(function () {
			h.call(b, a)
		})
	}
	function h(a) {
		var b = this;
		b.$frame = b.$element.find("iframe"),
		b.$countInfo = b.$element.find(".count-info"),
		b.$count = b.$countInfo.find("strong"),
		b.$frame.on("load", function () {
			b.$element.removeClass("widget-spin"),
			b.$frame.height(b.$frame.contents().height())
		}),
		a.resolve()
	}
	var i = {
		PREVIEW : "/rest/file/preview/<uuidname>",
		FIND : "/rest/document/find_candidate?uuidname=<uuidname>"
	};
	return b.extend(function (a, b, c) {
		this._uuidname = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"hub:memory/route" : function (a, b) {
			var c = this,
			d = b.path,
			e = d ? d[0] : null;
			e && (c.$countInfo.addClass("hide"), c._uuidname = e ? e.split("=")[1] : "", f.call(c))
		},
		"dom/action.click" : a.noop,
		"dom/action/find/duplicate.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = new Hilitor("attachment-frame", null, !0);
			e.publish("ajax", {
				url : i.FIND.replace("<uuidname>", e._uuidname)
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
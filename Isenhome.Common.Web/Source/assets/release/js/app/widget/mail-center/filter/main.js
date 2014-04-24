define("app/widget/mail-center/filter/main", ["jquery", "shared/widget/filter/base", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils", "shared/widget/filter/query", "shared/helper/blurb"], function (a, b, c, d, e, f, g) {
	function h() {
		f.addAttr({
			subject__icontains : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("subject__icontains", "subject__icontains=" + encodeURIComponent(b))
			},
			category : function (a) {
				var b = a.find("select").val().trim();
				b.length && this.addQuery("category", "category=" + encodeURIComponent(b))
			},
			status : function (a) {
				var b = a.find("select").val().trim();
				"0" !== b && this.addQuery("status", "status=" + encodeURIComponent(b))
			},
			status__eq : function (a) {
				var b = a.find('[name="status__eq"]:checked').val();
				"undefinde" != typeof b && this.addQuery("status__eq", "status__eq=" + encodeURIComponent(b))
			},
			_from__icontains : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("_from__icontains", "_from__icontains=" + encodeURIComponent(b))
			},
			to__icontains : function (a) {
				var b = a.find("input").val().trim();
				b.length && this.addQuery("to__icontains", "to__icontains=" + encodeURIComponent(b))
			},
			folder_id : function (a) {
				var b = a.find('[name="folder_id"]').val();
				b.length && this.addQuery("folder_id", "folder_id=" + b)
			},
			has_attachment : function (a) {
				var b = a.find('[name="has_attachment"]:checked').val();
				"undefinde" != typeof b && this.addQuery("has_attachment", "has_attachment=" + b)
			}
		})
	}
	function i(a) {
		var b = this;
		c(function (a) {
			b.html(d, this._json, a)
		}).done(function () {
			j.call(b, a)
		})
	}
	function j(a) {
		var b = this;
		b.folderWidget = b.$element.find('[data-name="folder_id"]').woven()[0],
		a.resolve()
	}
	function k(a) {
		var b,
		c = this,
		d = a[0],
		e = a[1];
		switch (d) {
		case "mbox":
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(m[e]),
			f.addQuery(d, d + "=" + e);
			break;
		case "status__eq":
		case "has_attachment":
			b = c.$element.find('[name="' + d + '"]').filter('[value="' + e + '"]').next().text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "status":
		case "category":
			b = c.$element.find('select[name="' + d + '"]').find('[value="' + decodeURIComponent(e) + '"]').text(),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "folder_id":
			b = c.folderWidget.getNodeNameById(e),
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(b),
			f.addQuery(d, d + "=" + e);
			break;
		case "byfilter":
			break;
		default:
			c.$element.find('[data-query="' + d + '"]').removeClass("hide").find("span").text(window.decodeURIComponent(e)),
			f.addQuery(d, d + "=" + e)
		}
	}
	function l() {
		var a = this;
		a._setFilter = k
	}
	var m = {
		inbox : g.t("Inbox"),
		sending : g.t("Sending Box"),
		outbox : g.t("Sent Box"),
		draft : g.t("Drafts"),
		trash : g.t("Trash")
	};
	return b.extend(function () {
		var a = this;
		l.call(a),
		h.call(a)
	}, {
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"dom/action.click" : a.noop
	})
})
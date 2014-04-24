define("app/widget/modal/setting-email/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		b.html(d, a)
	}
	function g(a) {
		var b = this,
		c = b.$element;
		b.$email = c.find('[name="email-name"]'),
		b.$subject = c.find('[name="subject"]'),
		b.$editor = c.find("textarea"),
		b.$form = c.find("form"),
		b.editor = CKEDITOR.instances["setting-content"],
		a.resolve()
	}
	return c.extend({
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"sig/start" : function (a, b) {
			g.call(this, b)
		},
		"hub/modal/setting-email/show" : function (a, b, c, d, e, f, g, h, i, j) {
			var k = this,
			l = k.$element;
			k._url = b,
			k._onSuccess = c,
			k.$email.attr("name", d),
			k._userId = j,
			e ? (k.$email.val(f).data("id", e), k.$subject.val(g), k.editor.setData(h)) : (k.$email.val("").data("id", ""), k.$subject.val(""), k.editor.setData("")),
			l.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/setting/popup/save.click" : function (c, d) {
			d.preventDefault();
			var f = this,
			g = f.$element,
			h = a(d.target),
			i = f.$email.data("id"),
			j = f.$email.val(),
			k = f.$email.attr("name"),
			l = f.$subject.val(),
			m = {},
			n = f.editor.getData();
			if (f.$form.valid()) {
				if (!n)
					return f.editor.focusManage.focus(), void 0;
				m = {
					type : k,
					name : j,
					title : l,
					content : n,
					user_id : f._userId
				},
				i && (m.id = i),
				f.publish("ajax", {
					url : f._url,
					data : {
						data : JSON.stringify(m)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? (f._onSuccess && f._onSuccess(), e.alert("success", "Update [ " + j + " ] success.")) : e.alert("error", a.message)
					}), h)
			}
		}
	})
})
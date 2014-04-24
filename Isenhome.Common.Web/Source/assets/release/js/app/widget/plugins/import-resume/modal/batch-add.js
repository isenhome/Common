define("app/widget/plugins/import-resume/modal/batch-add", ["jquery", "config", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./batch-add.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g() {
		var b,
		c,
		d,
		e = this;
		e.$closeBtn.addClass("hide"),
		e.$startBtn.addClass("hide"),
		e.$abortBtn.removeClass("hide"),
		e.items.length && a.ajax({
			url : k.IMPORT,
			data : {
				data : JSON.stringify(e._data.splice(0, l))
			},
			type : "POST"
		}).done(function (a) {
			a.status ? (b = parseInt(e.$current.text(), 10) + a.data.length, c = parseInt(e.$successes.text(), 10) + a.data.filter(function (a) {
						return a
					}).length, d = b - c, e.$current.text(b), e.$successes.text(c), e.$fails.text(d), e._data.length && m ? g.call(e) : setTimeout(function () {
					window.location.reload()
				}, 1e3)) : (h.call(e), f.alert("info", "导入已完成！共" + b + "条数据,成功导入" + c + "条, 失败" + d + "条.", !1))
		}).fail(function (a, b) {
			f.alert("error", b)
		})
	}
	function h() {
		var a = this;
		a.$element.modal("hide"),
		m = !1
	}
	function i(a) {
		var b = this;
		b.html(e, b._json, a)
	}
	function j(a) {
		var b = this,
		c = b.$element;
		b.$industry = c.find('[name="industry"]'),
		b.$owner = c.find('[name="owner"]'),
		b.$fn = c.find('[name="function"]'),
		b.$tag = c.find('[name="tag"]'),
		b.$source = c.find('[name="source"]'),
		b.$form = c.find("form"),
		b.$process = c.find(".process"),
		b.$current = c.find(".current"),
		b.$successes = c.find(".successes"),
		b.$fails = c.find(".fails"),
		b.$closeBtn = c.find(".btn-close"),
		b.$abortBtn = c.find(".abort"),
		b.$startBtn = c.find(".start"),
		c.on("hidden", function () {
			b.$form.removeClass("hide"),
			b.$process.addClass("hide"),
			b.$closeBtn.removeClass("hide"),
			b.$startBtn.removeClass("hide"),
			b.$abortBtn.addClass("hide"),
			m = !1
		}),
		a.resolve()
	}
	var k = {
		IMPORT : "/rest/candidate/batchadd"
	},
	l = 2,
	m = !0;
	return d.extend({
		shareType : b.shareType,
		"sig/initialize" : function (a, b) {
			i.call(this, b)
		},
		"sig/start" : function (a, b) {
			j.call(this, b)
		},
		"hub/plugins/import-resume/modal/batch-add/show" : function (a, b, c) {
			var d = this,
			e = d.$element,
			f = b.length;
			d.items = b,
			d.onSuccess = c,
			d.$element.find(".total").text(f),
			e.modal("show")
		},
		"dom/action.click" : a.noop,
		"dom/action/start.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = function () {
				var b = [];
				return a('[name="share_with"]').each(function () {
					var c = a(this),
					d = c.val(),
					e = c.next().find(a("input").add("select")).val();
					b.push({
						type : d,
						value : e
					})
				}),
				b
			}
			(),
			f = {
				source_id : d.$source.val() || "",
				owner_id : d.$owner.val(),
				industry_id : d.$industry.val() || "",
				function_id : d.$fn.val() || "",
				tags : d.$tag.val(),
				shares : e
			};
			d._data = [],
			a.each(d.items, function (b, c) {
				d._data.push(a.extend({}, c, f))
			}),
			d.$form.addClass("hide"),
			d.$process.removeClass("hide"),
			g.call(d)
		},
		"dom/action/close.click" : function (a, b) {
			b.preventDefault(),
			h.call(this)
		}
	})
})
define("app/widget/floating/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./item.html", "shared/helper/utils", "shared/helper/blurb", "bootstrap.editable"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		c(function (a) {
			b.html(d, b._json, a)
		}).done(function () {
			g.call(b, a)
		})
	}
	function g(b) {
		var c = this;
		c.$element.find("a.note").editable({
			emptytext : "未填写",
			url : h.EDIT,
			params : function (a) {
				return a.note = a.value,
				a.id = a.pk,
				delete a.value,
				delete a.pk,
				delete a.name, {
					data : JSON.stringify(a)
				}
			},
			success : function (a) {
				a.status ? e.alert("success", "备注修改成功!") : e.alert("error", a.message)
			},
			error : function (a) {
				var b = JSON.parse(a.responseText);
				e.alert("error", b.message)
			}
		}),
		c.$element.find("a.feedback").editable({
			emptytext : "未知",
			source : h.FEEDBACK,
			sourceCache : !0,
			url : h.EDIT,
			params : function (a) {
				return a.feedback = a.value,
				a.id = a.pk,
				delete a.value,
				delete a.pk,
				delete a.name, {
					data : JSON.stringify(a)
				}
			},
			success : function (b) {
				b.status ? a(this).css("color", b.data.feedback.color).text(b.data.feedback.value) : e.alert("error", b.message)
			},
			error : function (a) {
				var b = JSON.parse(a.responseText);
				e.alert("error", b.message)
			}
		}),
		b.resolve()
	}
	var h = {
		EDIT : "/rest/floating/edit",
		FEEDBACK : "/rest/data/options?type=floating_feedback"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._json = c,
		d._feedback = []
	}, {
		"sig/initialize" : function (a, b) {
			f.call(this, b)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/open/profile.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		},
		"dom/action/check/one.click" : function (b, d) {
			var f = this,
			g = a(d.target),
			i = {
				id : f._json.id,
				done : null
			};
			i.done = g.is(":checked") ? !0 : !1,
			f.publish("ajax", {
				url : h.EDIT,
				data : {
					data : JSON.stringify(i)
				},
				type : "post"
			}, c().done(function (a) {
					a.status ? e.alert("success", "状态更新成功!") : e.alert("error", a.message)
				}))
		}
	})
})
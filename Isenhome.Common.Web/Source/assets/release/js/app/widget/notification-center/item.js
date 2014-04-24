define("app/widget/notification-center/item", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./item.html"], function (a, b, c, d, e) {
	function f(a) {
		var b = this;
		c(function (a) {
			b.html(e, b._json, a)
		}).then(function () {
			a.resolve()
		})
	}
	var g = {
		ADD_SHARE : "/rest/candidate/<id>/addshare"
	};
	return b.extend(function (a, b, c) {
		var d = this;
		d._json = c
	}, {
		"sig/initialize" : function (a, b) {
			var c = this;
			f.call(c, b)
		},
		"dom/action.click" : a.noop,
		"dom/action/confirm/share.click" : function (b, e, f, h, i) {
			e.preventDefault();
			var j = this,
			k = a(e.target),
			l = window.confirm("确认要共享此候选人?");
			l && j.publish("ajax", {
				url : g.ADD_SHARE.replace("<id>", f),
				data : {
					data : JSON.stringify({
						shares : [{
								type : "people",
								value : h
							}
						],
						message_id : i
					})
				},
				type : "post",
				dataType : "json"
			}, c().done(function (a) {
					if (a.status) {
						var b = k.closest(".pull-right");
						b.text("已共享")
					} else
						d.alert("error", "Share candidate error.")
				}))
		},
		"dom/action/profile/open.click" : function (b, c) {
			c.preventDefault();
			var e = a(c.target),
			f = e.attr("href");
			d.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})
define("app/widget/common/share-request/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./main.html", "shared/helper/utils"], function (a, b, c, d, e, f) {
	function g(a, b) {
		var c = this;
		c.html(e, b || c._json, a)
	}
	return c.extend(function (a, b, c) {
		var d = this;
		d._json = c
	}, {
		"sig/initialize" : function (a, b) {
			g.call(this, b)
		},
		"dom/action.click" : b.noop,
		"dom/action/auto/share.click" : function (a, c) {
			c.preventDefault();
			var e = this,
			f = b(c.target),
			h = f.closest(".control-group"),
			i = h.find("input"),
			j = i.attr("name"),
			k = i.val();
			e.publish("modal/auto-share/show", {
				type : j,
				val : k,
				onSuccess : function () {
					e.publish("ajax", {
						url : "/rest/candidate/check",
						type : "post",
						data : {
							data : JSON.stringify({
								type : j,
								value : k
							})
						}
					}, d().done(function (a) {
							var b = a.data;
							g.call(e, d(), {
								islimited : !1,
								candidate : {
									englishName : b.englishName,
									chineseName : b.chineseName,
									id : b.id,
									company : b.company,
									title : b.title
								},
								owner : {
									englishName : b.owner.englishName,
									chineseName : b.owner.chineseName,
									id : b.owner.id
								}
							})
						}))
				}
			})
		},
		"dom/action/merge/attachment.click" : function (a, c) {
			c.preventDefault();
			var d = this;
			d.publish("merge/attachment", d._json.candidate.id, b(c.target))
		},
		"dom/action/edit/this.click" : function (a, b, c) {
			b.preventDefault(),
			window.location.hash = "add!id=" + c
		},
		"dom/action/profile/open.click" : function (a, c) {
			c.preventDefault();
			var d = b(c.target),
			e = d.attr("href");
			f.window({
				url : e,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})
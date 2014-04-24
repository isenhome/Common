define("app/widget/shortlist/history", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./history.html"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.publish("ajax", {
			url : h.CATEGORY
		}, c().done(function (b) {
				a._category = {},
				b.forEach(function (b) {
					a._category[b.code] = {
						value : b.value,
						color : b.color
					}
				}),
				c(function (b) {
					a.html(e, a._json, b)
				}).done(function () {
					g.call(a)
				})
			}))
	}
	function g() {
		var a = this,
		b = a.$element.find("dd"),
		c = b.length - 1;
		a.view || (a.$element.find("button.edit-interview").eq(0).removeClass("hide"), a.$element.find("button.send-confirm").eq(0).removeClass("hide")),
		a._json.forEach(function (a, d) {
			b.eq(c - d).data("json", a)
		})
	}
	var h = {
		CATEGORY : "/rest/data/options?type=candidate_note_category"
	};
	return b.extend(function (b, c, d, e) {
		this._json = d,
		this._users = function () {
			var c = [];
			return a(b).data("users") && a(b).data("users").forEach(function (a) {
				c.push(a.user.id)
			}),
			c
		}
		(),
		"view" === e && (this.view = !0)
	}, {
		"hub:memory/context" : function (a, b) {
			var c = b.user;
			this.userId = c.id,
			f.call(this)
		},
		getCommentLblClr : function (a) {
			return this._category[a] ? this._category[a].color : ""
		},
		getCommentVal : function (a) {
			return this._category[a] ? this._category[a].value : ""
		},
		isInUsers : function (a) {
			return this._users.indexOf(a) > -1
		}
	})
})
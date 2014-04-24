define("shared/widget/header/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html", "config"], function (a, b, c, d, e, f) {
	function g() {
		var b = this;
		b.html(e, b._json, c().done(function () {
				b.$search = b.$element.find(".quick-search"),
				b.$rightNav = b.$element.find(".right-nav"),
				b.$input = b.$search.find('input[name="name"]'),
				a(".dropdown-menu li").each(function () {
					var b = a(this);
					b.children("ul").length && (b.addClass("sub-dropdown"), b.children("ul").addClass("sub-menu"))
				}),
				a(".sub-dropdown").on("mouseenter", function () {
					a(this).addClass("active").children("ul").addClass("sub-open")
				}).on("mouseleave", function () {
					a(this).removeClass("active").children("ul").removeClass("sub-open")
				})
			}))
	}
	var h = {
		LOGOUT : "/rest/user/logout",
		PEOPLE : "/candidate#detail!id="
	};
	return b.extend(function () {
		this._linkedinCountDown = f.userContext.system.linkedin
	}, {
		config : f,
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._json = b,
			g.call(c)
		},
		"dom/action.click.focusout.submit" : a.noop,
		"dom/action/logout.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			f = a(d.target).attr("href");
			e.publish("ajax", {
				url : h.LOGOUT
			}, c().done(function () {
					location.href = f
				}))
		},
		"hub/header/quick/search/show" : function () {
			var a = this;
			a.$rightNav.removeClass("hide")
		},
		"dom/action/quick/search/show.click" : function (a, b) {
			b.preventDefault();
			var c = this;
			c.$rightNav.addClass("hide"),
			c.publish("quick/search/show")
		}
	})
})
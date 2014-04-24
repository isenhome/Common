define("app/widget/user/my-profile/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!app/widget/user/detail/main.html", "shared/helper/utils"], function (a, b, c, d) {
	return b.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.html(d, b.user)
		}
	})
})
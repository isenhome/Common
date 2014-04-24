define("shared/widget/common/tagit/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "jquery.tagit"], function (a, b, c) {
	function d(b) {
		var d,
		f = this,
		g = {
			readOnly : f.readOnly,
			editable : f.editable,
			tagLimit : f.tagLimit,
			allowSpaces : !0,
			onSaveTags : f.onSaveTags
		};
		f.type && (d = e.replace("<type>", f.type), a.extend(!0, g, {
				allowSpaces : !0,
				autocomplete : {
					minLength : 2,
					source : function (a, b) {
						var e = this,
						g = e.element.tagit("assignedTags");
						f.publish("ajax", {
							url : d.replace("<name>", window.encodeURIComponent(a.term))
						}, c().done(function (a) {
								var c = [];
								a.forEach(function (a) {
									g.indexOf(a) < 0 && c.push(a)
								}),
								b(c)
							}))
					}
				}
			})),
		f.$element.tagit(g),
		b.resolve()
	}
	var e = "/rest/data/autocomplete?type=<type>&name=<name>";
	return b.extend(function (a, b, c, d, e) {
		this.type = this.$element.data("type"),
		this.tagLimit = this.$element.data("max"),
		this.readOnly = c,
		this.editable = d,
		this.onSaveTags = e
	}, {
		"sig/initialize" : function (a, b) {
			d.call(this, b)
		}
	})
})
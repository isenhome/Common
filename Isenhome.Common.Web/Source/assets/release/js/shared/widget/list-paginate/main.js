define("shared/widget/list-paginate/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils"], function (a, b, c, d) {
	var e = "make/route",
	f = {
		LISTVIEW : "/rest/user/listview"
	};
	return b.extend(function (a, b, c) {
		this._listType = c
	}, {
		"dom/action.change" : a.noop,
		"dom/action/paginate.change" : function (b, c) {
			var d = this,
			f = a(c.target).val();
			d.publish(e, {
				paginate : f
			})
		},
		"hub:memory/paginate/set" : function (a, b) {
			var e = this;
			e.publish("ajax", {
				url : f.LISTVIEW,
				data : {
					data : JSON.stringify({
						list : e._listType,
						key : "paginate",
						value : b
					})
				},
				type : "post"
			}, c().done(function (a) {
					a.status || d.alert("error", a.message)
				})),
			e.$element.val(b)
		}
	})
})
define("shared/widget/filter/query", ["troopjs-utils/deferred", "shared/helper/utils"], function (a, b) {
	var c = {
		url : "",
		items : {},
		toString : function () {
			var a = [];
			for (var b in this.items)
				a.push(this.items[b]);
			return a.join("&")
		},
		addAttr : function (a) {
			for (var b in a)
				c[b] || (c[b] = a[b])
		},
		addQuery : function (a, b) {
			a && (this.items[a] = b)
		},
		deleteQuery : function (a) {
			delete this.items[a]
		},
		save : function (d) {
			var e = this,
			f = {
				query : window.decodeURIComponent(c.toString()),
				name : d,
				count : 0
			};
			if (!c.url)
				throw "Url is empty!";
			e.publish("ajax", {
				url : c.url,
				data : {
					data : JSON.stringify(f)
				},
				type : "post",
				dataType : "json"
			}, a().done(function (a) {
					a.status ? (b.alert("success", "New search is added successfully!"), f.id = a.data, e.publish("saved/filter/add", f), e.$element.find(".save-filter-form").addClass("hide")) : b.alert("error", a.message)
				}))
		},
		reset : function () {
			for (var a in this.items)
				this.deleteQuery(a)
		}
	};
	return c
})
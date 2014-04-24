define("app/widget/company/detail/note-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.publish("ajax", {
			url : h.REMARK.replace("<id>", a._cid)
		}, c().done(function (b) {
				a._json = b.list,
				a.html(e, a._json, c().done(function () {
						g.call(a)
					}))
			}))
	}
	function g() {
		var a = this;
		d.widgetLoaded.call(a)
	}
	var h = {
		REMARK : "/rest/note/list?paginate_by=200&external_type=client&external_id=<id>"
	};
	return b.extend(function (a, b, c) {
		this._reference = c,
		this._cid = c.id
	}, {
		"hub:memory/context" : function (a, b) {
			var c = this;
			c._userId = b.user.id,
			f.call(c)
		},
		"dom/action.click" : a.noop,
		"dom/action/edit/note.click" : function (a, b, c) {
			b.preventDefault();
			var d = this,
			e = d._json[c];
			d.publish("modal/add-note/show", {
				data : e,
				externalType : "client",
				optionType : "client_note_category",
				id : d._json.id,
				onSuccess : function (a) {
					a.status && f.call(d)
				}
			})
		}
	})
})
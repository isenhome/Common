define("app/widget/job/detail/note-tab/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e) {
	function f() {
		var a = this;
		a.publish("ajax", {
			url : g.REMARK.replace("<id>", a.jobId)
		}, c().done(function (b) {
				a._json = b.list,
				a.html(e, a._json)
			}))
	}
	var g = {
		REMARK : "/rest/note/list?paginate_by=200&external_type=joborder&external_id=<id>"
	};
	return b.extend(function (a, b, c) {
		this._reference = c,
		this.jobId = c.id
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
				externalType : "joborder",
				optionType : "joborder_note_category",
				id : d._json.id,
				onSuccess : function (a) {
					a.status && f.call(d)
				}
			})
		}
	})
})
define("app/widget/common/people-list/main", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./option.html", "shared/helper/blurb", "app/widget/common/select2/main"], function (a, b, c, d, e) {
	function f(b) {
		var c = this;
		c.$element.select2({
			placeholder : e.t("Please select"),
			minimumInputLength : 1,
			ajax : {
				url : function () {
					return c.$element.data("url") || "/"
				},
				dataType : "json",
				quietMillis : 100,
				data : function (a, b) {
					return {
						name : a,
						page : b
					}
				},
				results : function (a) {
					var b = a.current < a.pages;
					return {
						results : a.list,
						more : b
					}
				}
			},
			initSelection : function (b, d) {
				var e = a(b).val();
				"" !== e && a.ajax(c.$element.data("url"), {
					data : {
						id : e
					},
					dataType : "json"
				}).done(function (a) {
					a.list.length && d(a.list[0])
				})
			},
			formatResult : function (a) {
				return d(a)
			},
			formatSelection : function (a, b) {
				b.text([a.englishName, a.chineseName].join(" ").trim())
			},
			escapeMarkup : function (a) {
				return a
			}
		}),
		b.resolve()
	}
	return b.extend(function (b) {
		this._id = a(b).data("id")
	}, {
		"sig/start" : function (a, b) {
			f.call(this, b)
		},
		"sig/stop" : function (a, b) {
			this.$element.select2("destroy"),
			b.resolve()
		},
		load : function (a) {
			var b = this;
			b.$element.select2("destroy").html(),
			b.html(d, a, c().done(function () {
					a.forEach(function (a, c) {
						b.$element.find("option").eq(c + 1).data("json", a)
					})
				})),
			b.$element.select2({
				placeholder : "请选择"
			})
		}
	})
})
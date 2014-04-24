define("app/widget/modal/add-note/zen", ["jquery", "shared/widget/base/main", "troopjs-utils/deferred", "template!./zen.html", "template!./questions.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f, g) {
	function h(a) {
		var b = this;
		b.publish("slide/helper/close"),
		b.publish("ajax", {
			url : k.ATTACHMENT + b._json.external_id
		}, c().done(function (c) {
				b.html(d, c, a)
			}))
	}
	function i() {
		var b = this,
		c = b.$element,
		d = a(window);
		b.$form = c.find("form"),
		b.$category = c.find('[name="category"]'),
		b.$status = c.find('[name="status"]'),
		b.$controlGroupQeustion = c.find(".control-group-question"),
		b.$controlsQuestion = c.find(".controls-question"),
		b.$date = c.find('[name="date"]'),
		b.$hour = c.find('[name="hour"]'),
		b.$minute = c.find('[name="minute"]'),
		b.$category.append(b._json.$category.children()).val(b._json.category),
		b.$category.trigger("change"),
		b.$status.append(b._json.$status.children()).val(b._json.status),
		b.$category.prop("disabled", b._json.$category.is(":disabled")),
		b._json.content.forEach(function (a, c) {
			b.$element.find("textarea").eq(c).val(a)
		});
		var e = new Date(b._json.date);
		b.$date.val(e.getFullYear() + "-" + (parseInt(e.getMonth(), 10) + 1) + "-" + e.getDate()),
		b.$hour.val(e.getHours()),
		b.$minute.val(e.getMinutes()),
		d.resize(function () {
			b.$element.css("height", d.height())
		}),
		g(b.$form, {
			rules : {
				category : {
					required : !0
				}
			}
		})
	}
	var j,
	k = {
		ADD : "/rest/note/add",
		ATTACHMENT : "/rest/file/list/candidate/"
	};
	return b.extend(function (a, b, c, d) {
		this._json = c,
		this._category = d
	}, {
		"sig/initialize" : function (a, b) {
			h.call(this, b)
		},
		"sig/start" : function (a, b) {
			i.call(this, b)
		},
		"dom/action.click.change" : a.noop,
		"dom/action/save.click" : function (b, d) {
			d.preventDefault();
			var e = this,
			g = a(d.target),
			h = [];
			if (e.$form.valid()) {
				e.$element.find("textarea").each(function () {
					h.push(a(this).val())
				});
				var i = {
					external_id : e._json.external_id,
					content : h,
					category : e.$category.val(),
					status : e.$status.val(),
					external_type : e._json.external_type,
					jobsubmission_id : e._json.jobsubmission_id,
					date : e.$date.val() + " " + e.$hour.val() + ":" + e.$minute.val()
				};
				e.data && (i.id = e.data.id),
				e.publish("ajax", {
					url : k.ADD,
					data : {
						data : JSON.stringify(i)
					},
					type : "POST"
				}, c().done(function (a) {
						e.$element.modal("hide"),
						a.status ? (f.alert("success", "编辑备注成功!"), e._json.onSuccess && e._json.onSuccess(a), e.publish("modal/add-note/hide"), e.publish("slide/helper/close"), e.$element.remove()) : f.alert("error", a.message)
					}), g)
			}
		},
		"dom/action/note/type.change" : function (b, d) {
			var f = this,
			g = a(d.target),
			h = g.find(":selected").data("index");
			if (h === j)
				return f.$controlGroupQeustion.addClass("hide"), void 0;
			var i = a(e(JSON.parse(f._category[h].ext)));
			i.find("[data-weave]").weave(c(function () {
					f.$controlsQuestion.html(i),
					f.$controlGroupQeustion.removeClass("hide")
				}))
		},
		"dom/action/close.click" : function (b, c) {
			c.preventDefault();
			var d = this,
			e = [];
			d.$element.find("textarea").each(function () {
				e.push(a(this).val())
			});
			var f = {
				content : e,
				category : d.$category.val(),
				status : d.$status.val(),
				date : d.$date.val() + " " + d.$hour.val() + ":" + d.$minute.val()
			};
			d.publish("slide/helper/close"),
			d.publish("modal/add-note/update", f),
			this.$element.remove()
		},
		"dom/action/preview.click" : function (b, c, d, e) {
			c.preventDefault();
			var f = this;
			a(c.target),
			f.publish("slide-helper/attachment/reload", d, null, e)
		}
	})
})
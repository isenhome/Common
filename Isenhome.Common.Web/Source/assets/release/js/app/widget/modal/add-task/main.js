define("app/widget/modal/add-task/main", ["jquery", "troopjs-utils/deferred", "shared/widget/modal/base", "template!./main.html", "shared/helper/utils", "shared/helper/validate"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.publish("ajax", {
			url : i.CATEGORY
		}, b().done(function (c) {
				a._json = c,
				b(function (b) {
					a.html(d, a._json, b)
				}).done(function () {
					h.call(a)
				})
			}))
	}
	function h() {
		var a = this,
		b = a.$element;
		b.find(".modal-footer button"),
		a.$form = b.find("form"),
		a.$category = b.find("[name=category]"),
		a.$date = b.find('[name="date"]'),
		a.$hour = b.find('[name="hour"]'),
		a.$minute = b.find('[name="minute"]'),
		a.$notes = b.find('[name="notes"]'),
		a.$allday = b.find('[name="allday"]'),
		a.$controlCreator = b.find(".control-creator"),
		a.$participant = b.find('[name="participant"]'),
		a.$name = b.find(".name"),
		a.$reminder = b.find('[name="reminder"]'),
		f(a.$form, {
			rules : {
				notes : {
					maxlength : 1e3
				}
			}
		}),
		b.on("hidden", function () {
			a.$controlCreator.addClass("hide"),
			a.$controlCreator.addClass("hide").find(".text_line").empty(),
			a.$name.empty(),
			a.$allday.prop("checked", !1).closest(".controls").find("select").removeClass("hide")
		})
	}
	var i = {
		ADD : "/rest/todo/add",
		CATEGORY : "/rest/data/options?type=todo_category"
	};
	return c.extend({
		"hub:memory/context" : function (a, b) {
			var c = this;
			c.userId = b.user.id,
			g.call(this)
		},
		"hub/modal/add/task/show" : function (a, b) {
			var c = this,
			d = c.$element;
			d.find(".modal-footer button");
			var e;
			if (c._type = b.type, c._id = b.id, c._onSucess = b.onSuccess, c._data = b.data, b.name && c.$name.text(b.name), c._data) {
				if (c._data.allday && c.$allday.trigger("click"), c.$notes.val(c._data.content || ""), c._data.category && c.$category.val(c._data.category.code || ""), e = new Date(c._data.date), c.$date.val(e.getFullYear() + "-" + (parseInt(e.getMonth(), 10) + 1) + "-" + e.getDate()), c.$hour.val(e.getHours()), c.$minute.val(e.getMinutes()), c.$reminder.val(c._data.delta), c._data.addedBy && c.$controlCreator.removeClass("hide").find(".text_line").append('<a href="#user/preview#' + c._data.addedBy.id + '" data-action="profile/open">' + c._data.addedBy.englishName + "</a>"), c._data.users) {
					var f = [];
					c._data.users.forEach(function (a) {
						f.push(a.id)
					}),
					c.$participant.val(f).trigger("change")
				}
			} else {
				c.$reminder.val(-10),
				c.$participant.val(c.userId).trigger("change");
				var g = new Date;
				c.$date.val(g.getFullYear() + "-" + (g.getMonth() + 1) + "-" + g.getDate()),
				c.$hour.val(g.getHours()),
				c.$minute.val(5 * Math.floor(g.getMinutes() / 5))
			}
			d.modal("show")
		},
		"dom/action.click.change" : a.noop,
		"dom/action/save.click" : function (c, d) {
			var f = this,
			g = f.$element,
			h = a(d.target);
			!function () {
				var b = [];
				return f.$element.find('[name="user"]').each(function () {
					b.push(a(this).val())
				}),
				b
			}
			();
			var j = {
				category : f.$category.val(),
				content : f.$notes.val(),
				date : f.$date.val() + " " + f.$hour.val() + ":" + f.$minute.val(),
				external_type : f._type || null,
				external_id : f._id || null,
				allday : f.$allday.is(":checked"),
				users : f.$participant.val(),
				delta : f.$reminder.val()
			};
			f.$form.valid() && (f._data && f._data.id && (j.id = f._data.id), f.publish("ajax", {
					url : i.ADD,
					data : {
						data : JSON.stringify(j)
					},
					type : "post"
				}, b().done(function (a) {
						g.modal("hide"),
						a.status ? (e.alert("success", "Add todo successfully!"), f._onSucess && f._onSucess(a.data)) : e.alert("error", a.message)
					}), h), g.modal("hide"))
		},
		"dom/action/allday.change" : function (b, c) {
			var d = a(c.target),
			e = d.is(":checked");
			e ? d.closest(".controls").find("select").addClass("hide") : d.closest(".controls").find("select").removeClass("hide")
		},
		"dom/action/open/profile.click" : function (b, c) {
			c.preventDefault();
			var d = a(c.target),
			f = d.attr("href");
			e.window({
				url : f,
				name : "User Profile",
				width : "1024"
			})
		}
	})
})
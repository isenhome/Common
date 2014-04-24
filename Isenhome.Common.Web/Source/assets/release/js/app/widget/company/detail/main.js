define("app/widget/company/detail/main", ["compose", "jquery", "shared/widget/base/main", "troopjs-utils/deferred", "shared/helper/utils", "template!./main.html"], function (a, b, c, d, e, f) {
	function g() {
		var a = this;
		a.uid && a._context && a.publish("ajax", {
			url : j.CLIENT + a.uid
		}, d().done(function (b) {
				a._json = b,
				a._json.context = a._context,
				h.call(a)
			}))
	}
	function h() {
		var a = this;
		d(function (b) {
			a.html(f, a._json, b)
		}).done(function () {
			i.call(a)
		})
	}
	function i() {
		var a = this,
		c = a.$element;
		a.$contractList = c.find("#contract"),
		a.$noteCount = c.find(".note-count"),
		a.$contactCount = c.find(".contact-count"),
		a.$contractCount = c.find(".contract-count"),
		a.$element.find("#people-tab").attr("data-weave", "app/widget/company/detail/people-tab/main(" + a._json.id + ", true)").weave(),
		a.$element.find(".company-item").data("json", a._json).attr("data-weave", "app/widget/company/item/main(json)").weave(d().done(function () {
				a.$element.find(".company-item").removeClass("widget-spin")
			})),
		b('a[href="#note-tab"]').one("shown", function () {
			a.$element.find("#activity-history").data("reference", a._json).attr("data-weave", "app/widget/company/detail/note-tab/main(reference)").weave()
		}),
		b('a[href="#jobs-tab"]').one("shown", function () {
			a.$element.find("#jobs-tab").attr("data-weave", "app/widget/company/detail/jobs-tab/main(" + a._json.id + ")").weave()
		}),
		b('a[href="#past-people-tab"]').one("shown", function () {
			a.$element.find("#past-people-tab").attr("data-weave", "app/widget/company/detail/past-people-tab/main(" + a._json.id + ", false)").weave()
		}),
		b('a[href="#contract"]').one("shown", function () {
			a.$element.find("#contract").attr("data-weave", "app/widget/company/detail/contract-tab/main(" + a._json.id + "," + a._json.islimited + ")").weave()
		}),
		b('a[href="#task-tab"]').one("shown", function () {
			a.$element.find("#task-tab").attr("data-weave", "app/widget/company/detail/task-tab/main(" + a._json.id + ")").weave()
		}),
		b('a[href="#intention-tab"]').one("shown", function () {
			a.$element.find("#intention-tab").attr("data-weave", "app/widget/company/detail/intention-tab/main(" + a._json.id + ")").weave()
		}),
		e.widgetLoaded.call(a)
	}
	var j = {
		CLIENT : "/rest/client/"
	};
	return c.extend({
		"hub:memory/detail/id/change" : function (a, b) {
			var c = this;
			c.uid = b,
			g.call(c)
		},
		"hub:memory/context" : function (a, b) {
			var c = this;
			d(),
			c._context = b.user,
			g.call(c)
		},
		"hub/company/update/count" : function (a, b) {
			var c = this,
			d = ["$" + b + "Count"];
			c[d].text(parseInt(c[d].text(), 10) + 1)
		},
		"hub:memory/company/action/count" : function (a, b, c) {
			var d = this;
			switch (b) {
			case "change":
				d.$element.find(".change-count").text(c)
			}
		}
	})
})
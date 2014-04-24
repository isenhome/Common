define("shared/helper/blurb", ["jquery", "i18n", "config"], function (a, b, c) {
	var d = "/locales/__lng__/__ns__.json",
	e = c.userLang;
	return e || (e = window.localStorage.getItem("lang") || "en"),
	b.init({
		lng : e,
		resGetPath : d,
		fallbackLng : !1,
		useLocalStorage : !1,
		debug : c.debug,
		load : "current",
		customLoad : function (b, c, d, e) {
			a.ajax({
				url : d.resGetPath.replace("__lng__", b).replace("__ns__", c),
				async : !1
			}).done(function (a) {
				e(null, a)
			})
		}
	}), {
		t : function (a) {
			return b.t(a, {
				lng : e
			})
		}
	}
})
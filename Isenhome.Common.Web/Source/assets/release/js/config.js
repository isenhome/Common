define(["troopjs-utils/merge"], function (a) {
	var b = {};
	return b = a.call(b, window.config, {
			debug : void 0 !== window.debug ? !0 : !1
		})
});

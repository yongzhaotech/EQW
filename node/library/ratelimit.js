"use strict";

const store = new Map(),
	cacheTime = 60000, /** 1 minute */
	requestPerCacheTime = 10, /** 10 requests allowed in one minute per ip address */
	clear = () => {
		store.clear();
	},
	get = ip => store.has(ip) ? store.get(ip) : null,
	allowRequest = ip => {
		let cachedTimes = get(ip),
			now = Date.now();
		if (cachedTimes === null) {
			store.set(ip, [now]);
			return true;
		} else {
			cachedTimes = cachedTimes
				.filter(time => now - time < cacheTime);
			if (cachedTimes.length < requestPerCacheTime) {
				store.set(ip, [...cachedTimes, now]);
				return true;
			}
			return false;
		}
	},
	denyMessage = () => {
		const minutes = cacheTime / 60000,
			minuteMesaage = minutes === 1 ? "one minute" : `${minutes} minutes`;
		return `Maximum number of requests exceeded, try again later. You can send a maximum number of ${requestPerCacheTime} requests every ${minuteMesaage} per ip address`;
	};

exports.clear = clear;
exports.allowRequest = allowRequest;
exports.denyMessage = denyMessage;
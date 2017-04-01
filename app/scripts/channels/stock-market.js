const EVENT_TYPE = {
	SYNCED: 'stockmarket.synced',
	UPDATED: 'stockmarket.updated'
};

const subscribeTo = (eventType, callback) => {
	if(EVENT_TYPE[eventType]) {
		$.subscribe(EVENT_TYPE[eventType], function() {
			var data = Array.prototype.slice.call(arguments, 1);
			callback.apply({}, [data]);
		});
	}
	return false;
}

const publishTo = (eventType, data) => {
	if(EVENT_TYPE[eventType]) {
		$.publish(EVENT_TYPE[eventType], data);
	}
	return false;
}

export default {
	EVENT_TYPE,
	subscribeTo,
	publishTo
}
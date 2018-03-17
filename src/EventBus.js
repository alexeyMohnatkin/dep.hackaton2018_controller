class EventBus {
	constructor() {
		if (!EventBus.instance) {
			EventBus.instance = this;
			this.subscriptions = [];
		}
		return EventBus.instance;
	}

	on(event, cb, ...params) {
		this.subscriptions.push({ event, cb, params });
	}

	off(event, subscriber) {
		this.subscriptions = this.subscriptions.filter(s => s.event !== event && s.subscriber !== subscriber);
	}

	emit(event, ...params) {
		const targets = this.subscriptions.filter(subscription => subscription.event === event);
		targets.forEach((target) => {
			target.cb(...params);
		});
	}
}

export default new EventBus();

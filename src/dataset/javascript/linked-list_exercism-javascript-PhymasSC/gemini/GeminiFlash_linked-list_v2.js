export class LinkedList {
	constructor() {
		this.list = [];
	}

	push(element) {
		this.list.push(element);
	}

	pop() {
		return this.list.pop();
	}

	shift() {
		return this.list.shift();
	}

	unshift(element) {
		this.list.unshift(element);
	}

	delete(element) {
		const index = this.list.indexOf(element);
		if (index !== -1) {
			this.list.splice(index, 1);
		}
	}

	count() {
		return this.list.length;
	}
}
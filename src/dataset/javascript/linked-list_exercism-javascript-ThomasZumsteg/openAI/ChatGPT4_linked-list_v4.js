class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(val) {
		const newElement = new Element(val, null, this.tail);
		if (this.tail) {
			this.tail.next = newElement;
		} else {
			this.head = newElement;
		}
		this.tail = newElement;
		this.length++;
	}

	pop() {
		if (!this.tail) return undefined;
		const element = this.tail;
		this.tail = element.prev;
		if (this.tail) {
			this.tail.next = null;
		} else {
			this.head = null;
		}
		this.length--;
		return element.val;
	}

	unshift(val) {
		const newElement = new Element(val, this.head, null);
		if (this.head) {
			this.head.prev = newElement;
		} else {
			this.tail = newElement;
		}
		this.head = newElement;
		this.length++;
	}

	shift() {
		if (!this.head) return undefined;
		const element = this.head;
		this.head = element.next;
		if (this.head) {
			this.head.prev = null;
		} else {
			this.tail = null;
		}
		this.length--;
		return element.val;
	}

	count() {
		return this.length;
	}

	delete(val) {
		let element = this.head;
		while (element) {
			if (element.val === val) {
				if (element.prev) {
					element.prev.next = element.next;
				} else {
					this.head = element.next;
				}
				if (element.next) {
					element.next.prev = element.prev;
				} else {
					this.tail = element.prev;
				}
				this.length--;
				return;
			}
			element = element.next;
		}
	}
}

class Element {
	constructor(val, next, prev) {
		this.val = val;
		this.next = next;
		this.prev = prev;
	}
}

export default LinkedList;
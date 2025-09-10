export class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	push(element) {
		const node = { value: element, next: null, prev: this.tail };
		if (this.tail) this.tail.next = node;
		this.tail = node;
		if (!this.head) this.head = node;
		this.size++;
	}

	pop() {
		if (!this.tail) return null;
		const value = this.tail.value;
		this.tail = this.tail.prev;
		if (this.tail) this.tail.next = null;
		else this.head = null;
		this.size--;
		return value;
	}

	shift() {
		if (!this.head) return null;
		const value = this.head.value;
		this.head = this.head.next;
		if (this.head) this.head.prev = null;
		else this.tail = null;
		this.size--;
		return value;
	}

	unshift(element) {
		const node = { value: element, next: this.head, prev: null };
		if (this.head) this.head.prev = node;
		this.head = node;
		if (!this.tail) this.tail = node;
		this.size++;
	}

	delete(element) {
		let current = this.head;
		while (current) {
			if (current.value === element) {
				if (current.prev) current.prev.next = current.next;
				else this.head = current.next;
				if (current.next) current.next.prev = current.prev;
				else this.tail = current.prev;
				this.size--;
				return;
			}
			current = current.next;
		}
	}

	count() {
		return this.size;
	}
}
export class LinkedList {
	#head = null;
	#tail = null;
	#size = 0;

	push(element) {
		const node = { value: element, next: null };
		if (this.#tail) {
			this.#tail.next = node;
		} else {
			this.#head = node;
		}
		this.#tail = node;
		this.#size++;
	}

	pop() {
		if (!this.#head) return undefined;
		
		if (this.#head === this.#tail) {
			const value = this.#head.value;
			this.#head = this.#tail = null;
			this.#size = 0;
			return value;
		}

		let current = this.#head;
		while (current.next !== this.#tail) {
			current = current.next;
		}
		
		const value = this.#tail.value;
		this.#tail = current;
		this.#tail.next = null;
		this.#size--;
		return value;
	}

	shift() {
		if (!this.#head) return undefined;
		
		const value = this.#head.value;
		this.#head = this.#head.next;
		if (!this.#head) {
			this.#tail = null;
		}
		this.#size--;
		return value;
	}

	unshift(element) {
		const node = { value: element, next: this.#head };
		this.#head = node;
		if (!this.#tail) {
			this.#tail = node;
		}
		this.#size++;
	}

	delete(element) {
		if (!this.#head) return;

		if (this.#head.value === element) {
			this.shift();
			return;
		}

		let current = this.#head;
		while (current.next && current.next.value !== element) {
			current = current.next;
		}

		if (current.next) {
			if (current.next === this.#tail) {
				this.#tail = current;
			}
			current.next = current.next.next;
			this.#size--;
		}
	}

	count() {
		return this.#size;
	}
}
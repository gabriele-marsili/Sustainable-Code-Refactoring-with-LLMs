export class LinkedList {
	list = [];
	length = 0;

	push(element) {
		this.list[this.length++] = element;
	}

	pop() {
		if (this.length === 0) return undefined;
		const element = this.list[--this.length];
		this.list[this.length] = undefined;
		return element;
	}

	shift() {
		if (this.length === 0) return undefined;
		const element = this.list[0];
		for (let i = 0; i < this.length - 1; i++) {
			this.list[i] = this.list[i + 1];
		}
		this.list[--this.length] = undefined;
		return element;
	}

	unshift(element) {
		for (let i = this.length; i > 0; i--) {
			this.list[i] = this.list[i - 1];
		}
		this.list[0] = element;
		this.length++;
	}

	delete(element) {
		for (let i = 0; i < this.length; i++) {
			if (this.list[i] === element) {
				for (let j = i; j < this.length - 1; j++) {
					this.list[j] = this.list[j + 1];
				}
				this.list[--this.length] = undefined;
				return;
			}
		}
	}

	count() {
		return this.length;
	}
}
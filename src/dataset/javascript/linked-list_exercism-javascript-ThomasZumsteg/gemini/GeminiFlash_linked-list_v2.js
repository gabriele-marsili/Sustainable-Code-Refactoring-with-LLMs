var LinkedList = function() {
	this.head = null;
	this.tail = null;
	this.length = 0;
};

LinkedList.prototype.push = function(val) {
	const newElement = { val: val, next: null, prev: this.tail };

	if (this.tail) {
		this.tail.next = newElement;
	} else {
		this.head = newElement;
	}

	this.tail = newElement;
	this.length++;
};

LinkedList.prototype.pop = function() {
	if (this.length === 0) {
		return undefined;
	}

	const element = this.tail;
	if (!element) return undefined; // defensive check

	this.tail = element.prev;

	if (this.tail) {
		this.tail.next = null;
	} else {
		this.head = null;
	}

	this.length--;
	return element.val;
};

LinkedList.prototype.unshift = function(val) {
	const newElement = { val: val, next: this.head, prev: null };

	if (this.head) {
		this.head.prev = newElement;
	} else {
		this.tail = newElement;
	}

	this.head = newElement;
	this.length++;
};

LinkedList.prototype.shift = function() {
	if (this.length === 0) {
		return undefined;
	}

	const element = this.head;
	if (!element) return undefined; // defensive check

	this.head = element.next;

	if (this.head) {
		this.head.prev = null;
	} else {
		this.tail = null;
	}

	this.length--;
	return element.val;
};

LinkedList.prototype.count = function() {
	return this.length;
};

LinkedList.prototype.delete = function(val) {
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
			return; // Exit after deleting the first matching element
		}
		element = element.next;
	}
};

export default LinkedList;
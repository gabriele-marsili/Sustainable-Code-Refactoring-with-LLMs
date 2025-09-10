var LinkedList = function() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

LinkedList.prototype.push = function(val) {
	const newTail = { val: val, next: null, prev: this.tail };
	if (this.tail) {
		this.tail.next = newTail;
	} else {
		this.head = newTail;
	}
	this.tail = newTail;
	this.length++;
};

LinkedList.prototype.pop = function() {
	if (!this.tail) {
		return undefined;
	}

	const poppedValue = this.tail.val;
	this.tail = this.tail.prev;

	if (this.tail) {
		this.tail.next = null;
	} else {
		this.head = null;
	}

	this.length--;
	return poppedValue;
};

LinkedList.prototype.unshift = function(val) {
	const newHead = { val: val, next: this.head, prev: null };
	if (this.head) {
		this.head.prev = newHead;
	} else {
		this.tail = newHead;
	}
	this.head = newHead;
	this.length++;
};

LinkedList.prototype.shift = function() {
	if (!this.head) {
		return undefined;
	}

	const shiftedValue = this.head.val;
	this.head = this.head.next;

	if (this.head) {
		this.head.prev = null;
	} else {
		this.tail = null;
	}

	this.length--;
	return shiftedValue;
};

LinkedList.prototype.count = function() {
	return this.length;
};

LinkedList.prototype.delete = function(val) {
	let current = this.head;
	while (current) {
		if (current.val === val) {
			if (current.prev) {
				current.prev.next = current.next;
			} else {
				this.head = current.next;
			}

			if (current.next) {
				current.next.prev = current.prev;
			} else {
				this.tail = current.prev;
			}

			this.length--;
			return;
		}
		current = current.next;
	}
};

export default LinkedList;
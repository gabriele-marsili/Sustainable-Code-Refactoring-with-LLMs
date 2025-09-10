var LinkedList = function() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

LinkedList.prototype.push = function(val) {
	const newElement = new Element(val);
	if (this.length === 0) {
		this.head = newElement;
		this.tail = newElement;
	} else {
		newElement.prev = this.tail;
		this.tail.next = newElement;
		this.tail = newElement;
	}
	this.length++;
};

LinkedList.prototype.pop = function() {
	if (this.length === 0) {
		return undefined;
	}

	const element = this.tail;
	const val = element.val;

	if (this.length === 1) {
		this.head = null;
		this.tail = null;
	} else {
		this.tail = element.prev;
		this.tail.next = null;
	}

	this.length--;
	return val;
};

LinkedList.prototype.unshift = function(val) {
	const newElement = new Element(val);
	if (this.length === 0) {
		this.head = newElement;
		this.tail = newElement;
	} else {
		newElement.next = this.head;
		this.head.prev = newElement;
		this.head = newElement;
	}
	this.length++;
};

LinkedList.prototype.shift = function() {
	if (this.length === 0) {
		return undefined;
	}

	const element = this.head;
	const val = element.val;

	if (this.length === 1) {
		this.head = null;
		this.tail = null;
	} else {
		this.head = element.next;
		this.head.prev = null;
	}

	this.length--;
	return val;
};

LinkedList.prototype.count = function() {
	return this.length;
};

LinkedList.prototype.delete = function(val) {
	let element = this.head;
	while (element && element.val !== val) {
		element = element.next;
	}

	if (element) {
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
	}
};

var Element = function(val) {
	this.val = val;
	this.next = null;
	this.prev = null;
}

export default LinkedList;
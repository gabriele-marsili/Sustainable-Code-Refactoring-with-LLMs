var LinkedList = function() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

LinkedList.prototype.push = function(val) {
	var newElement = new Element(val, null, this.tail);
	if(this.tail) {
		this.tail.next = newElement;
		this.tail = newElement;
	} else {
		this.head = this.tail = newElement;
	}
	this.length++;
};

LinkedList.prototype.pop = function() {
	if(this.length === 0)
		return undefined;
	
	var element = this.tail;
	var val = element.val;
	
	this.tail = element.prev;
	if(this.tail) {
		this.tail.next = null;
	} else {
		this.head = null;
	}
	
	this.length--;
	return val;
};

LinkedList.prototype.unshift = function(val) {
	var newElement = new Element(val, this.head, null);
	if(this.head) {
		this.head.prev = newElement;
		this.head = newElement;
	} else {
		this.head = this.tail = newElement;
	}
	this.length++;
};

LinkedList.prototype.shift = function() {
	if(this.length === 0)
		return undefined;
	
	var element = this.head;
	var val = element.val;
	
	this.head = element.next;
	if(this.head) {
		this.head.prev = null;
	} else {
		this.tail = null;
	}
	
	this.length--;
	return val;
};

LinkedList.prototype.count = function() {
	return this.length;
};

LinkedList.prototype.delete = function(val) {
	var element = this.head;
	while(element && element.val !== val)
		element = element.next;
	
	if(element) {
		if(element.prev) {
			element.prev.next = element.next;
		} else {
			this.head = element.next;
		}
		
		if(element.next) {
			element.next.prev = element.prev;
		} else {
			this.tail = element.prev;
		}
		
		this.length--;
	}
};

var Element = function(val, next, prev) {
	this.val = val;
	this.next = next;
	this.prev = prev;
}

export default LinkedList;
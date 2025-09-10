var CustomSet = function(items) {
	this.items = [];
	if (items) {
		for (let i = 0; i < items.length; i++) {
			if (!this.member(items[i])) {
				this.items.push(items[i]);
			}
		}
		this.items.sort();
	}
};

CustomSet.prototype.member = function(item) {
	for (let i = 0; i < this.items.length; i++) {
		if (this.items[i] === item) {
			return true;
		}
	}
	return false;
};

CustomSet.prototype.size = function() { return this.items.length };

CustomSet.prototype.toList = function() { return [...this.items] };

CustomSet.prototype.put = function(item) {
	if (!this.member(item)) {
		this.items.push(item);
		this.items.sort();
	}
	return this;
};

CustomSet.prototype.eql = function(set_b) {
	if (this.items.length !== set_b.items.length) {
		return false;
	}
	for (let i = 0; i < this.items.length; i++) {
		if (this.items[i] !== set_b.items[i]) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.delete = function(item) {
	const newItems = [];
	for (let i = 0; i < this.items.length; i++) {
		if (this.items[i] !== item) {
			newItems.push(this.items[i]);
		}
	}
	this.items = newItems;
	return this;
};

CustomSet.prototype.difference = function(set_b) {
	const newSet = new CustomSet();
	for (let i = 0; i < this.items.length; i++) {
		if (!set_b.member(this.items[i])) {
			newSet.put(this.items[i]);
		}
	}
	return newSet;
};

CustomSet.prototype.disjoint = function(set_b) {
	if (this.size() === 0 || set_b.size() === 0) {
		return true;
	}
	for (let i = 0; i < this.items.length; i++) {
		if (set_b.member(this.items[i])) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.empty = function() {
	this.items = [];
	return this;
};

CustomSet.prototype.intersection = function(set_b) {
	const newSet = new CustomSet();
	for (let i = 0; i < this.items.length; i++) {
		if (set_b.member(this.items[i])) {
			newSet.put(this.items[i]);
		}
	}
	return newSet;
};

CustomSet.prototype.subset = function(set_b) {
	for (let i = 0; i < set_b.items.length; i++) {
		if (!this.member(set_b.items[i])) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.union = function(set_b) {
	const newSet = new CustomSet(this.toList());
	for (let i = 0; i < set_b.items.length; i++) {
		newSet.put(set_b.items[i]);
	}
	return newSet;
};

export default CustomSet;
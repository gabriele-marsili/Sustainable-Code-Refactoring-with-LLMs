var CustomSet = function(items) {
	/* A set object */
	this.items = [];
	if (items) {
		for (var i = 0; i < items.length; i++) {
			this.put(items[i]);
		}
	}
};

// Tests if item is in a set
CustomSet.prototype.member = function(item) {
	return this.items.includes(item);
};

// Number of elements in the set
CustomSet.prototype.size = function() {
	return this.items.length;
};

// Makes a list from a set
CustomSet.prototype.toList = function() {
	return [...this.items]; // Return a copy to avoid modification of internal state
};

CustomSet.prototype.put = function(item) {
	/* Insert an item into a set */
	if (!this.member(item)) {
		this.items.push(item);
		this.items.sort(); // Keep sorted on insertion
	}
	return this;
};

CustomSet.prototype.eql = function(set_b) {
	/* Compares two sets for equality */
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
	/* Removes an item from a set */
	const index = this.items.indexOf(item);
	if (index > -1) {
		this.items.splice(index, 1);
	}
	return this;
};

CustomSet.prototype.difference = function(set_b) {
	/* Items in one set and not in another */
	const result = [];
	for (let i = 0; i < this.items.length; i++) {
		const item = this.items[i];
		if (!set_b.member(item)) {
			result.push(item);
		}
	}
	return new CustomSet(result);
};

CustomSet.prototype.disjoint = function(set_b) {
	/* Tests if there are no elements in common */
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
	/* Remove all items from the set */
	this.items.length = 0; // More efficient way to clear the array
	return this;
};

CustomSet.prototype.intersection = function(set_b) {
	/* Items in both sets */
	const result = [];
	for (let i = 0; i < this.items.length; i++) {
		const item = this.items[i];
		if (set_b.member(item)) {
			result.push(item);
		}
	}
	return new CustomSet(result);
};


CustomSet.prototype.subset = function(set_b) {
	/* All elements of one set are contained in this set */
	for (let i = 0; i < set_b.items.length; i++) {
		if (!this.member(set_b.items[i])) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.union = function(set_b) {
	/* Set containing elements from either set */
	const combined = [...this.items];
	for (let i = 0; i < set_b.items.length; i++) {
		const item = set_b.items[i];
		if (!this.member(item) && !combined.includes(item)) {
			combined.push(item);
		}
	}
	return new CustomSet(combined);
};

export default CustomSet;
var CustomSet = function(items) {
	/* A set object */
	this.items = new Set();
	if (items) {
		for(var i = 0; i < items.length; i++) {
			this.items.add(items[i]);
		}
	}
};

// Tests if item is in a set
CustomSet.prototype.member = function(item) { return this.items.has(item); };
// Number of elements in the set
CustomSet.prototype.size = function() { return this.items.size; };
// Makes a list from a set
CustomSet.prototype.toList = function() { return Array.from(this.items).sort(); };

CustomSet.prototype.put = function(item) {
	/* Insert an item into a set */
	this.items.add(item);
	return this;
};

CustomSet.prototype.eql = function(set_b) {
	/* Compares two sets for equality */
	if(this.items.size !== set_b.items.size)
		return false;
	for(var item of this.items) {
		if(!set_b.items.has(item))
			return false;
	}
	return true;
};

CustomSet.prototype.delete = function(item) {
	/* Removes an item from a set */
	this.items.delete(item);
	return this;
};

CustomSet.prototype.difference = function(set_b) {
	/* Items in one set and not in another */
	var result = new CustomSet();
	for(var item of this.items) {
		if(!set_b.items.has(item)) {
			result.items.add(item);
		}
	}
	return result;
};

CustomSet.prototype.disjoint = function(set_b) {
	/* Tests if there are no elements in common */
	if(this.items.size === 0 || set_b.items.size === 0)
		return true;
	for(var item of this.items) {
		if(set_b.items.has(item))
			return false;
	}
	return true;
};

CustomSet.prototype.empty = function() {
	/* Remove all items from the set */
	this.items.clear();
	return this;
};

CustomSet.prototype.intersection = function(set_b) {
	/* Items in both sets */
	var result = new CustomSet();
	for(var item of this.items) {
		if(set_b.items.has(item)) {
			result.items.add(item);
		}
	}
	return result;
};

CustomSet.prototype.subset = function(set_b) {
	/* All elements of one set are contained in this set */
	for(var item of set_b.items) {
		if(!this.items.has(item))
			return false;
	}
	return true;
};

CustomSet.prototype.union = function(set_b) {
	/* Set containing elements from either set */
	var result = new CustomSet();
	for(var item of this.items) {
		result.items.add(item);
	}
	for(var item of set_b.items) {
		result.items.add(item);
	}
	return result;
};

export default CustomSet;
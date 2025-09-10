var CustomSet = function(items) {
	this.items = new Set();
	if (items) {
		for (var i = 0; i < items.length; i++) {
			this.items.add(items[i]);
		}
	}
};

CustomSet.prototype.member = function(item) { 
	return this.items.has(item);
};

CustomSet.prototype.size = function() { 
	return this.items.size;
};

CustomSet.prototype.toList = function() { 
	return Array.from(this.items).sort();
};

CustomSet.prototype.put = function(item) {
	this.items.add(item);
	return this;
};

CustomSet.prototype.eql = function(set_b) {
	if (this.items.size !== set_b.items.size) {
		return false;
	}
	for (var item of this.items) {
		if (!set_b.items.has(item)) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.delete = function(item) {
	this.items.delete(item);
	return this;
};

CustomSet.prototype.difference = function(set_b) {
	var result = new CustomSet();
	for (var item of this.items) {
		if (!set_b.items.has(item)) {
			result.items.add(item);
		}
	}
	return result;
};

CustomSet.prototype.disjoint = function(set_b) {
	if (this.items.size === 0 || set_b.items.size === 0) {
		return true;
	}
	for (var item of this.items) {
		if (set_b.items.has(item)) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.empty = function() {
	this.items.clear();
	return this;
};

CustomSet.prototype.intersection = function(set_b) {
	var result = new CustomSet();
	for (var item of this.items) {
		if (set_b.items.has(item)) {
			result.items.add(item);
		}
	}
	return result;
};

CustomSet.prototype.subset = function(set_b) {
	for (var item of set_b.items) {
		if (!this.items.has(item)) {
			return false;
		}
	}
	return true;
};

CustomSet.prototype.union = function(set_b) {
	var result = new CustomSet();
	for (var item of this.items) {
		result.items.add(item);
	}
	for (var item of set_b.items) {
		result.items.add(item);
	}
	return result;
};

export default CustomSet;
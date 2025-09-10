var CustomSet = function(items) {
    this.items = new Set();
    if (items) {
        for (let i = 0; i < items.length; i++) {
            this.put(items[i]);
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
    return Array.from(this.items);
};

CustomSet.prototype.put = function(item) {
    if (!this.member(item)) {
        this.items.add(item);
    }
    return this;
};

CustomSet.prototype.eql = function(set_b) {
    if (this.size() !== set_b.size()) {
        return false;
    }

    if (this.size() === 0 && set_b.size() === 0) {
        return true;
    }

    const arrA = this.toList();
    const arrB = set_b.toList();

    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] !== arrB[i]) {
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
    const newSet = new CustomSet();
    this.toList().forEach(item => {
        if (!set_b.member(item)) {
            newSet.put(item);
        }
    });
    return newSet;
};

CustomSet.prototype.disjoint = function(set_b) {
    if (this.size() === 0 || set_b.size() === 0) {
        return true;
    }

    for (const element of this.toList()) {
        if (set_b.member(element)) {
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
    const newSet = new CustomSet();
    this.toList().forEach(item => {
        if (set_b.member(item)) {
            newSet.put(item);
        }
    });
    return newSet;
};

CustomSet.prototype.subset = function(set_b) {
    for (const element of set_b.toList()) {
        if (!this.member(element)) {
            return false;
        }
    }
    return true;
};

CustomSet.prototype.union = function(set_b) {
    const newSet = new CustomSet(this.toList());
    set_b.toList().forEach(item => newSet.put(item));
    return newSet;
};

export default CustomSet;
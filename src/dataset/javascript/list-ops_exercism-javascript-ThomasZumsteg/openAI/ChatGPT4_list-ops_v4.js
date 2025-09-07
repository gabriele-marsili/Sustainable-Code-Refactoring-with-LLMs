class List {
    constructor(values = []) {
        this.values = values;
    }

    push(value) {
        this.values.push(value);
        return this;
    }

    append(list) {
        this.values = this.values.concat(list.values);
        return this;
    }

    concat(list) {
        return this.append(list);
    }

    filter(func) {
        const result = [];
        for (const val of this.values) {
            if (func(val)) result.push(val);
        }
        return new List(result);
    }

    map(func) {
        const result = [];
        for (const val of this.values) {
            result.push(func(val));
        }
        return new List(result);
    }

    foldl(func, acc) {
        for (const val of this.values) {
            acc = func(val, acc);
        }
        return acc;
    }

    foldr(func, acc) {
        for (let i = this.values.length - 1; i >= 0; i--) {
            acc = func(this.values[i], acc);
        }
        return acc;
    }

    reverse() {
        return new List([...this.values].reverse());
    }

    length() {
        return this.values.length;
    }
}

export default List;
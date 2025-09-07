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
        const filteredValues = this.values.filter(func);
        return new List(filteredValues);
    }

    map(func) {
        const mappedValues = this.values.map(func);
        return new List(mappedValues);
    }

    foldl(func, acc) {
        for (const value of this.values) {
            acc = func(value, acc);
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
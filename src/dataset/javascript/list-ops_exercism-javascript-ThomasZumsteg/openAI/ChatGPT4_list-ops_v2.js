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
        return this.values.reduce(func, acc);
    }

    foldr(func, acc) {
        return this.values.reduceRight(func, acc);
    }

    reverse() {
        return new List([...this.values].reverse());
    }

    length() {
        return this.values.length;
    }
}

export default List;
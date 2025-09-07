class List {
    constructor(values = []) {
        this.values = values;
    }

    push(value) {
        this.values.push(value);
        return this;
    }

    append(list) {
        this.values.push(...list.values);
        return this;
    }
    
    concat(list) {
        return this.append(list);
    }

    filter(func) {
        const result = new List();
        const len = this.values.length;
        for (let i = 0; i < len; i++) {
            if (func(this.values[i])) {
                result.values.push(this.values[i]);
            }
        }
        return result;
    }

    map(func) {
        const result = new List();
        const len = this.values.length;
        for (let i = 0; i < len; i++) {
            result.values.push(func(this.values[i]));
        }
        return result;
    }

    foldl(func, acc) {
        const len = this.values.length;
        for (let i = 0; i < len; i++) {
            acc = func(this.values[i], acc);
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
        const result = new List();
        for (let i = this.values.length - 1; i >= 0; i--) {
            result.values.push(this.values[i]);
        }
        return result;
    }

    length() {
        return this.values.length;
    }
}

export default List;
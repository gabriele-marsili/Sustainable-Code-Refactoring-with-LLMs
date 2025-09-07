class List {
    constructor(values=[]) {
        this.values = values;
    }

    push(value) {
        this.values.push(value);
        return this;
    }

    append(list) {
        if (list.values.length > 0) {
            for (let i = 0; i < list.values.length; i++) {
                this.values.push(list.values[i]);
            }
        }
        return this;
    }
    
    concat(list) { return this.append(list); }

    filter(func) {
        const result = new List();
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (func(val)) {
                result.push(val);
            }
        }
        return result;
    }

    map(func) {
        const result = new List();
        for (let i = 0; i < this.values.length; i++) {
            result.push(func(this.values[i]));
        }
        return result;
    }

    foldl(func, acc) {
        let current = acc;
        for (let i = 0; i < this.values.length; i++) {
            current = func(this.values[i], current);
        }
        return current;
    }

    foldr(func, acc) {
        let current = acc;
        for (let i = this.values.length - 1; i >= 0; i--) {
            current = func(this.values[i], current);
        }
        return current;
    }

    reverse() {
        const result = new List();
        for (let i = this.values.length - 1; i >= 0; i--) {
            result.push(this.values[i]);
        }
        return result;
    }

    length() { return this.values.length; }
}

export default List;
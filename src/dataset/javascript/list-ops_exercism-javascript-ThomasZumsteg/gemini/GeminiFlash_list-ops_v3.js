class List {
    constructor(values = []) {
        this.values = values;
    }

    push(value) {
        this.values.push(value);
        return this;
    }

    append(list) {
        if (list.values.length > 0) {
            this.values.push(...list.values);
        }
        return this;
    }

    concat(list) {
        return this.append(list);
    }

    filter(func) {
        const newList = new List();
        for (let i = 0; i < this.values.length; i++) {
            const val = this.values[i];
            if (func(val)) {
                newList.push(val);
            }
        }
        return newList;
    }

    map(func) {
        const newList = new List();
        for (let i = 0; i < this.values.length; i++) {
            newList.push(func(this.values[i]));
        }
        return newList;
    }

    foldl(func, acc) {
        let result = acc;
        for (let i = 0; i < this.values.length; i++) {
            result = func(this.values[i], result);
        }
        return result;
    }

    foldr(func, acc) {
        let result = acc;
        for (let i = this.values.length - 1; i >= 0; i--) {
            result = func(this.values[i], result);
        }
        return result;
    }

    reverse() {
        const newList = new List();
        for (let i = this.values.length - 1; i >= 0; i--) {
            newList.push(this.values[i]);
        }
        return newList;
    }

    length() {
        return this.values.length;
    }
}

export default List;
class List {
    constructor(values=[]) {
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
        const values = this.values;
        const length = values.length;
        for(let i = 0; i < length; i++) {
            if(func(values[i])) {
                result.values.push(values[i]);
            }
        }
        return result;
    }

    map(func) {
        const result = new List();
        const values = this.values;
        const length = values.length;
        for(let i = 0; i < length; i++) {
            result.values.push(func(values[i]));
        }
        return result;
    }

    foldl(func, acc) {
        const values = this.values;
        const length = values.length;
        for(let i = 0; i < length; i++) {
            acc = func(values[i], acc);
        }
        return acc;
    }

    foldr(func, acc) {
        const values = this.values;
        for(let i = values.length - 1; i >= 0; i--) {
            acc = func(values[i], acc);
        }
        return acc;
    }

    reverse() {
        const result = new List();
        const values = this.values;
        for(let i = values.length - 1; i >= 0; i--) {
            result.values.push(values[i]);
        }
        return result;
    }

    length() { 
        return this.values.length; 
    }
}

export default List;
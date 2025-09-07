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
        const vals = this.values;
        const len = vals.length;
        for(let i = 0; i < len; i++) {
            if(func(vals[i])) {
                result.values.push(vals[i]);
            }
        }
        return result;
    }

    map(func) {
        const result = new List();
        const vals = this.values;
        const len = vals.length;
        for(let i = 0; i < len; i++) {
            result.values.push(func(vals[i]));
        }
        return result;
    }

    foldl(func, acc) {
        const vals = this.values;
        const len = vals.length;
        for(let i = 0; i < len; i++) {
            acc = func(vals[i], acc);
        }
        return acc;
    }

    foldr(func, acc) {
        const vals = this.values;
        for(let i = vals.length - 1; i >= 0; i--) {
            acc = func(vals[i], acc);
        }
        return acc;
    }

    reverse() {
        const result = new List();
        const vals = this.values;
        for(let i = vals.length - 1; i >= 0; i--) {
            result.values.push(vals[i]);
        }
        return result;
    }

    length() { 
        return this.values.length; 
    }
}

export default List;
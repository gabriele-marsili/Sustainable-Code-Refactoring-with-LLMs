class Proverb {
    constructor() {
        this.words = [];
        this.qualifier = null;
        
        for (let i = 0; i < arguments.length; i++) {
            const arg = arguments[i];
            if (typeof arg === 'string') {
                this.words.push(arg);
            } else if (typeof arg === 'object' && arg && arg.qualifier) {
                this.qualifier = arg.qualifier;
            }
        }
    }

    toString() {
        if (this.words.length === 0) return '';
        
        let result = '';
        
        for (let i = 1; i < this.words.length; i++) {
            result += 'For want of a ' + this.words[i-1] + ' the ' + this.words[i] + ' was lost.\n';
        }
        
        result += 'And all for the want of a ' + 
            (this.qualifier ? this.qualifier + ' ' : '') + this.words[0] + '.';
        
        return result;
    }
}

export default Proverb;
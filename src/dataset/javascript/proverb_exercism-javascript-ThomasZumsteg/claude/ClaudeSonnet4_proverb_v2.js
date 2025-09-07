class Proverb {
    constructor(...args) {
        this.words = [];
        this.qualifier = null;
        
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (typeof arg === 'string') {
                this.words.push(arg);
            } else if (typeof arg === 'object' && arg && arg.qualifier) {
                this.qualifier = arg.qualifier;
            }
        }
    }

    toString() {
        const len = this.words.length;
        if (len === 0) return '';
        
        let result = '';
        
        for (let i = 1; i < len; i++) {
            result += `For want of a ${this.words[i-1]} the ${this.words[i]} was lost.\n`;
        }
        
        result += `And all for the want of a ${this.qualifier ? this.qualifier + ' ' : ''}${this.words[0]}.`;
        
        return result;
    }
}

export default Proverb;
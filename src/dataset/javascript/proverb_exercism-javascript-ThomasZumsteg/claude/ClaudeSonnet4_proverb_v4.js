class Proverb {
    constructor() {
        const args = arguments;
        const words = [];
        let qualifier;
        
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (typeof arg === 'string') {
                words.push(arg);
            } else if (typeof arg === 'object' && arg && arg.qualifier) {
                qualifier = arg.qualifier;
            }
        }
        
        this.words = words;
        this.qualifier = qualifier;
    }

    toString() {
        const words = this.words;
        const length = words.length;
        
        if (length === 0) return '';
        if (length === 1) {
            return 'And all for the want of a ' + 
                (this.qualifier ? this.qualifier + ' ' : '') + words[0] + '.';
        }
        
        const result = new Array(length);
        
        for (let i = 1; i < length; i++) {
            result[i - 1] = 'For want of a ' + words[i - 1] + ' the ' + words[i] + ' was lost.';
        }
        
        result[length - 1] = 'And all for the want of a ' + 
            (this.qualifier ? this.qualifier + ' ' : '') + words[0] + '.';
        
        return result.join('\n');
    }
}

export default Proverb;
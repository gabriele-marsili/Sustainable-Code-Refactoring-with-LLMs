class Proverb {
    constructor(...args) {
        this.words = [];
        this.qualifier = null;
        
        for (const arg of args) {
            if (typeof arg === 'string') {
                this.words.push(arg);
            } else if (arg && typeof arg === 'object' && arg.qualifier) {
                this.qualifier = arg.qualifier;
            }
        }
    }

    toString() {
        if (this.words.length === 0) return '';
        
        const lines = [];
        
        for (let i = 1; i < this.words.length; i++) {
            lines.push(`For want of a ${this.words[i-1]} the ${this.words[i]} was lost.`);
        }
        
        const lastLine = `And all for the want of a ${this.qualifier ? this.qualifier + ' ' : ''}${this.words[0]}.`;
        lines.push(lastLine);
        
        return lines.join('\n');
    }
}

export default Proverb;
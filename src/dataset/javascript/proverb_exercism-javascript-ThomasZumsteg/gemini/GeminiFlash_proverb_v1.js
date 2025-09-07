class Proverb {
    constructor(...args) {
        this.words = [];
        this.qualifier = '';

        for (const arg of args) {
            if (typeof arg === 'string') {
                this.words.push(arg);
            } else if (typeof arg === 'object' && arg !== null && arg.qualifier) {
                this.qualifier = arg.qualifier;
            }
        }
    }

    toString() {
        const result = [];
        const len = this.words.length;

        for (let i = 1; i < len; i++) {
            result.push(`For want of a ${this.words[i - 1]} the ${this.words[i]} was lost.`);
        }

        result.push(`And all for the want of a ${this.qualifier ? this.qualifier + ' ' : ''}${this.words[0]}.`);
        return result.join('\n');
    }
}

export default Proverb;
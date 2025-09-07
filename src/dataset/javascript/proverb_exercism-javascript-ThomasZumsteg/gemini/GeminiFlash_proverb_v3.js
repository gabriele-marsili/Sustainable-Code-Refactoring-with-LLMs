class Proverb {
    constructor(...args) {
        this.words = [];
        this.qualifier = undefined;

        for (const arg of args) {
            if (typeof arg === 'string') {
                this.words.push(arg);
            } else if (typeof arg === 'object' && arg !== null) {
                this.qualifier = arg.qualifier;
            }
        }
    }

    toString() {
        const result = new Array(this.words.length);
        let i = 0;
        for (; i < this.words.length - 1; i++) {
            result[i] = `For want of a ${this.words[i]} the ${this.words[i + 1]} was lost.`;
        }
        const lastIndex = this.words.length - 1;
        const qualifierString = this.qualifier ? `${this.qualifier} ` : '';
        result[lastIndex] = `And all for the want of a ${qualifierString}${this.words[0]}.`;
        result.length = this.words.length;

        return result.join('\n');
    }
}

export default Proverb;
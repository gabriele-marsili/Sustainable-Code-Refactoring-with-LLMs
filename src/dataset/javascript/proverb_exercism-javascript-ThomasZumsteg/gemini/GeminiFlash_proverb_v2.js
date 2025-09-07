class Proverb {
    constructor(...args) {
        this.words = args.filter(arg => typeof arg === 'string');
        const options = args.find(arg => typeof arg === 'object' && arg !== null);
        this.qualifier = options?.qualifier;
    }

    toString() {
        const { words, qualifier } = this;
        const len = words.length;
        if (len === 0) {
            return "";
        }

        const result = new Array(len);
        for (let i = 1; i < len; i++) {
            result[i - 1] = `For want of a ${words[i - 1]} the ${words[i]} was lost.`;
        }

        result[len - 1] = `And all for the want of a ${qualifier ? qualifier + ' ' : ''}${words[0]}.`;
        return result.slice(0, len -1).join('\n') + (len > 1 ? '\n' : '') + result[len - 1];
    }
}

export default Proverb;
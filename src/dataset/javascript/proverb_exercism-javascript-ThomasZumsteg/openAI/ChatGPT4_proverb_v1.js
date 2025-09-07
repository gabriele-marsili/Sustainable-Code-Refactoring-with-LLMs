class Proverb {
    constructor(...args) {
        this.words = args.filter(arg => typeof arg === 'string');
        const qualifierObj = args.find(arg => typeof arg === 'object');
        this.qualifier = qualifierObj?.qualifier || '';
    }

    toString() {
        const result = this.words.slice(1).map((word, i) => 
            `For want of a ${this.words[i]} the ${word} was lost.`
        );
        result.push(`And all for the want of a ${this.qualifier ? this.qualifier + ' ' : ''}${this.words[0]}.`);
        return result.join('\n');
    }
}

export default Proverb;
class Proverb {
    constructor(...args) {
        this.words = args.filter(arg => typeof arg === 'string');
        const qualifierObj = args.find(arg => typeof arg === 'object' && arg !== null);
        this.qualifier = qualifierObj?.qualifier || '';
    }

    toString() {
        const { words, qualifier } = this;
        const qualifierText = qualifier ? `${qualifier} ` : '';
        const result = words.slice(1).map((word, i) => 
            `For want of a ${words[i]} the ${word} was lost.`
        );
        result.push(`And all for the want of a ${qualifierText}${words[0]}.`);
        return result.join('\n');
    }
}

export default Proverb;
function translateWord(word: string): string {
    const firstLetter = word.charAt(0);
    if (/[aeiou]/.test(firstLetter)) {
        return word + 'ay';
    }

    if (word.startsWith('qu')) {
        return word.slice(2) + 'quay';
    }

    if (word.startsWith('y')) {
        return word.slice(1) + firstLetter + 'ay';
    }

    let consonantCluster = '';
    let i = 0;
    while (i < word.length && !/[aeiouy]/.test(word.charAt(i))) {
        consonantCluster += word.charAt(i);
        i++;
    }

    if (consonantCluster) {
        return word.slice(consonantCluster.length) + consonantCluster + 'ay';
    }

    return word + 'ay';
}

export default class PigLatin {
    static translate(text: string): string {
        return text.split(/\s+/).map(translateWord).join(' ');
    }
}
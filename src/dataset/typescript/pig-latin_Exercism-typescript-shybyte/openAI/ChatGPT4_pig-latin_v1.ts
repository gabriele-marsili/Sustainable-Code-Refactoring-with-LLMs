function translateWord(word: string): string {
    const [_, consonantHead = '', tail = ''] = word.match(/^([^auoie]*qu|^y|[^auoiey]*)(.*)$/) || [];
    return tail + consonantHead + 'ay';
}

export default class PigLatin {
    static translate(text: string): string {
        return text.replace(/\S+/g, translateWord);
    }
}
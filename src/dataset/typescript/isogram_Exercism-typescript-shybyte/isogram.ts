export default class Isogram {
    static isIsogram(text: string) {
        const letters = [...(text.replace(/[ -]/g, '').toLowerCase())]
        return letters.length === new Set(letters).size
    }
}

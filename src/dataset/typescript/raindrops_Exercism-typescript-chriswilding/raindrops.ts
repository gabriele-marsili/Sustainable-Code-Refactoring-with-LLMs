export default class Rainsdrops {
    convert(n: number): string {
        const output = []

        if (n % 3 === 0) {
            output.push('Pling')
        }
        if (n % 5 === 0) {
            output.push('Plang')
        }
        if (n % 7 === 0) {
            output.push('Plong')
        }

        if (output.length) {
            return output.join("")
        }
        return n.toString()
    }
}

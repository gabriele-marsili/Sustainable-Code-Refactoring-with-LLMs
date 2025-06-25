const codeA = 'A'.charCodeAt(0)

export default class Diamond {
    makeDiamond(maxChar: string) {
        const maxCharCode = maxChar.charCodeAt(0)
        const charIndex = maxCharCode - codeA
        const size = charIndex * 2 + 1
        let squareString = ''
        for (let y = 0; y < size; y++) {
            const distanceToCenterY = Math.abs(y - charIndex)
            const currentLetter = String.fromCharCode(maxCharCode - distanceToCenterY)
            for (let x = 0; x < size; x++) {
                const distanceToCenter = Math.abs(x - charIndex) + distanceToCenterY
                const char = distanceToCenter === charIndex ? currentLetter : ' '
                squareString += char
            }
            squareString += '\n'
        }
        return squareString
    }
}
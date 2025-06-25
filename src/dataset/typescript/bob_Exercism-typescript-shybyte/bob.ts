class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim()
        switch (true) {
            case message.length === 0:
                return 'Fine. Be that way!'
            case isUpperCaseAndHasAlphabeticChars(message):
                return 'Whoa, chill out!'
            case message.endsWith('?'):
                return 'Sure.'
            default:
                return 'Whatever.'
        }
    }
}

function isUpperCaseAndHasAlphabeticChars(s: string) {
    return s.toUpperCase() === s && s !== s.toLowerCase()
}

export default Bob

class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim()
        
        if (message.length === 0) {
            return 'Fine. Be that way!'
        }
        
        if (isUpperCaseAndHasAlphabeticChars(message)) {
            return 'Whoa, chill out!'
        }
        
        if (message.endsWith('?')) {
            return 'Sure.'
        }
        
        return 'Whatever.'
    }
}

function isUpperCaseAndHasAlphabeticChars(s: string) {
    let hasAlpha = false
    for (let i = 0; i < s.length; i++) {
        const char = s[i]
        if (char >= 'A' && char <= 'Z') {
            hasAlpha = true
        } else if (char >= 'a' && char <= 'z') {
            return false
        }
    }
    return hasAlpha
}

export default Bob
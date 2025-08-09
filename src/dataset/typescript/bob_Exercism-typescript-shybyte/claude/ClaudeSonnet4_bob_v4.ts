class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim()
        
        if (message.length === 0) {
            return 'Fine. Be that way!'
        }
        
        const hasAlpha = /[a-zA-Z]/.test(message)
        if (hasAlpha && message === message.toUpperCase()) {
            return 'Whoa, chill out!'
        }
        
        if (message.endsWith('?')) {
            return 'Sure.'
        }
        
        return 'Whatever.'
    }
}

export default Bob
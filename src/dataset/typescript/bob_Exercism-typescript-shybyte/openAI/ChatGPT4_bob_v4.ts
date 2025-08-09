class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim();
        if (message === '') return 'Fine. Be that way!';
        const hasLetters = /[a-zA-Z]/.test(message);
        const isShouting = hasLetters && message === message.toUpperCase();
        if (isShouting) return 'Whoa, chill out!';
        if (message.endsWith('?')) return 'Sure.';
        return 'Whatever.';
    }
}

export default Bob;
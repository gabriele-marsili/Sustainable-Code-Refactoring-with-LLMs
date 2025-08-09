class Bob {
    hey(messageRaw: string) {
        const message = messageRaw.trim();
        if (message === '') return 'Fine. Be that way!';

        let hasAlpha = false;
        let isUpper = true;

        for (let i = 0; i < message.length; i++) {
            const c = message[i];
            if (c >= 'a' && c <= 'z') {
                isUpper = false;
                hasAlpha = true;
                break;
            } else if (c >= 'A' && c <= 'Z') {
                hasAlpha = true;
            }
        }

        if (hasAlpha && isUpper) return 'Whoa, chill out!';
        if (message.endsWith('?')) return 'Sure.';
        return 'Whatever.';
    }
}

export default Bob;
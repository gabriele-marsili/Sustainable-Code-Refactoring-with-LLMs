class Bob {
    hey(messageRaw: string) {
        let hasAlpha = false;
        let isUpper = true;

        for (let i = 0; i < messageRaw.length; i++) {
            const c = messageRaw[i];
            if (c >= 'a' && c <= 'z') {
                isUpper = false;
                hasAlpha = true;
            } else if (c >= 'A' && c <= 'Z') {
                hasAlpha = true;
            }
        }

        const message = messageRaw.trim();
        if (message.length === 0) {
            return 'Fine. Be that way!';
        }
        if (hasAlpha && isUpper) {
            return 'Whoa, chill out!';
        }
        if (message.endsWith('?')) {
            return 'Sure.';
        }
        return 'Whatever.';
    }
}

export default Bob
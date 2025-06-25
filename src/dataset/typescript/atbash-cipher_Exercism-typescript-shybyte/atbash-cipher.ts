const aCode = 'a'.charCodeAt(0)
const zCODE = 'z'.charCodeAt(0)

const isNumber = (char: string) => /\d/.test(char)

const translate = (char: string) =>
    String.fromCharCode(zCODE - (char.charCodeAt(0) - aCode))

export default class AtbashCipher {
    encode = (s: string) =>
        s.toLowerCase()
            .replace(/[^\da-z]/g, '') // keep only number and lowercase letters
            .replace(/./g, (char) => isNumber(char) ? char : translate(char))
            .replace(/(.{5})/g, '$1 ') // split into chunks of length 5
            .trim()

    decode = (text: string): string =>
        [...text].map((c) => {
                if (/[a-z]/.test(c)) {
                    return String.fromCharCode(zCODE - c.charCodeAt(0) + aCode)
                } else if (isNumber(c)) {
                    return c
                }
                return ''
            }
        ).join('')
}

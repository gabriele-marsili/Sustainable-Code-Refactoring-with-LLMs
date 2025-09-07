const MIN_CHAR_CODE = 97
const MAX_CHAR_CODE = 122
const LETTERS_TOTAL = 26
const RANDOM_KEY_LENGTH = 100

enum CipherTypeEnum {
  encode = 'encode',
  decode = 'decode'
}

type CipherType = keyof typeof CipherTypeEnum

export class SimpleCipher {
  private cipherKey: string
  private keyCharCodes: number[]

  constructor(key: string = '') {
    this.cipherKey = key || this.generateKey()
    this.keyCharCodes = this.precomputeKeyCharCodes()
  }

  get key(): string {
    return this.cipherKey
  }

  private generateKey(): string {
    const chars = new Array(RANDOM_KEY_LENGTH)
    
    for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
      chars[i] = String.fromCharCode(MIN_CHAR_CODE + Math.floor(Math.random() * LETTERS_TOTAL))
    }

    return chars.join('')
  }

  private precomputeKeyCharCodes(): number[] {
    const codes = new Array(this.cipherKey.length)
    for (let i = 0; i < this.cipherKey.length; i++) {
      codes[i] = this.cipherKey.charCodeAt(i) - MIN_CHAR_CODE
    }
    return codes
  }

  private modulo(x: number, y: number): number {
    return ((x % y) + y) % y
  }

  transcode(text: string, type: CipherType): string {
    const multiplier = type === CipherTypeEnum.encode ? 1 : -1
    const keyLength = this.keyCharCodes.length
    let result = ''
    let resultIndex = 0

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const charCode = char.charCodeAt(0)

      if (charCode >= MIN_CHAR_CODE && charCode <= MAX_CHAR_CODE) {
        const letterOffset = charCode - MIN_CHAR_CODE
        const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier
        const newCharCode = this.modulo(letterOffset + keyOffset, LETTERS_TOTAL) + MIN_CHAR_CODE
        
        result += String.fromCharCode(newCharCode)
        resultIndex++
      } else if ((charCode >= 48 && charCode <= 57)) {
        result += char
        resultIndex++
      }
    }

    return result
  }

  encode(text: string): string {
    return this.transcode(text, CipherTypeEnum.encode)
  }

  decode(text: string): string {
    return this.transcode(text, CipherTypeEnum.decode)
  }
}
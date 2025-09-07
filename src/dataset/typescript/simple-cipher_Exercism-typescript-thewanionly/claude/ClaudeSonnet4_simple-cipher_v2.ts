const MIN_CHAR_CODE = 97 //char code of 'a'
const MAX_CHAR_CODE = 122 //char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE
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
    this.keyCharCodes = this.precomputeKeyCodes()
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

  private precomputeKeyCodes(): number[] {
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
      
      // Skip non-lowercase letters
      if (charCode < MIN_CHAR_CODE || charCode > MAX_CHAR_CODE) {
        const lowerChar = char.toLowerCase()
        const lowerCharCode = lowerChar.charCodeAt(0)
        
        if (lowerCharCode >= MIN_CHAR_CODE && lowerCharCode <= MAX_CHAR_CODE) {
          const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier
          const newCharCode = this.modulo(lowerCharCode - MIN_CHAR_CODE + keyOffset, LETTERS_TOTAL) + MIN_CHAR_CODE
          result += String.fromCharCode(newCharCode)
          resultIndex++
        }
      } else {
        const keyOffset = this.keyCharCodes[resultIndex % keyLength] * multiplier
        const newCharCode = this.modulo(charCode - MIN_CHAR_CODE + keyOffset, LETTERS_TOTAL) + MIN_CHAR_CODE
        result += String.fromCharCode(newCharCode)
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
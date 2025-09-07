const MIN_CHAR_CODE = 97;
const MAX_CHAR_CODE = 122;
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE;
const LETTERS_TOTAL = 26;
const RANDOM_KEY_LENGTH = 100;

enum CipherTypeEnum {
  encode = 'encode',
  decode = 'decode'
}

type CipherType = keyof typeof CipherTypeEnum

export class SimpleCipher {
  private cipherKey: string;
  private readonly keyLength: number;

  constructor(key: string = '') {
    this.cipherKey = key || this.generateKey();
    this.keyLength = this.cipherKey.length;
  }

  get key(): string {
    return this.cipherKey;
  }

  private generateKey(): string {
    let key = '';
    const randomValues = new Uint8Array(RANDOM_KEY_LENGTH);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < RANDOM_KEY_LENGTH; i++) {
      key += String.fromCharCode(MIN_CHAR_CODE + (randomValues[i] % LETTERS_TOTAL));
    }

    return key;
  }

  private modulo(x: number, y: number): number {
    return ((x % y) + y) % y;
  }

  transcode(text: string, type: CipherType): string {
    const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
    const cleanText = text.replace(/\W/g, '').toLowerCase();
    const textLength = cleanText.length;
    let result = '';

    for (let i = 0; i < textLength; i++) {
      const charCode = cleanText.charCodeAt(i);
      const keyCharCode = this.cipherKey.charCodeAt(i % this.keyLength);
      const shiftedCharCode = this.modulo(
        charCode - MIN_CHAR_CODE + (keyCharCode - MIN_CHAR_CODE) * multiplier,
        OFFSET + 1
      ) + MIN_CHAR_CODE;
      result += String.fromCharCode(shiftedCharCode);
    }

    return result;
  }

  encode(text: string): string {
    return this.transcode(text, CipherTypeEnum.encode);
  }

  decode(text: string): string {
    return this.transcode(text, CipherTypeEnum.decode);
  }
}
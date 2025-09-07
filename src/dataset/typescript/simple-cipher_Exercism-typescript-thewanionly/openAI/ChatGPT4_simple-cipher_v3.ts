const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE + 1;
const RANDOM_KEY_LENGTH = 100;

enum CipherTypeEnum {
  encode = 'encode',
  decode = 'decode',
}

type CipherType = keyof typeof CipherTypeEnum;

export class SimpleCipher {
  private cipherKey: string;

  constructor(key: string = '') {
    this.cipherKey = key || this.generateKey();
  }

  get key(): string {
    return this.cipherKey;
  }

  private generateKey(): string {
    return Array.from({ length: RANDOM_KEY_LENGTH }, () =>
      String.fromCharCode(MIN_CHAR_CODE + Math.floor(Math.random() * OFFSET))
    ).join('');
  }

  private modulo(x: number, y: number): number {
    return x >= 0 ? x % y : (x % y) + y;
  }

  transcode(text: string, type: CipherType): string {
    const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
    const keyLength = this.cipherKey.length;

    return Array.from(text.toLowerCase().replace(/\W/g, ''), (letter, index) =>
      String.fromCharCode(
        this.modulo(
          letter.charCodeAt(0) -
            MIN_CHAR_CODE +
            (this.cipherKey.charCodeAt(index % keyLength) - MIN_CHAR_CODE) * multiplier,
          OFFSET
        ) + MIN_CHAR_CODE
      )
    ).join('');
  }

  encode(text: string): string {
    return this.transcode(text, CipherTypeEnum.encode);
  }

  decode(text: string): string {
    return this.transcode(text, CipherTypeEnum.decode);
  }
}
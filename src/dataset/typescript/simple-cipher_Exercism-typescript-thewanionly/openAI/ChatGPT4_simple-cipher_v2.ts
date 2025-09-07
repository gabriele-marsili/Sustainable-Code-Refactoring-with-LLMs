const MIN_CHAR_CODE = 97; // char code of 'a'
const MAX_CHAR_CODE = 122; // char code of 'z'
const OFFSET = MAX_CHAR_CODE - MIN_CHAR_CODE + 1; // Include 'z'
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

  private transcodeChar(
    charCode: number,
    keyCharCode: number,
    multiplier: number
  ): string {
    return String.fromCharCode(
      MIN_CHAR_CODE +
        (((charCode - MIN_CHAR_CODE + (keyCharCode - MIN_CHAR_CODE) * multiplier) % OFFSET) + OFFSET) %
          OFFSET
    );
  }

  private transcode(text: string, type: CipherType): string {
    const multiplier = type === CipherTypeEnum.encode ? 1 : -1;
    const keyLength = this.cipherKey.length;

    return Array.from(text.toLowerCase())
      .filter((char) => char >= 'a' && char <= 'z') // Filter valid letters
      .map((char, index) =>
        this.transcodeChar(
          char.charCodeAt(0),
          this.cipherKey.charCodeAt(index % keyLength),
          multiplier
        )
      )
      .join('');
  }

  encode(text: string): string {
    return this.transcode(text, CipherTypeEnum.encode);
  }

  decode(text: string): string {
    return this.transcode(text, CipherTypeEnum.decode);
  }
}
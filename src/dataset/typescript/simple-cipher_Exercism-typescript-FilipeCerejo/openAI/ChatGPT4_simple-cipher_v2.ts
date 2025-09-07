const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;
const asciiOffset = 97; // 'a' in ASCII

export class SimpleCipher {
  private _key: string;

  public get key() {
    return this._key;
  }

  constructor(key?: string) {
    this._key = key ?? this.buildKey();
  }

  private buildKey(): string {
    return Array.from({ length: 100 }, () => alphabet[Math.floor(Math.random() * alphabetLength)]).join('');
  }

  private extendKey(textLength: number): void {
    if (textLength > this._key.length) {
      this._key = this._key.repeat(Math.ceil(textLength / this._key.length)).slice(0, textLength);
    }
  }

  private shiftChar(charCode: number, shift: number, direction: 1 | -1): string {
    const shifted = charCode + direction * shift;
    return String.fromCharCode(
      shifted < asciiOffset
        ? shifted + alphabetLength
        : shifted >= asciiOffset + alphabetLength
        ? shifted - alphabetLength
        : shifted
    );
  }

  encode(text: string): string {
    this.extendKey(text.length);
    return text
      .split('')
      .map((char, idx) =>
        this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - asciiOffset, 1)
      )
      .join('');
  }

  decode(text: string): string {
    this.extendKey(text.length);
    return text
      .split('')
      .map((char, idx) =>
        this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - asciiOffset, -1)
      )
      .join('');
  }
}
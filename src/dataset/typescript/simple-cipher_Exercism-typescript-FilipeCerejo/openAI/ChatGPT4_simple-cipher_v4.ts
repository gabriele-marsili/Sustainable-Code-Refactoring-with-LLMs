const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetLength = alphabet.length;
const charCodeA = 'a'.charCodeAt(0);
const charCodeZ = 'z'.charCodeAt(0);

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
      shifted > charCodeZ ? shifted - alphabetLength : shifted < charCodeA ? shifted + alphabetLength : shifted
    );
  }

  encode(text: string): string {
    this.extendKey(text.length);
    return Array.from(text, (char, idx) =>
      this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - charCodeA, 1)
    ).join('');
  }

  decode(text: string): string {
    this.extendKey(text.length);
    return Array.from(text, (char, idx) =>
      this.shiftChar(char.charCodeAt(0), this._key.charCodeAt(idx) - charCodeA, -1)
    ).join('');
  }
}
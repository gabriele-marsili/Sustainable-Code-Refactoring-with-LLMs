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

  private extendKey(text: string): void {
    if (text.length > this._key.length) {
      this._key = this._key.repeat(Math.ceil(text.length / this._key.length)).slice(0, text.length);
    }
  }

  encode(text: string): string {
    this.extendKey(text);
    return Array.from(text, (char, idx) => {
      const encodedCharCode = char.charCodeAt(0) + (this._key.charCodeAt(idx) - charCodeA);
      return String.fromCharCode(encodedCharCode > charCodeZ ? encodedCharCode - alphabetLength : encodedCharCode);
    }).join('');
  }

  decode(text: string): string {
    this.extendKey(text);
    return Array.from(text, (char, idx) => {
      const decodedCharCode = char.charCodeAt(0) - (this._key.charCodeAt(idx) - charCodeA);
      return String.fromCharCode(decodedCharCode < charCodeA ? decodedCharCode + alphabetLength : decodedCharCode);
    }).join('');
  }
}
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

  encode(text: string): string {
    this.extendKey(text.length);

    return text
      .split('')
      .map((char, idx) => {
        const encodedCharCode = ((char.charCodeAt(0) - asciiOffset + (this._key.charCodeAt(idx) - asciiOffset)) % alphabetLength) + asciiOffset;
        return String.fromCharCode(encodedCharCode);
      })
      .join('');
  }

  decode(text: string): string {
    this.extendKey(text.length);

    return text
      .split('')
      .map((char, idx) => {
        const decodedCharCode = ((char.charCodeAt(0) - asciiOffset - (this._key.charCodeAt(idx) - asciiOffset) + alphabetLength) % alphabetLength) + asciiOffset;
        return String.fromCharCode(decodedCharCode);
      })
      .join('');
  }
}
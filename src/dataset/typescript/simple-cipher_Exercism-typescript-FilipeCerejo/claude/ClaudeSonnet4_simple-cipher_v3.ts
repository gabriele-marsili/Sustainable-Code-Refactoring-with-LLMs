const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export class SimpleCipher {
  private _key: string;
  
  public get key() {
    return this._key;
  }

  constructor(key?: string) {
    this._key = key ?? this.buildKey();
  }

  private buildKey(): string {
    const chars = new Array(100);
    for (let i = 0; i < 100; i++) {
      chars[i] = alphabet[Math.floor(Math.random() * 26)];
    }
    return chars.join('');
  }

  private extendKey(textLength: number): void {
    if (textLength > this._key.length) {
      const timesRepeat = Math.ceil(textLength / this._key.length);
      this._key = this._key.repeat(timesRepeat);
    }
  }
  
  encode(text: string): string {
    this.extendKey(text.length);
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const keyDisplacement = this._key.charCodeAt(i) - 97;
      let encodedChar = text.charCodeAt(i) + keyDisplacement;
      if (encodedChar > 122) {
        encodedChar -= 26;
      }
      result += String.fromCharCode(encodedChar);
    }
    return result;
  }

  decode(text: string): string {
    this.extendKey(text.length);
    
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const keyDisplacement = this._key.charCodeAt(i) - 97;
      let decodedChar = text.charCodeAt(i) - keyDisplacement;
      if (decodedChar < 97) {
        decodedChar += 26;
      }
      result += String.fromCharCode(decodedChar);
    }
    return result;
  }
}
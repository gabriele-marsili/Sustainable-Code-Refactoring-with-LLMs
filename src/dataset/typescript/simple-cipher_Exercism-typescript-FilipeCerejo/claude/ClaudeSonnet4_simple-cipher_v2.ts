const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export class SimpleCipher {

  private _key: string;
  
  public get key() {
    return this._key;
  }

  constructor(key?: string) {
    this._key = key ?? this.buildKey();
  }

  private buildKey() {
    const chars = new Array(100);
    for (let i = 0; i < 100; i++) {
      chars[i] = alphabet[Math.floor(Math.random() * 26)];
    }
    return chars.join('');
  }

  private getKeyChar(index: number): number {
    return this._key.charCodeAt(index % this._key.length) - 97;
  }
  
  encode(text: string) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const keyDisplacement = this.getKeyChar(i);
      let encodedChar = text.charCodeAt(i) + keyDisplacement;
      if (encodedChar > 122) {
        encodedChar -= 26;
      }
      result += String.fromCharCode(encodedChar);
    }
    return result;
  }

  decode(text: string) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const keyDisplacement = this.getKeyChar(i);
      let decodedChar = text.charCodeAt(i) - keyDisplacement;
      if (decodedChar < 97) {
        decodedChar += 26;
      }
      result += String.fromCharChar(decodedChar);
    }
    return result;
  }
}
export class SimpleCipher {

  private _key: string;
  private static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly alphabetLength = SimpleCipher.alphabet.length;
  private static readonly defaultKeyLength = 100;

  public get key() {
    return this._key;
  }

  constructor(key?: string) {
    this._key = key ?? this.buildKey();
  }

  private buildKey() {
    let key = '';
    for (let i = 0; i < SimpleCipher.defaultKeyLength; i++) {
      const idx = Math.floor(Math.random() * SimpleCipher.alphabetLength);
      key += SimpleCipher.alphabet[idx];
    }
    return key;
  }

  encode(text: string) {
    const keyLength = this._key.length;
    const textLength = text.length;
    let encodedText = '';

    for (let i = 0; i < textLength; i++) {
      const keyChar = this._key[i % keyLength];
      const keyIdxDisplacement = keyChar.charCodeAt(0) - 97;
      let encodedCharCode = text.charCodeAt(i) + keyIdxDisplacement;

      if (encodedCharCode > 122) {
        encodedCharCode -= SimpleCipher.alphabetLength;
      }
      encodedText += String.fromCharCode(encodedCharCode);
    }

    return encodedText;
  }

  decode(text: string) {
    const keyLength = this._key.length;
    const textLength = text.length;
    let decodedText = '';

    for (let i = 0; i < textLength; i++) {
      const keyChar = this._key[i % keyLength];
      const keyIdxDisplacement = keyChar.charCodeAt(0) - 97;
      let decodedCharCode = text.charCodeAt(i) - keyIdxDisplacement;

      if (decodedCharCode < 97) {
        decodedCharCode += SimpleCipher.alphabetLength;
      }
      decodedText += String.fromCharCode(decodedCharCode);
    }

    return decodedText;
  }
}
class SimpleCipher {
  readonly key: string;
  private readonly keyLength: number;
  private readonly keyCharCodes: Uint8Array;

  constructor(key?: string) {
    this.key = key === undefined ? this.genKey() : this.validateKey(key);
    this.keyLength = this.key.length;
    this.keyCharCodes = new Uint8Array(this.keyLength);
    for (let i = 0; i < this.keyLength; i++) {
      this.keyCharCodes[i] = this.key.charCodeAt(i) - 97;
    }
  }

  private genKey(): string {
    const chars = new Array(100);
    for (let i = 0; i < 100; i++) {
      chars[i] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return chars.join('');
  }

  private validateKey(key: string): string {
    for (let i = 0; i < key.length; i++) {
      const code = key.charCodeAt(i);
      if (code < 97 || code > 122) {
        throw 'Bad key';
      }
    }
    return key;
  }

  private convert(str: string, isEncode: boolean): string {
    const result = new Array(str.length);
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i) - 97;
      const keyCharCode = this.keyCharCodes[i % this.keyLength];
      let newCharCode = isEncode ? charCode + keyCharCode : charCode - keyCharCode;
      newCharCode = ((newCharCode % 26) + 26) % 26;
      result[i] = String.fromCharCode(newCharCode + 97);
    }
    return result.join('');
  }

  encode(message: string): string {
    return this.convert(message, true);
  }

  decode(cipher: string): string {
    return this.convert(cipher, false);
  }
}

export default SimpleCipher;
class SimpleCipher {
  readonly key: string;
  private readonly keyInts: number[];
  private static readonly ALPHABET_SIZE = 26;

  constructor(key?: string) {
    this.key = key === undefined ? this.genKey() : this.validateKey(key);
    this.keyInts = this.precomputeKeyInts();
  }

  private genKey(): string {
    let result = '';
    for (let i = 0; i < 100; i++) {
      result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return result;
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

  private precomputeKeyInts(): number[] {
    const result = new Array(this.key.length);
    for (let i = 0; i < this.key.length; i++) {
      result[i] = this.key.charCodeAt(i) - 97;
    }
    return result;
  }

  private charToInt(char: string): number {
    return char.charCodeAt(0) - 97;
  }

  private intToChar(int: number): string {
    let index = int % SimpleCipher.ALPHABET_SIZE;
    if (index < 0) {
      index += SimpleCipher.ALPHABET_SIZE;
    }
    return String.fromCharCode(97 + index);
  }

  private convert(str: string, isEncode: boolean): string {
    let result = '';
    const keyLength = this.keyInts.length;
    
    for (let i = 0; i < str.length; i++) {
      let charInt = this.charToInt(str[i]);
      const keyCharInt = this.keyInts[i % keyLength];
      
      if (isEncode) {
        charInt += keyCharInt;
      } else {
        charInt -= keyCharInt;
      }
      
      result += this.intToChar(charInt);
    }
    
    return result;
  }

  encode(message: string): string {
    return this.convert(message, true);
  }

  decode(cipher: string): string {
    return this.convert(cipher, false);
  }
}

export default SimpleCipher;
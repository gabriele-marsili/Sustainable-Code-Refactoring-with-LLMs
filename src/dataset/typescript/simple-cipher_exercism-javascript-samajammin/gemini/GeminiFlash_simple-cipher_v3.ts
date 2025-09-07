class SimpleCipher {
  readonly key: string;
  private readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  private readonly alphabetLength: number = this.alphabet.length;

  constructor(key?: string) {
    this.key = key === undefined ? this.genKey() : this.validateKey(key);
  }

  private genKey(): string {
    const keyLength = 100;
    let key = '';
    for (let i = 0; i < keyLength; i++) {
      key += this.alphabet.charAt(Math.floor(Math.random() * this.alphabetLength));
    }
    return key;
  }

  private validateKey(key: string): string {
    if (!/^[a-z]+$/.test(key)) {
      throw 'Bad key';
    }
    return key;
  }

  private charToInt(char: string): number {
    return this.alphabet.indexOf(char);
  }

  private intToChar(int: number): string {
    const index = (int % this.alphabetLength + this.alphabetLength) % this.alphabetLength;
    return this.alphabet.charAt(index);
  }

  private convert(str: string, isEncode: boolean): string {
    const keyLength = this.key.length;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const charInt = this.charToInt(char);
      const keyIdx = i % keyLength;
      const keyCharInt = this.charToInt(this.key[keyIdx]);
      const convertedInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
      result += this.intToChar(convertedInt);
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
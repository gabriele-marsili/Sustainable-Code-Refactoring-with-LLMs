class SimpleCipher {
  readonly key: string;
  private static readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly alphabetLength: number = SimpleCipher.alphabet.length;

  constructor(key?: string) {
    this.key = key === undefined ? this.genKey() : this.validateKey(key);
  }

  private genKey(): string {
    let result = '';
    for (let i = 0; i < 100; i++) {
      result += SimpleCipher.alphabet.charAt(Math.floor(Math.random() * SimpleCipher.alphabetLength));
    }
    return result;
  }

  private validateKey(key: string): string {
    if (!/^[a-z]+$/.test(key)) {
      throw new Error('Bad key');
    }
    return key;
  }

  private charToInt(char: string): number {
    return SimpleCipher.alphabet.indexOf(char);
  }

  private intToChar(int: number): string {
    const index = (int % SimpleCipher.alphabetLength + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength;
    return SimpleCipher.alphabet.charAt(index);
  }

  private convert(str: string, isEncode: boolean): string {
    let result = '';
    const keyLength = this.key.length;
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const charInt = this.charToInt(char);
      const keyCharInt = this.charToInt(this.key[i % keyLength]);
      const newCharInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
      result += this.intToChar(newCharInt);
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
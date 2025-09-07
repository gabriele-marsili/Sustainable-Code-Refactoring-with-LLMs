class SimpleCipher {
  readonly key: string;
  private static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly alphabetLength = SimpleCipher.alphabet.length;

  constructor(key?: string) {
    this.key = key ? this.validateKey(key) : this.genKey();
  }

  private genKey(): string {
    const randomChars = new Uint8Array(100);
    crypto.getRandomValues(randomChars);
    return Array.from(randomChars, (byte) => SimpleCipher.alphabet[byte % SimpleCipher.alphabetLength]).join('');
  }

  private validateKey(key: string): string {
    if (!/^[a-z]+$/.test(key)) {
      throw new Error('Bad key');
    }
    return key;
  }

  private static charToInt(char: string): number {
    return char.charCodeAt(0) - 97;
  }

  private static intToChar(int: number): string {
    return String.fromCharCode(((int % SimpleCipher.alphabetLength) + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength + 97);
  }

  private convert(str: string, isEncode: boolean): string {
    const keyLength = this.key.length;
    const keyInts = Array.from(this.key, SimpleCipher.charToInt);
    return Array.from(str, (char, idx) => {
      const charInt = SimpleCipher.charToInt(char);
      const keyCharInt = keyInts[idx % keyLength];
      return SimpleCipher.intToChar(isEncode ? charInt + keyCharInt : charInt - keyCharInt);
    }).join('');
  }

  encode(message: string): string {
    return this.convert(message, true);
  }

  decode(cipher: string): string {
    return this.convert(cipher, false);
  }
}

export default SimpleCipher;
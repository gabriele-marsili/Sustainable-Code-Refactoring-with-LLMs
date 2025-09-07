class SimpleCipher {
  readonly key: string;
  private static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly alphabetLength = SimpleCipher.alphabet.length;

  constructor(key?: string) {
    this.key = key ? this.validateKey(key) : this.genKey();
  }

  private genKey(): string {
    const keyArray = new Uint8Array(100);
    crypto.getRandomValues(keyArray);
    return Array.from(keyArray, byte => SimpleCipher.alphabet[byte % SimpleCipher.alphabetLength]).join('');
  }

  private validateKey(key: string): string {
    if (!/^[a-z]+$/.test(key)) {
      throw new Error('Bad key');
    }
    return key;
  }

  private charToInt(char: string): number {
    return char.charCodeAt(0) - 97; // 'a'.charCodeAt(0) === 97
  }

  private intToChar(int: number): string {
    return String.fromCharCode((int + SimpleCipher.alphabetLength) % SimpleCipher.alphabetLength + 97);
  }

  private convert(str: string, isEncode: boolean): string {
    const keyLength = this.key.length;
    return Array.from(str, (char, idx) => {
      const charInt = this.charToInt(char);
      const keyCharInt = this.charToInt(this.key[idx % keyLength]);
      const newCharInt = isEncode ? charInt + keyCharInt : charInt - keyCharInt;
      return this.intToChar(newCharInt);
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
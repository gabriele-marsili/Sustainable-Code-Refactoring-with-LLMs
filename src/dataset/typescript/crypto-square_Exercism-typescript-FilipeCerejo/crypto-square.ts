export class Crypto {
  private _encrypted: string;

  constructor(plainText: string) {
    const letters = this.removeNonCharsLower(plainText);
    const c = Math.ceil(Math.sqrt(letters.length));
    const encoded: string[] = Array(c).fill('');

    for (let i = 0; i < letters.length; i++) {
      encoded[i % c] += letters[i];
    }

    this._encrypted = encoded.join(' ');
  }

  get ciphertext(): string {
    return this._encrypted;
  }

  private removeNonCharsLower(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
}
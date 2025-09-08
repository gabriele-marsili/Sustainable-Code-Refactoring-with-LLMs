export class Crypto {
  private _encrypted: string;

  constructor(plainText: string) {
    const letters = this.removeNonCharsLower(plainText);
    const len = letters.length;
    const c = Math.ceil(Math.sqrt(len));

    let encoded = "";
    for (let col = 0; col < c; col++) {
      for (let row = 0; row < c; row++) {
        const index = row * c + col;
        encoded += index < len ? letters[index] : ' ';
      }
      encoded += col < c - 1 ? ' ' : '';
    }

    this._encrypted = encoded;
  }

  get ciphertext(): string {
    return this._encrypted;
  }

  private removeNonCharsLower(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
}
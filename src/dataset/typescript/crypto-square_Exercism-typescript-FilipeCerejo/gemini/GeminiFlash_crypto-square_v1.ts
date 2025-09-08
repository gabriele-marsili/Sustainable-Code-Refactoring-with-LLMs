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
        if (index < len) {
          encoded += letters[index];
        } else {
          encoded += ' ';
          break;
        }
      }
      encoded += ' ';
    }

    this._encrypted = encoded.trim();
  }

  get ciphertext(): string {
    return this._encrypted;
  }

  private removeNonCharsLower(text: string): string {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z0-9]/.test(char)) {
        result += char.toLowerCase();
      }
    }
    return result;
  }
}
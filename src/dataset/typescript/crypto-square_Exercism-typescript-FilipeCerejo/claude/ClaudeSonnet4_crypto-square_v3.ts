export class Crypto {
  private _encrypted: string;

  constructor(plainText: string) {
    const letters = this.removeNonCharsLower(plainText);
    const matrixSize = Math.ceil(Math.sqrt(letters.length));
    
    const encoded: string[] = [];
    
    for (let col = 0; col < matrixSize; col++) {
      let chunk = '';
      for (let row = 0; row < matrixSize; row++) {
        const index = row * matrixSize + col;
        if (index < letters.length) {
          chunk += letters[index];
        } else {
          chunk += ' ';
          break;
        }
      }
      encoded.push(chunk);
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
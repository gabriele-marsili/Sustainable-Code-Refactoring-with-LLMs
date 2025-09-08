export class Crypto {
  private _encrypted: string;

    constructor(plainText: string) {
        //normalize
        const letters = this.removeNonCharsLower(plainText);
        const len = letters.length;

        //matrix size
        const c = Math.ceil(Math.sqrt(len));
        const r = Math.ceil(len / c);

        //encode
        const encoded: string[] = [];
        for (let col = 0; col < c; col++) {
            let chunk = '';
            for (let row = 0; row < r; row++) {
                const idx = row * c + col;
                if (idx < len) {
                    chunk += letters[idx];
                } else {
                    break;
                }
            }
            if (chunk) {
                encoded.push(chunk);
            }
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
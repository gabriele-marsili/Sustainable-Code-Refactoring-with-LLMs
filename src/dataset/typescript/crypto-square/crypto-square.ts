export class Crypto {
  private _encrypted: string;

    constructor(plainText: string) {
        //normalize
        let letters = this.removeNonCharsLower(plainText);

        //matrix size
        let c = Math.ceil(Math.sqrt(letters.length));
        let r = Math.ceil(Math.sqrt(letters.length));

        //chunkcs
        let arr: string[] = [];
        let idx = 0;
        while (idx < letters.length) {
            arr.push(letters.substring(idx, idx + c));
            idx += c;
        }

        // //encode
        let encoded: string[] = [];
        for (let col = 0; col < c; col++) {
            let chunck = '';
            for (let row = 0; row < r; row++) {
                if (arr[row][col]) {
                    chunck += arr[row][col];
                } else {
                    chunck += ' ';
                    break;
                }
            }
            encoded.push(chunck);
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

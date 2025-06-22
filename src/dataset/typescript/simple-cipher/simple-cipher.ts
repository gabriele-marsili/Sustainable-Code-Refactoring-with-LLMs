const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export class SimpleCipher {

  private _key: string;
  
  public get key() {
    return this._key;
  }

  constructor(key?: string) {
    this._key = key ?? this.buildKey();
  }

  private buildKey() {
    let aux = 0;
    let key = '';
    while(aux < 100) {
      let idx = Math.floor(Math.random() * alphabet.length);
      key += alphabet[idx];
      aux++;
    }
    return key;
  }

  private extendKey(text: string): void {
    if(text.length > this._key.length) {
      let timesRepeat = Math.ceil(text.length / this._key.length);
      this._key = this._key.repeat(timesRepeat);
    }
  }
  
  encode(text: string) {
    this.extendKey(text); // if needed
      
    return [...text].map((t,idx) => {
      let keyIdxDisplacment = this._key.charCodeAt(idx) - 97; //'a' in ASCII
      let encodedLetter = t.charCodeAt(0) + keyIdxDisplacment;
      if(encodedLetter > 122) //'z' in ASCII
        encodedLetter -= alphabet.length;
      return String.fromCharCode(encodedLetter);
    }).join('');
  }

  decode(text: string) {
    this.extendKey(text); // if needed
    
    return [...text].map((t,idx) => {
      let keyIdxDisplaced = this._key.charCodeAt(idx) - 97; //'a' in ASCII
      let decodedLetter = t.charCodeAt(0) - keyIdxDisplaced;
      if(decodedLetter < 97) //'a' in ASCII
        decodedLetter += alphabet.length;
      return String.fromCharCode(decodedLetter);
    }).join('');
  }
}

class Crypto {
  constructor(plainText) {
    this.palinText = plainText;
    this._normalizedText = null;
    this._squareSize = null;
    this._segments = null;
    this._cipher = null;
  }

  normalizePlaintext() {
    if (this._normalizedText === null) {
      this._normalizedText = this.palinText
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    }
    return this._normalizedText;
  }

  size() {
    if (this._squareSize === null) {
      this._squareSize = Math.ceil(Math.sqrt(this.normalizePlaintext().length));
    }
    return this._squareSize;
  }

  plaintextSegments() {
    if (this._segments === null) {
      const text = this.normalizePlaintext();
      const size = this.size();
      const segments = [];
      
      for (let i = 0; i < text.length; i += size) {
        segments.push(text.slice(i, i + size));
      }
      
      this._segments = segments;
    }
    return this._segments;
  }

  ciphertext() {
    if (this._cipher === null) {
      const segments = this.plaintextSegments();
      const size = this.size();
      const result = [];
      
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < segments.length; row++) {
          const char = segments[row][col];
          if (char) result.push(char);
        }
      }
      
      this._cipher = result.join('');
    }
    return this._cipher;
  }

  normalizeCiphertext() {
    const cipher = this.ciphertext();
    const size = this.size();
    const groups = [];
    
    for (let i = 0; i < cipher.length; i += size) {
      groups.push(cipher.slice(i, i + size));
    }
    
    return groups.join(' ');
  }
}

export default Crypto;
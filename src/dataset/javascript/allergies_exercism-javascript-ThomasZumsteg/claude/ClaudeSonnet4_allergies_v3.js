class Allergies {
  constructor(code) {
    this.code = code;
    this._allergieList = [
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats'
    ];
    this._allergieMap = new Map(this._allergieList.map((item, index) => [item, index]));
  }

  get allergieList() {
    return this._allergieList;
  }

  list() {
    const result = [];
    for (let i = 0; i < this._allergieList.length; i++) {
      if (this.code & (1 << i)) {
        result.push(this._allergieList[i]);
      }
    }
    return result;
  }

  allergicTo(item, index) {
    if (typeof index === 'undefined') {
      index = this._allergieMap.get(item);
      if (index === undefined) return false;
    }
    return Boolean(this.code & (1 << index));
  }
}

export default Allergies;
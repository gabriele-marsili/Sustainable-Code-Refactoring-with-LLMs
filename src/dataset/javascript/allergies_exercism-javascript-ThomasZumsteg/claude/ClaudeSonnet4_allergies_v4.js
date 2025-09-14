const ALLERGIE_LIST = [
  'eggs',
  'peanuts',
  'shellfish',
  'strawberries',
  'tomatoes',
  'chocolate',
  'pollen',
  'cats'
];

const ALLERGIE_MAP = new Map(ALLERGIE_LIST.map((item, index) => [item, index]));

var Allergies = function(code) {
  this.code = code & 255;
};

Allergies.prototype.list = function() {
  const result = [];
  let tempCode = this.code;
  let index = 0;
  
  while (tempCode > 0 && index < ALLERGIE_LIST.length) {
    if (tempCode & 1) {
      result.push(ALLERGIE_LIST[index]);
    }
    tempCode >>>= 1;
    index++;
  }
  
  return result;
};

Allergies.prototype.allergicTo = function(item, index) {
  if (typeof index === 'undefined') {
    index = ALLERGIE_MAP.get(item);
    if (index === undefined) return false;
  }
  return (this.code & (1 << index)) !== 0;
};

export default Allergies;
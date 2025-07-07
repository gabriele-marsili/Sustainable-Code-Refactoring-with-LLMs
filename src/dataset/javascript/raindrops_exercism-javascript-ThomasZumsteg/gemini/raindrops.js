class Raindrops {
  convert(number) {
    const factorToSound = {
      3: "Pling",
      5: "Plang",
      7: "Plong",
    };

    let result = "";

    for (const factor of Object.keys(factorToSound).sort((a, b) => a - b)) {
      if (number % factor === 0) {
        result += factorToSound[factor];
      }
    }

    return result || number.toString();
  }
}

module.exports = Raindrops;
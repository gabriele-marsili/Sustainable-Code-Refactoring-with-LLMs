class Raindrops {
  convert(number) {
    const div3 = number % 3 === 0;
    const div5 = number % 5 === 0;
    const div7 = number % 7 === 0;

    if (!div3 && !div5 && !div7) return number.toString();

    return `${div3 ? 'Pling' : ''}${div5 ? 'Plang' : ''}${div7 ? 'Plong' : ''}`;
  }
}

export default Raindrops;

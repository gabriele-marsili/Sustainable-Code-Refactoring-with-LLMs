class BeerSong {
  constructor() {
    this.actions = {
      onemore: "\nTake it down and pass it around, ",
      nomore: "\nGo to the store and buy some more, ",
      def: "\nTake one down and pass it around, "
    };
  }

  actionBuilder(num) {
    return num === 0
      ? this.actions.nomore
      : num === 1
      ? this.actions.onemore
      : this.actions.def;
  }

  howManyBottles(num) {
    return num === 0
      ? "No more bottles of beer"
      : num === 1
      ? "1 bottle of beer"
      : `${num} bottles of beer`;
  }

  nextVerse(num) {
    const nextAmt = num - 1;
    const ofBeer = " on the wall.\n";
    return (nextAmt === -1
      ? this.howManyBottles(99)
      : this.howManyBottles(nextAmt)
    ).toLowerCase() + ofBeer;
  }

  songBuilder(num) {
    const bottles = this.howManyBottles(num);
    return (
      bottles +
      " on the wall, " +
      bottles.toLowerCase() +
      "." +
      this.actionBuilder(num) +
      this.nextVerse(num)
    );
  }

  verse(num) {
    return this.songBuilder(num);
  }

  sing(...args) {
    if (args.length === 1) {
      const start = args[0];
      return Array.from({ length: start + 1 }, (_, i) =>
        this.songBuilder(start - i)
      ).join("\n");
    }

    return args
      .map((arg, i) =>
        i === args.length - 1
          ? this.songBuilder(arg)
          : this.songBuilder(arg) + "\n" + this.songBuilder(arg - 1)
      )
      .join("\n");
  }
}

export default BeerSong;
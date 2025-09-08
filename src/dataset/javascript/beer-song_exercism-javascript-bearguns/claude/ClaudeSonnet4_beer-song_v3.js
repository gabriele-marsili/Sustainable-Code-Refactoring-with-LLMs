class BeerSong {
  constructor() {
    this.actions = Object.freeze({
      onemore: "\nTake it down and pass it around, ",
      nomore: "\nGo to the store and buy some more, ",
      def: "\nTake one down and pass it around, "
    });
  }

  actionBuilder(num) {
    return num === 0 ? this.actions.nomore : 
           num === 1 ? this.actions.onemore : 
           this.actions.def;
  }

  howManyBottles(num) {
    return num === 0 ? "No more bottles of beer" :
           num === 1 ? "1 bottle of beer" :
           `${num} bottles of beer`;
  }

  nextVerse(num) {
    const nextAmt = num === 0 ? 99 : num - 1;
    return (this.howManyBottles(nextAmt) + " on the wall.\n").toLowerCase();
  }

  songBuilder(num) {
    const bottles = this.howManyBottles(num);
    return `${bottles} on the wall, ${bottles.toLowerCase()}.${this.actionBuilder(num)}${this.nextVerse(num)}`;
  }

  verse(num) {
    return this.songBuilder(num);
  }

  sing(...args) {
    if (args.length === 1) {
      const verses = [];
      for (let i = args[0]; i >= 0; i--) {
        verses.push(this.songBuilder(i));
      }
      return verses.join(verses.length > 1 ? "\n" : "");
    }

    const result = [];
    for (let i = 0; i < args.length; i++) {
      result.push(this.songBuilder(args[i]));
      if (i < args.length - 1) {
        result.push(this.songBuilder(args[i] - 1));
      }
    }
    return result.join("\n");
  }
}

export default BeerSong;
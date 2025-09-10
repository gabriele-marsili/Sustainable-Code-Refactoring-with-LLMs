export class Robot {
  private static releaseNames = new Set<string>();
  private static readonly letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  private static readonly numbers = Array.from({ length: 10 }, (_, i) => i.toString());
  private _name: string;

  constructor() {
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      newName = `${Robot.getRandomLetter()}${Robot.getRandomLetter()}${Robot.getRandomNumber()}${Robot.getRandomNumber()}${Robot.getRandomNumber()}`;
    } while (Robot.releaseNames.has(newName));

    Robot.releaseNames.add(newName);
    return newName;
  }

  private static getRandomLetter(): string {
    return Robot.letters[Math.floor(Math.random() * Robot.letters.length)];
  }

  private static getRandomNumber(): string {
    return Robot.numbers[Math.floor(Math.random() * Robot.numbers.length)];
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    Robot.releaseNames.delete(this._name);
    this._name = this.buildName();
  }

  public static releaseNames(): Set<string> {
    return new Set(Robot.releaseNames);
  }
}
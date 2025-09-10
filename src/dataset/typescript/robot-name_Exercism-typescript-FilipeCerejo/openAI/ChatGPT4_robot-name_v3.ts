export class Robot {
  private _name: string;
  private static _releaseNames: Set<string> = new Set();

  constructor() {
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      newName = `${this.getRandomLetter()}${this.getRandomLetter()}${this.getRandomNumber()}${this.getRandomNumber()}${this.getRandomNumber()}`;
    } while (Robot._releaseNames.has(newName));

    Robot._releaseNames.add(newName);
    return newName;
  }

  private getRandomLetter(): string {
    return String.fromCharCode(65 + (Math.random() * 26) | 0);
  }

  private getRandomNumber(): number {
    return (Math.random() * 10) | 0;
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    this._name = this.buildName();
  }

  public static releaseNames(): Set<string> {
    return Robot._releaseNames;
  }
}
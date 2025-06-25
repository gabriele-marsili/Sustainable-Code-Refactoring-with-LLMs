export class Robot {

  private _name: string;
  public static ReleaseNames: Set<string>;
  
  constructor() {
    Robot.ReleaseNames = new Set();
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      newName = '';
      newName += this.getRandomLetter();
      newName += this.getRandomLetter();
      newName += this.getRandomNumber();
      newName += this.getRandomNumber();
      newName += this.getRandomNumber();
    }
    while(Robot.ReleaseNames.has(newName));

    Robot.ReleaseNames.add(newName);
    
    return newName;
  }

  private getRandomLetter(): string {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    //Robot.ReleaseNames.delete(this._name);
    this._name = this.buildName();
  }

  public static releaseNames(): Set<string> {
    return Robot.ReleaseNames;
  }
}

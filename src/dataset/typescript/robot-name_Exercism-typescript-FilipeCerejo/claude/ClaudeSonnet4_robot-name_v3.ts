export class Robot {

  private _name: string;
  public static ReleaseNames: Set<string> = new Set();
  
  constructor() {
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      const letter1 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const letter2 = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      const num3 = Math.floor(Math.random() * 10);
      newName = letter1 + letter2 + num1 + num2 + num3;
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
    Robot.ReleaseNames.delete(this._name);
    this._name = this.buildName();
  }

  public static releaseNames(): Set<string> {
    return Robot.ReleaseNames;
  }
}
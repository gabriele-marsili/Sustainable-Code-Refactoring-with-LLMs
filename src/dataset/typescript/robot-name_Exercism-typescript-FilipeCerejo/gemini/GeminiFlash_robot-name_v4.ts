export class Robot {

  private _name: string;
  private static releaseNames: Set<string> = new Set();
  private static readonly alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor() {
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      newName = this.generateName();
    } while (Robot.releaseNames.has(newName));

    Robot.releaseNames.add(newName);
    return newName;
  }

  private generateName(): string {
    let name = '';
    for (let i = 0; i < 2; i++) {
      name += Robot.alphabet[Math.floor(Math.random() * 26)];
    }
    for (let i = 0; i < 3; i++) {
      name += Math.floor(Math.random() * 10);
    }
    return name;
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    this._name = this.buildName();
  }

  public static releaseNames(): Set<string> {
    return Robot.releaseNames;
  }
}
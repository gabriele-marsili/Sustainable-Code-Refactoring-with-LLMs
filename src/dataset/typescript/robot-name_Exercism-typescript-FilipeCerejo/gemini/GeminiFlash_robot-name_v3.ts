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
    const letter1 = Robot.alphabet[Math.floor(Math.random() * 26)];
    const letter2 = Robot.alphabet[Math.floor(Math.random() * 26)];
    const number = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${letter1}${letter2}${number}`;
  }

  public get name(): string {
    return this._name;
  }

  public resetName(): void {
    this._name = this.buildName();
  }

  public static releaseNamesSet(): Set<string> {
    return Robot.releaseNames;
  }
}
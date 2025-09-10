export class Robot {
  private _name: string;
  private static releaseNames = new Set<string>();
  private static readonly LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static readonly DIGITS = "0123456789";

  constructor() {
    this._name = this.buildName();
  }

  private buildName(): string {
    let newName: string;
    do {
      newName = `${Robot.randomString(Robot.LETTERS, 2)}${Robot.randomString(Robot.DIGITS, 3)}`;
    } while (Robot.releaseNames.has(newName));

    Robot.releaseNames.add(newName);
    return newName;
  }

  private static randomString(source: string, length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += source.charAt(Math.floor(Math.random() * source.length));
    }
    return result;
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
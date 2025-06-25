
function shuffle(names: string[]): void {
  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }
}

function generateNames(): string[] {
  const names = []
  for (let i = 65; i < 91; i++) {
    for (let j = 65; j < 91; j++) {
      for (let k = 0; k < 1000; k++) {
        names.push(`${String.fromCharCode(i)}${String.fromCharCode(j)}${k.toString().padStart(3, '0')}`)
      }
    }
  }
  return names
}

export default class Robot {
  static names: string[]

  #name: string

  constructor() {
    this.#name = Robot.names.pop()!
  }

  public get name(): string {
    return this.#name
  }

  public resetName(): void {
    this.#name = Robot.names.pop()!
  }

  public static releaseNames(): void {
    Robot.names = generateNames()
    shuffle(Robot.names)
  }
}

Robot.releaseNames()

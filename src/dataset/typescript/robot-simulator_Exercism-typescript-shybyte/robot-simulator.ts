type Direction = 'north' | 'east' | 'south' | 'west'
const DIRECTIONS: Direction[] = ['north', 'east', 'south', 'west']
type Pos = [number, number]

const MOVEMENT_BY_DIRECTION = new Map<Direction, Pos>([
    ['north', [0, 1]],
    ['east', [1, 0]],
    ['south', [0, -1]],
    ['west', [-1, 0]],
])

const INSTRUCTIONS: { [short: string]: keyof Robot } = {
    L: 'turnLeft',
    R: 'turnRight',
    A: 'advance'
}

export default class Robot {
    public coordinates: Pos
    public bearing: Direction

    constructor(x = 0, y = 0, direction: Direction = 'north') {
        this.orient(direction)
        this.at(x, y)
    }

    orient(direction: string) {
        if (!DIRECTIONS.includes(direction as Direction)) {
            throw 'Invalid Robot Bearing'
        }
        this.bearing = direction as Direction
    }

    turnRight(amount = 1) {
        const currentDirectionIndex = DIRECTIONS.indexOf(this.bearing)
        const newDirectionIndex = (currentDirectionIndex + amount + DIRECTIONS.length) % DIRECTIONS.length
        this.orient(DIRECTIONS[newDirectionIndex])
    }

    turnLeft() {
        this.turnRight(-1)
    }

    at(x: number, y: number) {
        this.coordinates = [x, y]
    }

    advance() {
        const [x, y] = this.coordinates
        const [deltaX, deltaY] = MOVEMENT_BY_DIRECTION.get(this.bearing)!
        this.coordinates = [x + deltaX, y + deltaY]
    }

    instructions([...shortInstructions]: string) {
        return shortInstructions.map((letter) => INSTRUCTIONS[letter])
    }

    evaluate(shortInstructionsString: string) {
        this.instructions(shortInstructionsString).forEach((instruction) => {
            (this[instruction] as () => void)()
        })
    }
}
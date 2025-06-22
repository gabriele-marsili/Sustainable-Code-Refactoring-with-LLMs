export class InvalidInputError extends Error {
    constructor(message: string) {
        super();
        this.message = message || 'Invalid Input';
    }
}

const DIRECTIONS = ['north', 'east', 'south', 'west'] as const;
type DirectionsType = typeof DIRECTIONS;
type Direction = DirectionsType[number];
type Coordinates = [number, number];

export class Robot {
    private _bearing: Direction;
    private _coordinates: Coordinates;

    constructor() {
        this._bearing = 'north';
        this._coordinates = [0, 0];
    }

    get bearing(): Direction {
        return this._bearing;
    }

    get coordinates(): Coordinates {
        return this._coordinates;
    }

    private isDirection(direction: string): direction is Direction {
        return DIRECTIONS.includes(direction as Direction);
    }

    place(p: { x: number; y: number; direction: string }) {
        if (!this.isDirection(p.direction)) {
            throw new InvalidInputError('Not a direction');
        }

        this._bearing = p.direction as Direction;
        this._coordinates = [p.x, p.y];
    }

    evaluate(instructions: string) {
        instructions.split('').forEach((intr) => {
            let curDirectionIdx = DIRECTIONS.indexOf(this._bearing);
            switch (intr) {
                case 'R':
                    this._bearing =
                        curDirectionIdx + 1 === DIRECTIONS.length ? DIRECTIONS[0] : DIRECTIONS[curDirectionIdx + 1];
                    break;
                case 'L':
                    this._bearing =
                        curDirectionIdx - 1 === -1
                            ? DIRECTIONS[DIRECTIONS.length - 1]
                            : DIRECTIONS[curDirectionIdx - 1];
                    break;
                case 'A':
                    switch (this._bearing) {
                        case 'north':
                            this._coordinates = [this._coordinates[0], this._coordinates[1] + 1];
                        break;
                        case 'east':
                            this._coordinates = [this._coordinates[0] + 1, this._coordinates[1]];
                        break;
                        case 'south':
                            this._coordinates = [this._coordinates[0], this._coordinates[1] - 1];
                        break;
                        case 'west':
                            this._coordinates = [this._coordinates[0] - 1, this._coordinates[1]];
                        break;
                    }
                    break;
            }
        });
    }
}
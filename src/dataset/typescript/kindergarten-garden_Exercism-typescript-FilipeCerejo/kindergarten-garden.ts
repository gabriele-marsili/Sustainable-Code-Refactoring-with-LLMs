const DEFAULT_STUDENTS: Student[] = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
]

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
} as const

type Student = string
type Plant = typeof PLANT_CODES[keyof typeof PLANT_CODES]
type Plants = Plant[]
type Pots = Plants[]

export class Garden {
  private _pots: Pots;
    private _students: Student[];

    constructor(diagram: string, students = DEFAULT_STUDENTS) {
        this._pots = diagram.split('\n').map((line: string) => line.split('') as Plant[]);
        this._students = students.sort((a, b) => (a < b ? -1 : 1));
    }

    public plants(student: Student): Plants {
        let firstPlantIdx = this._students.indexOf(student) * 2;
        let plants: Plants = [];

        plants.push(PLANT_CODES[this._pots[0][firstPlantIdx] as keyof typeof PLANT_CODES]);
        plants.push(PLANT_CODES[this._pots[0][firstPlantIdx + 1] as keyof typeof PLANT_CODES]);
        plants.push(PLANT_CODES[this._pots[1][firstPlantIdx] as keyof typeof PLANT_CODES]);
        plants.push(PLANT_CODES[this._pots[1][firstPlantIdx + 1] as keyof typeof PLANT_CODES]);

        return plants;
    }
}

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
  private _pots: string[];
  private _studentIndexMap: Map<Student, number>;

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this._pots = diagram.split('\n');
    this._studentIndexMap = new Map(
      [...students].sort().map((student, index) => [student, index * 2])
    );
  }

  public plants(student: Student): Plants {
    const firstPlantIdx = this._studentIndexMap.get(student);
    if (firstPlantIdx === undefined) return [];

    return [
      PLANT_CODES[this._pots[0][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[0][firstPlantIdx + 1] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx + 1] as keyof typeof PLANT_CODES],
    ];
  }
}
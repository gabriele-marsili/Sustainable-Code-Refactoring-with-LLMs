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
];

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
} as const;

type Student = string;
type Plant = typeof PLANT_CODES[keyof typeof PLANT_CODES];
type Plants = Plant[];

export class Garden {
  private readonly _pots: string[][];
  private readonly _studentMap: Map<Student, number>;

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this._pots = diagram.split('\n').map((line) => line.split(''));
    this._studentMap = new Map(
      students
        .slice()
        .sort()
        .map((student, index) => [student, index * 2])
    );
  }

  public plants(student: Student): Plants {
    const firstPlantIdx = this._studentMap.get(student);
    if (firstPlantIdx === undefined) return [];
    return [
      PLANT_CODES[this._pots[0][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[0][firstPlantIdx + 1] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx + 1] as keyof typeof PLANT_CODES],
    ];
  }
}
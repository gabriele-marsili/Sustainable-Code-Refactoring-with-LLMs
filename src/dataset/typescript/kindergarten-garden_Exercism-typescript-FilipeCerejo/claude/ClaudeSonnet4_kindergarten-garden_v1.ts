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
  private _studentIndexMap: Map<Student, number>;

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this._pots = diagram.split('\n').map((line: string) => line.split('') as Plant[]);
    
    const sortedStudents = students.slice().sort();
    this._studentIndexMap = new Map();
    for (let i = 0; i < sortedStudents.length; i++) {
      this._studentIndexMap.set(sortedStudents[i], i);
    }
  }

  public plants(student: Student): Plants {
    const studentIndex = this._studentIndexMap.get(student);
    if (studentIndex === undefined) return [];
    
    const firstPlantIdx = studentIndex * 2;
    
    return [
      PLANT_CODES[this._pots[0][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[0][firstPlantIdx + 1] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx] as keyof typeof PLANT_CODES],
      PLANT_CODES[this._pots[1][firstPlantIdx + 1] as keyof typeof PLANT_CODES]
    ];
  }
}
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

export class Garden {
  private _pots: string;
  private _students: Student[];
  private _studentIndex: Map<Student, number>;

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this._pots = diagram;
    this._students = [...students].sort(); // Create a copy to avoid modifying the original array
    this._studentIndex = new Map<Student, number>();
    for (let i = 0; i < this._students.length; i++) {
      this._studentIndex.set(this._students[i], i);
    }
  }

  public plants(student: Student): Plants {
    const studentIndex = this._studentIndex.get(student);

    if (studentIndex === undefined) {
      return []; // Or throw an error, depending on desired behavior
    }

    const firstPlantIdx = studentIndex * 2;
    const plants: Plants = [];

    plants.push(PLANT_CODES[this._pots[firstPlantIdx + 0] as keyof typeof PLANT_CODES]);
    plants.push(PLANT_CODES[this._pots[firstPlantIdx + 1] as keyof typeof PLANT_CODES]);
    plants.push(PLANT_CODES[this._pots[this._pots.indexOf('\n') + firstPlantIdx + 0 + 1] as keyof typeof PLANT_CODES]);
    plants.push(PLANT_CODES[this._pots[this._pots.indexOf('\n') + firstPlantIdx + 1 + 1] as keyof typeof PLANT_CODES]);

    return plants;
  }
}
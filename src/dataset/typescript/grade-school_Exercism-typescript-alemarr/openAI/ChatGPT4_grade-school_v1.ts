type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, Set<string>> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};

    this.students.forEach((students: Set<string>, grade: number) => {
      roster[grade] = Array.from(students).sort();
    });

    return roster;
  }

  add(student: string, grade: number): void {
    this.students.forEach((students: Set<string>, currentGrade: number) => {
      if (students.has(student)) {
        students.delete(student);
      }
    });

    if (!this.students.has(grade)) {
      this.students.set(grade, new Set());
    }

    this.students.get(grade)!.add(student);
  }

  grade(grade: number): string[] {
    const students = this.students.get(grade);
    return students ? Array.from(students).sort() : [];
  }
}
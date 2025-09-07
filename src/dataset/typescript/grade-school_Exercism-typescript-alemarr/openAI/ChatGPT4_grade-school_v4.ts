type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, Set<string>> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};
    this.students.forEach((students, grade) => {
      roster[grade] = Array.from(students).sort();
    });
    return roster;
  }

  add(student: string, grade: number): void {
    this.students.forEach((students) => students.delete(student));
    if (!this.students.has(grade)) {
      this.students.set(grade, new Set());
    }
    this.students.get(grade)!.add(student);
  }

  grade(grade: number): string[] {
    return Array.from(this.students.get(grade) || []).sort();
  }
}
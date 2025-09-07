type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, string[]> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};
    for (const [grade, students] of this.students) {
      roster[grade] = [...students].sort();
    }
    return roster;
  }

  add(student: string, grade: number): void {
    let students = this.students.get(grade);
    if (students) {
      students.push(student);
    } else {
      students = [student];
      this.students.set(grade, students);
    }
  }

  grade(grade: number): string[] {
    const students = this.students.get(grade);
    if (students) {
      return [...students].sort();
    }
    return [];
  }
}
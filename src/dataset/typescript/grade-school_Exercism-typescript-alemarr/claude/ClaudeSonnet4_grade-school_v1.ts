type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, string[]> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};

    for (const [grade, students] of this.students) {
      roster[grade] = students.slice().sort();
    }

    return roster;
  }

  add(student: string, grade: number): void {
    // Remove student from all grades
    for (const [currentGrade, students] of this.students) {
      const index = students.indexOf(student);
      if (index !== -1) {
        students.splice(index, 1);
        if (students.length === 0) {
          this.students.delete(currentGrade);
        }
        break;
      }
    }

    // Add student to the specified grade
    if (!this.students.has(grade)) {
      this.students.set(grade, []);
    }
    this.students.get(grade)!.push(student);
  }

  grade(grade: number): string[] {
    const students = this.students.get(grade);
    return students ? students.slice().sort() : [];
  }
}
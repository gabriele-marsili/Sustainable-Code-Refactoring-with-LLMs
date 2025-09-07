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
    for (const [currentGrade, students] of this.students) {
      if (currentGrade !== grade) continue;
      const index = students.indexOf(student);
      if (index > -1) {
        students.splice(index, 1);
        if (students.length === 0) {
          this.students.delete(currentGrade);
        }
      }
    }

    const students = this.students.get(grade) || [];
    students.push(student);
    students.sort();
    this.students.set(grade, students);
  }

  grade(grade: number): string[] {
    const students = this.students.get(grade);
    return students ? [...students].sort() : [];
  }
}
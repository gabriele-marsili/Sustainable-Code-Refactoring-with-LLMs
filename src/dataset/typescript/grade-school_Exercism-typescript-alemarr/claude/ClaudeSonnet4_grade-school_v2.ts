type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, Set<string>> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};

    for (const [grade, studentSet] of this.students) {
      roster[grade] = Array.from(studentSet).sort();
    }

    return roster;
  }

  add(student: string, grade: number): void {
    // Remove student from all other grades
    for (const [currentGrade, studentSet] of this.students) {
      if (currentGrade !== grade) {
        studentSet.delete(student);
      }
    }

    // Add student to the specified grade
    if (!this.students.has(grade)) {
      this.students.set(grade, new Set());
    }
    this.students.get(grade)!.add(student);
  }

  grade(grade: number): string[] {
    const studentSet = this.students.get(grade);
    return studentSet ? Array.from(studentSet).sort() : [];
  }
}
export class GradeSchool {
  data = {};

  roster() {
    return { ...this.data };
  }

  add(student, grade) {
    if (!this.data[grade]) {
      this.data[grade] = [];
    }
    if (!this.isStudentEnrolled(student)) {
      this.data[grade].push(student);
      this.data[grade].sort();
    }
  }

  grade(g) {
    return [...(this.data[g] || [])];
  }

  isStudentEnrolled(student) {
    return Object.values(this.data).some((students) => students.includes(student));
  }
}
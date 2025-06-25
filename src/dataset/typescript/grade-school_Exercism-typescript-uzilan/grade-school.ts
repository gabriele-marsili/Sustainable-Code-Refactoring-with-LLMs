export default class GradeSchool {

    private roster = new Map<string, string[]>();

    studentRoster(): Map<string, string[]> {
        const copy = new Map();
        this.roster.forEach((value, key) =>
            copy.set(key, [...value]));
        return copy;
    }


    addStudent(name: string, grade: number) {
        const gradeString = grade.toString();

        this.removeStudent(name);

        if (this.roster.has(gradeString)) {
            const students = this.roster.get(gradeString);
            students?.push(name);
            students?.sort();
        } else {
            this.roster.set(gradeString, [name]);
        }
    }

    studentsInGrade(grade: number): string[] {
        const result = this.roster.get(grade.toString());
        return result ? [...result] : [];
    }

    private removeStudent(name: string): void {
        this.roster.forEach((value, key) => {
            if (value.includes(name)) {
                const students = this.roster.get(key)?.filter(st => st != name);
                if (students) {
                    this.roster.set(key, students);
                }
            }
        })
    }
}
export default class GradeSchool {
    private _rosterDB: Map<string, string[]> = new Map()

    studentsInGrade(gradeNumber: number) {
        // Clone it to prevent modification from evil outside.
        return (this._rosterDB.get(gradeNumber.toString()) || []).slice()
    }

    addStudent(name: string, gradeNumber: number) {
        this._rosterDB.set(gradeNumber.toString(), this.studentsInGrade(gradeNumber).concat(name).sort())
    }

    studentRoster() {
        // Clone it to prevent modification from evil outside.
        const deepClone = new Map()
        this._rosterDB.forEach((value, key) => {
            deepClone.set(key, value.slice())
        })
        return deepClone
    }

}

const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
    'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

class Garden {
    constructor(garden, students = DEFAULT_STUDENTS) {
        this.students = [...students].sort().map(student => student.toLowerCase());
        const rows = garden.split('\n');
        const plantMap = { 'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets' };

        this.students.forEach((student, index) => {
            this[student] = [
                plantMap[rows[0][2 * index]], plantMap[rows[0][2 * index + 1]],
                plantMap[rows[1][2 * index]], plantMap[rows[1][2 * index + 1]]
            ];
        });
    }
}

export default Garden;
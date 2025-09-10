const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
    'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const PLANT_MAP = { 'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets' };

class Garden {
    constructor(garden, students = DEFAULT_STUDENTS) {
        const sortedStudents = [...students].sort();
        const rows = garden.split('\n');
        sortedStudents.forEach((student, i) => {
            this[student.toLowerCase()] = [
                PLANT_MAP[rows[0][2 * i]], PLANT_MAP[rows[0][2 * i + 1]],
                PLANT_MAP[rows[1][2 * i]], PLANT_MAP[rows[1][2 * i + 1]]
            ];
        });
    }
}

export default Garden;
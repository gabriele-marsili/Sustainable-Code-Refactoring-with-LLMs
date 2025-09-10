const DEFAULT_STUDENTS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 
    'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry'];

const Garden = function(garden, students) {
    const sortedStudents = (students || DEFAULT_STUDENTS).slice().sort();
    const rows = garden.split('\n');
    const plantMap = { 'C': 'clover', 'G': 'grass', 'R': 'radishes', 'V': 'violets' };

    sortedStudents.forEach((student, i) => {
        this[student.toLowerCase()] = [
            plantMap[rows[0][2 * i]], plantMap[rows[0][2 * i + 1]],
            plantMap[rows[1][2 * i]], plantMap[rows[1][2 * i + 1]]
        ];
    });
};

export default Garden;